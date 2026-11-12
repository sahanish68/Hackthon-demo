import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import Fastify, { type FastifyError, type FastifyInstance } from 'fastify';
import { loadEnvironment, type BackendEnvironment } from './config/env.js';
import { createAuthenticateMiddleware } from './middleware/authenticate.js';
import { createSupabaseServices } from './plugins/supabase.js';
import { GeminiCompanion, type CompanionMessage } from './services/ai/gemini.js';
import { z } from 'zod';

export async function buildApp(environment: BackendEnvironment = loadEnvironment()): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: environment.logLevel,
      redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
    },
    bodyLimit: 1_048_576,
    requestIdHeader: 'x-request-id',
  });

  await app.register(helmet);
  await app.register(cors, {
    origin: environment.corsOrigins.length > 0 ? [...environment.corsOrigins] : false,
  });
  await app.register(rateLimit, {
    global: true,
    max: 100,
    timeWindow: '1 minute',
  });

  const supabase = createSupabaseServices(environment);
  const companion = environment.geminiApiKey
    ? new GeminiCompanion(environment.geminiApiKey, environment.geminiModel)
    : undefined;

  app.get('/health', async () => ({
    status: 'ok',
    service: 'eldercare-ai-backend',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  }));

  if (supabase) {
    app.decorateRequest('user', null);
    app.get('/api/me', { onRequest: createAuthenticateMiddleware(supabase.client) }, async (request) => ({
      user: request.user,
    }));
  }

  const companionBody = z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'model']),
      text: z.string().trim().min(1).max(4_000),
    })).min(1).max(20),
  });

  app.post('/api/companion/messages', {
    preHandler: environment.nodeEnv === 'production' && supabase
      ? createAuthenticateMiddleware(supabase.client)
      : undefined,
  }, async (request, reply) => {
    if (!companion) {
      return reply.status(503).send({
        error: { code: 'provider_unavailable', message: 'Gemini is not configured on the backend.', retryable: false },
        requestId: request.id,
      });
    }

    const parsed = companionBody.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: { code: 'validation', message: 'Conversation messages are invalid.', retryable: false },
        requestId: request.id,
      });
    }

    try {
      const response = await companion.respond(parsed.data.messages as CompanionMessage[]);
      return { data: { role: 'model', text: response }, requestId: request.id };
    } catch (error: unknown) {
      request.log.error({ err: error }, 'Gemini request failed');
      return reply.status(502).send({
        error: { code: 'provider_error', message: 'The companion is temporarily unavailable.', retryable: true },
        requestId: request.id,
      });
    }
  });

  app.setNotFoundHandler((request, reply) => {
    return reply.status(404).send({
      error: {
        code: 'not_found',
        message: 'Route not found',
        retryable: false,
      },
      requestId: request.id,
    });
  });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error({ err: error }, 'request failed');
    const statusCode = error.validation ? 400 : error.statusCode && error.statusCode < 500 ? error.statusCode : 500;
    return reply.status(statusCode).send({
      error: {
        code: statusCode === 400 ? 'validation' : 'unknown',
        message: statusCode >= 500 ? 'Internal server error' : error.message,
        retryable: statusCode >= 500,
      },
      requestId: request.id,
    });
  });

  return app;
}
