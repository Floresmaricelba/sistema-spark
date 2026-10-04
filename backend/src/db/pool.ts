import pg from 'pg';
import { getEnv } from '../config/env.js';

const { Pool } = pg;
const env = getEnv();
const databaseHost = new URL(env.DATABASE_URL).hostname;
const requiresSsl = databaseHost.endsWith('.supabase.co') || databaseHost.includes('.pooler.supabase.com');

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
  ssl: requiresSsl || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export async function checkDatabaseConnection(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}
