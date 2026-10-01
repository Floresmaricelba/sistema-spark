import { pool } from '../db/pool.js';

export type AdminRecord = {
  idadmin: number;
  nombreadmin: string;
  contrasena: string;
  nombreusuario: string;
};

export async function findByUsername(username: string): Promise<AdminRecord | undefined> {
  const result = await pool.query<AdminRecord>(
    'SELECT idadmin, nombreadmin, contrasena, nombreusuario FROM administrador WHERE nombreusuario = $1 LIMIT 1',
    [username],
  );
  return result.rows[0];
}

export async function updatePassword(idAdmin: number, passwordHash: string): Promise<void> {
  await pool.query('UPDATE administrador SET contrasena = $1 WHERE idadmin = $2', [passwordHash, idAdmin]);
}
