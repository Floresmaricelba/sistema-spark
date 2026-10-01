import { z } from 'zod';

const phone = z.string().regex(/^\d{8}$/, 'El teléfono debe contener exactamente 8 dígitos');
const entry = z.enum(['mensual', 'semanal', 'sesión']);
const payment = z.enum(['efectivo', 'QR']);

export const createClienteSchema = z.object({
  idCliente: z.number().int().positive().optional(),
  nombreCliente: z.string().trim().min(1).max(100),
  telefono: phone,
  montoPago: z.number().min(0).max(10000),
  tipoEntrada: entry,
  tipoPago: payment,
  fechaRegistro: z.coerce.date().optional(),
});

export const updateClienteSchema = createClienteSchema.partial().omit({ idCliente: true });

export const clienteFiltersSchema = z.object({
  nombreCliente: z.string().trim().min(1).optional(),
  telefono: phone.optional(),
  tipoEntrada: entry.optional(),
  tipoPago: payment.optional(),
  fechaDesde: z.coerce.date().optional(),
  fechaHasta: z.coerce.date().optional(),
}).refine((data) => !data.fechaDesde || !data.fechaHasta || data.fechaDesde <= data.fechaHasta, {
  message: 'fechaDesde no puede ser posterior a fechaHasta',
  path: ['fechaDesde'],
});

export type CreateCliente = z.infer<typeof createClienteSchema>;
export type UpdateCliente = z.infer<typeof updateClienteSchema>;
export type ClienteFilters = z.infer<typeof clienteFiltersSchema>;
