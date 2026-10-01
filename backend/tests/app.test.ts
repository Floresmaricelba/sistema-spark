import { beforeAll, describe, expect, it } from 'vitest';

let app!: typeof import('../src/app.js').default;

beforeAll(async () => {
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/gimnasiodb';
  process.env.JWT_SECRET = 'clave-de-prueba-con-16-caracteres';
  ({ default: app } = await import('../src/app.js'));
});

describe('API base', () => {
  it('responde al health check', async () => {
    const response = await app.request('/api/health');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  it('responde 404 para rutas inexistentes', async () => {
    const response = await app.request('/api/no-existe');
    expect(response.status).toBe(404);
  });
});
