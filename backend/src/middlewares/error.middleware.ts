import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

export const errorHandler: ErrorHandler = (error, c) => {
  if (error instanceof ZodError) return c.json({ error: 'Datos inválidos', details: error.flatten() }, 400);
  if (error.message === 'Credenciales inválidas') return c.json({ error: error.message }, 401);
  if (error instanceof HTTPException) return c.json({ error: error.message }, error.status);
  if (isPostgresError(error) && error.code === '23505') {
    return c.json({ error: 'Ya existe un registro con esos datos' }, 409);
  }
  console.error(error);
  return c.json({ error: 'Error interno del servidor' }, 500);
};

function isPostgresError(error: unknown): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string';
}
