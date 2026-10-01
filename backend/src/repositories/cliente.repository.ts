import { pool } from '../db/pool.js';
import type { CreateCliente, ClienteFilters, UpdateCliente } from '../schemas/cliente.schema.js';

export type ClienteRecord = {
  idCliente: number;
  nombreCliente: string;
  telefono: string;
  montoPago: number;
  tipoEntrada: string;
  tipoPago: string;
  fechaRegistro: Date | string;
};

const clienteColumns = 'idcliente AS "idCliente", nombrecliente AS "nombreCliente", telefono, montopago::double precision AS "montoPago", tipoentrada AS "tipoEntrada", tipopago AS "tipoPago", fecharegistro AS "fechaRegistro"';

export async function create(data: CreateCliente): Promise<ClienteRecord> {
  const result = data.idCliente
    ? await pool.query<ClienteRecord>(
        `INSERT INTO cliente (idcliente, nombrecliente, telefono, montopago, tipoentrada, tipopago, fecharegistro)
         VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, CURRENT_TIMESTAMP))
         RETURNING ${clienteColumns}`,
        [data.idCliente, data.nombreCliente, data.telefono, data.montoPago, data.tipoEntrada, data.tipoPago, data.fechaRegistro ?? null],
      )
    : await pool.query<ClienteRecord>(
        `INSERT INTO cliente (nombrecliente, telefono, montopago, tipoentrada, tipopago, fecharegistro)
         VALUES ($1, $2, $3, $4, $5, COALESCE($6, CURRENT_TIMESTAMP))
         RETURNING ${clienteColumns}`,
        [data.nombreCliente, data.telefono, data.montoPago, data.tipoEntrada, data.tipoPago, data.fechaRegistro ?? null],
      );
  return result.rows[0];
}

export async function update(id: number, data: UpdateCliente): Promise<ClienteRecord | undefined> {
  const entries = Object.entries(data);
  if (entries.length === 0) return findById(id);
  const columnMap: Record<string, string> = {
    nombreCliente: 'nombrecliente', telefono: 'telefono', montoPago: 'montopago',
    tipoEntrada: 'tipoentrada', tipoPago: 'tipopago', fechaRegistro: 'fecharegistro',
  };
  const assignments = entries.map(([key], index) => `${columnMap[key]} = $${index + 1}`);
  const values = entries.map(([, value]) => value);
  values.push(id);
  const result = await pool.query<ClienteRecord>(
    `UPDATE cliente SET ${assignments.join(', ')} WHERE idcliente = $${values.length}
      RETURNING ${clienteColumns}`, values,
  );
  return result.rows[0];
}

export async function findById(id: number): Promise<ClienteRecord | undefined> {
  const result = await pool.query<ClienteRecord>(`SELECT ${clienteColumns} FROM cliente WHERE idcliente = $1`, [id]);
  return result.rows[0];
}

export async function findAll(filters: ClienteFilters): Promise<ClienteRecord[]> {
  const clauses: string[] = [];
  const values: unknown[] = [];
  const add = (clause: string, value: unknown) => { values.push(value); clauses.push(clause.replace('?', `$${values.length}`)); };
  if (filters.nombreCliente) add('nombrecliente ILIKE ? ', `%${filters.nombreCliente}%`);
  if (filters.telefono) add('telefono = ?', filters.telefono);
  if (filters.tipoEntrada) add('tipoentrada = ?', filters.tipoEntrada);
  if (filters.tipoPago) add('tipopago = ?', filters.tipoPago);
  if (filters.fechaDesde) add('fecharegistro >= ?', filters.fechaDesde);
  if (filters.fechaHasta) add('fecharegistro <= ?', filters.fechaHasta);
  const where = clauses.length ? ` WHERE ${clauses.join(' AND ')}` : '';
  const result = await pool.query<ClienteRecord>(`SELECT ${clienteColumns} FROM cliente${where} ORDER BY idcliente`, values);
  return result.rows;
}
