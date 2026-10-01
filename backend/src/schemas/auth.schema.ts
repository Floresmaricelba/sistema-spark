import { z } from 'zod';

export const loginSchema = z.object({
  nombreUsuario: z.string().trim().min(5).max(10),
  contrasena: z.string().min(1),
});
