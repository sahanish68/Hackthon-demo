import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { BackendEnvironment } from '../config/env.js';

export type SupabaseServices = {
  client: SupabaseClient;
};

export function createSupabaseServices(environment: BackendEnvironment): SupabaseServices | undefined {
  if (!environment.supabaseUrl || !environment.supabaseAnonKey) {
    return undefined;
  }

  return {
    client: createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    }),
  };
}
