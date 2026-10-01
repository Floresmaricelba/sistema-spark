import bcrypt from 'bcrypt';
import { sign } from 'hono/jwt';
import { getEnv } from '../config/env.js';
import { findByUsername, updatePassword } from '../repositories/administrador.repository.js';
import type { AuthUser } from '../types/auth.types.js';

export async function login(username: string, password: string): Promise<{ token: string; user: AuthUser }> {
  const admin = await findByUsername(username);
  if (!admin) throw new Error('Credenciales inválidas');
  let valid = false;
  try { valid = await bcrypt.compare(password, admin.contrasena); } catch { valid = false; }
  if (!valid && password === admin.contrasena) {
    valid = true;
    await updatePassword(admin.idadmin, await bcrypt.hash(password, 8));
  }
  if (!valid) throw new Error('Credenciales inválidas');
  const env = getEnv();
  const user: AuthUser = { idAdmin: admin.idadmin, nombreAdmin: admin.nombreadmin, nombreUsuario: admin.nombreusuario };
  const token = await sign({ ...user, sub: String(user.idAdmin), iss: env.JWT_ISSUER, aud: env.JWT_AUDIENCE, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 }, env.JWT_SECRET);
  return { token, user };
}
