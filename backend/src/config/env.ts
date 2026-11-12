import 'dotenv/config';
import { z } from 'zod';

export type BackendEnvironment = {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseServiceRoleKey?: string;
  supabaseDbUrl?: string;
  geminiApiKey?: string;
  geminiModel: string;
  pushProviderApiKey?: string;
  corsOrigins: readonly string[];
  logLevel: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
};

const optionalText = () =>
  z.preprocess((value) => (value === '' ? undefined : value), z.string().min(1).optional());

const optionalUrl = () =>
  z.preprocess((value) => (value === '' ? undefined : value), z.string().url().optional());

const environmentSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
    SUPABASE_URL: optionalUrl(),
    SUPABASE_ANON_KEY: optionalText(),
    SUPABASE_SERVICE_ROLE_KEY: optionalText(),
    SUPABASE_DB_URL: optionalUrl(),
    AI_PROVIDER_API_KEY: optionalText(),
    GEMINI_API_KEY: optionalText(),
    GEMINI_MODEL: z.string().min(1).default('gemini-flash-latest'),
    PUSH_PROVIDER_API_KEY: optionalText(),
    CORS_ORIGINS: z.string().default(''),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  })
  .superRefine((value, context) => {
    if (value.NODE_ENV === 'production') {
      if (!value.SUPABASE_URL) {
        context.addIssue({ code: 'custom', path: ['SUPABASE_URL'], message: 'Required in production' });
      }
      if (!value.SUPABASE_ANON_KEY) {
        context.addIssue({ code: 'custom', path: ['SUPABASE_ANON_KEY'], message: 'Required in production' });
      }
      if (!value.CORS_ORIGINS.trim()) {
        context.addIssue({ code: 'custom', path: ['CORS_ORIGINS'], message: 'Required in production' });
      }
    }
  });

export function loadEnvironment(source: NodeJS.ProcessEnv = process.env): BackendEnvironment {
  const parsed = environmentSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(`Invalid backend environment: ${parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')}`);
  }

  return {
    nodeEnv: parsed.data.NODE_ENV,
    port: parsed.data.PORT,
    supabaseUrl: parsed.data.SUPABASE_URL,
    supabaseAnonKey: parsed.data.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: parsed.data.SUPABASE_SERVICE_ROLE_KEY,
    supabaseDbUrl: parsed.data.SUPABASE_DB_URL,
    geminiApiKey: parsed.data.GEMINI_API_KEY ?? parsed.data.AI_PROVIDER_API_KEY,
    geminiModel: parsed.data.GEMINI_MODEL,
    pushProviderApiKey: parsed.data.PUSH_PROVIDER_API_KEY,
    corsOrigins: parsed.data.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
    logLevel: parsed.data.LOG_LEVEL,
  };
}
