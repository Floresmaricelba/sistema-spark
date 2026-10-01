import { describe, expect, it } from 'vitest';
import { loginSchema } from '../src/schemas/auth.schema.js';
import { createClienteSchema, clienteFiltersSchema } from '../src/schemas/cliente.schema.js';

describe('validación de autenticación', () => {
  it('acepta el administrador de ejemplo', () => {
    expect(loginSchema.parse({ nombreUsuario: 'flores', contrasena: 'floresadmi06' })).toEqual({
      nombreUsuario: 'flores',
      contrasena: 'floresadmi06',
    });
  });

  it('rechaza usuarios fuera del rango de 5 a 10 caracteres', () => {
    expect(() => loginSchema.parse({ nombreUsuario: 'abc', contrasena: '123456789012' })).toThrow();
  });
});

describe('validación de clientes', () => {
  const validClient = {
    nombreCliente: 'Juan Pérez',
    telefono: '71234567',
    montoPago: 250,
    tipoEntrada: 'mensual' as const,
    tipoPago: 'QR' as const,
  };

  it('acepta un cliente válido', () => {
    expect(createClienteSchema.parse(validClient)).toMatchObject(validClient);
  });

  it('rechaza teléfonos con letras y montos mayores a 10000', () => {
    expect(() => createClienteSchema.parse({ ...validClient, telefono: '7123ABCD' })).toThrow();
    expect(() => createClienteSchema.parse({ ...validClient, montoPago: 10001 })).toThrow();
  });

  it('rechaza un rango de fechas invertido', () => {
    expect(() => clienteFiltersSchema.parse({ fechaDesde: '2026-02-01', fechaHasta: '2026-01-01' })).toThrow();
  });
});
