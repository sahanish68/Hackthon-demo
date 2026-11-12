import type { onRequestHookHandler } from 'fastify';
import type { SupabaseClient } from '@supabase/supabase-js';

declare module 'fastify' {
  interface FastifyRequest {
    user: AuthenticatedUser | null;
  }
}

export type AuthenticatedUser = {
  id: string;
  role: 'senior' | 'family' | 'trusted_contact';
};

export type AuthenticatedRequest = {
  user?: AuthenticatedUser;
};

export function createAuthenticateMiddleware(client: SupabaseClient): onRequestHookHandler {
  return async (request, reply) => {
    const header = request.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return reply.status(401).send({
        error: { code: 'unauthenticated', message: 'Authentication is required.', retryable: false },
        requestId: request.id,
      });
    }

    try {
      const token = header.slice('Bearer '.length).trim();
      const { data, error } = await client.auth.getUser(token);
      if (error || !data.user) {
        throw new Error('Invalid access token');
      }
      request.user = {
        id: data.user.id,
        role: data.user.app_metadata.role === 'family' || data.user.app_metadata.role === 'trusted_contact'
          ? data.user.app_metadata.role
          : 'senior',
      };
    } catch {
      return reply.status(401).send({
        error: { code: 'unauthenticated', message: 'The access token is invalid or expired.', retryable: false },
        requestId: request.id,
      });
    }
  };
}
