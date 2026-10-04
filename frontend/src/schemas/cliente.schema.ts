import { z } from 'zod';

export const clienteSchema = z.object({
  nombreCliente: z.string().trim().min(1, 'El nombre es obligatorio').max(100),
  telefono: z.string().regex(/^\d{8}$/, 'El teléfono debe tener exactamente 8 dígitos'),
  montoPago: z.coerce.number().min(0, 'El monto no puede ser negativo').max(10000, 'El monto máximo es 10000 Bs'),
  tipoEntrada: z.enum(['mensual', 'semanal', 'sesión']),
  tipoPago: z.enum(['efectivo', 'QR']),
});

export const clienteFiltersSchema = z.object({
  nombreCliente: z.string().optional(),
  telefono: z.string().regex(/^\d{8}$/, 'El teléfono debe tener 8 dígitos').optional().or(z.literal('')),
  tipoEntrada: z.enum(['mensual', 'semanal', 'sesión']).optional().or(z.literal('')).transform((value) => value || undefined),
  tipoPago: z.enum(['efectivo', 'QR']).optional().or(z.literal('')).transform((value) => value || undefined),
  fechaDesde: z.string().optional(),
  fechaHasta: z.string().optional(),
}).refine((data) => !data.fechaDesde || !data.fechaHasta || data.fechaDesde <= data.fechaHasta, {
  message: 'La fecha inicial no puede ser posterior a la fecha final',
  path: ['fechaDesde'],
});

export type ClienteInput = z.infer<typeof clienteSchema>;
