import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_ISSUER: z.string().default('gimnasio-api'),
  JWT_AUDIENCE: z.string().default('gimnasio-client'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().default('*'),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

export function getEnv(): Env {
  if (!cachedEnv) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      throw new Error(`Variables de entorno inválidas: ${result.error.message}`);
    }
    cachedEnv = result.data;
  }
  return cachedEnv;
}

export function resetEnvForTests(): void {
  cachedEnv = undefined;
}
