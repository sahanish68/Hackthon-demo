import { pathToFileURL } from 'node:url';
import { buildApp } from './app.js';
import { loadEnvironment } from './config/env.js';

export async function startServer() {
  const environment = loadEnvironment();
  const app = await buildApp(environment);
  await app.listen({ host: '0.0.0.0', port: environment.port });

  const shutdown = async (signal: string) => {
    app.log.info({ signal }, 'shutting down');
    await app.close();
    process.exit(0);
  };

  process.once('SIGINT', () => void shutdown('SIGINT'));
  process.once('SIGTERM', () => void shutdown('SIGTERM'));
  return app;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown startup error';
    console.error(message);
    process.exitCode = 1;
  });
}
