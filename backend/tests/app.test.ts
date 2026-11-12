import assert from 'node:assert/strict';
import test from 'node:test';
import type { BackendEnvironment } from '../src/config/env.js';
import { buildApp } from '../src/app.js';

const testEnvironment: BackendEnvironment = {
  nodeEnv: 'test',
  port: 3000,
  corsOrigins: ['http://localhost:8081'],
  logLevel: 'fatal',
};

test('health endpoint returns only non-sensitive service status', async (t) => {
  const app = await buildApp(testEnvironment);
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/health',
    headers: { origin: 'http://localhost:8081' },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().status, 'ok');
  assert.equal(response.json().service, 'eldercare-ai-backend');
  assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:8081');
  assert.equal(response.json().supabaseServiceRoleKey, undefined);
});

test('unknown routes use the safe error envelope', async (t) => {
  const app = await buildApp(testEnvironment);
  t.after(() => app.close());

  const response = await app.inject({ method: 'GET', url: '/private' });

  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.json().error, {
    code: 'not_found',
    message: 'Route not found',
    retryable: false,
  });
  assert.ok(response.json().requestId);
});
