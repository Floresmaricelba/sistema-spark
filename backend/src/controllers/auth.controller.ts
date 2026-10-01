import type { Context } from 'hono';
import { loginSchema } from '../schemas/auth.schema.js';
import * as authService from '../services/auth.service.js';

export async function login(c: Context) {
  const input = loginSchema.parse(await readJson(c));
  return c.json(await authService.login(input.nombreUsuario, input.contrasena));
}

export function logout(c: Context) {
  return c.json({ message: 'Sesión cerrada. El cliente debe eliminar el JWT.' });
}

async function readJson(c: Context): Promise<unknown> {
  try {
    return await c.req.json();
  } catch {
    return {};
  }
}
