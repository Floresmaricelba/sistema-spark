import type { Context } from 'hono';
import { createClienteSchema, updateClienteSchema, clienteFiltersSchema } from '../schemas/cliente.schema.js';
import * as service from '../services/cliente.service.js';

export async function create(c: Context) {
  const cliente = await service.createCliente(createClienteSchema.parse(await readJson(c)));
  return c.json(cliente, 201);
}

export async function update(c: Context) {
  const id = Number(c.req.param('id'));
  if (!Number.isInteger(id) || id <= 0) return c.json({ error: 'ID inválido' }, 400);
  const cliente = await service.updateCliente(id, updateClienteSchema.parse(await readJson(c)));
  return cliente ? c.json(cliente) : c.json({ error: 'Cliente no encontrado' }, 404);
}

async function readJson(c: Context): Promise<unknown> {
  try {
    return await c.req.json();
  } catch {
    return {};
  }
}

export async function list(c: Context) {
  const filters = clienteFiltersSchema.parse(c.req.query());
  return c.json(await service.listClientes(filters));
}
