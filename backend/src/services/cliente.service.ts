import * as repository from '../repositories/cliente.repository.js';
import type { CreateCliente, ClienteFilters, UpdateCliente } from '../schemas/cliente.schema.js';

export const createCliente = (data: CreateCliente) => repository.create(data);
export const updateCliente = (id: number, data: UpdateCliente) => repository.update(id, data);
export const listClientes = (filters: ClienteFilters) => repository.findAll(filters);
