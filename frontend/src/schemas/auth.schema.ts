import { z } from 'zod';

export const loginSchema = z.object({
  nombreUsuario: z.string().trim().min(5, 'El usuario debe tener al menos 5 caracteres').max(10, 'El usuario no puede superar 10 caracteres'),
  contrasena: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginInput = z.infer<typeof loginSchema>;
