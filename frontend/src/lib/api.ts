import { getToken, clearSession } from './auth';
import type { Cliente, ClienteFilters, ClienteForm } from '../types/cliente';
import type { ApiError, LoginResponse } from '../types/api';

const configuredApiUrl = import.meta.env.PUBLIC_API_URL;
const API_URL = (configuredApiUrl ?? (import.meta.env.PROD ? '' : 'http://localhost:3000')).replace(/\/$/, '');

export class ApiRequestError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, payload: ApiError) {
    super(payload.error || 'No se pudo completar la solicitud');
    this.name = 'ApiRequestError';
    this.status = status;
    this.details = payload.details;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  const payload = (await response.json().catch(() => ({}))) as T & ApiError;
  if (response.status === 401) {
    clearSession();
    if (typeof window !== 'undefined') window.location.replace('/login');
  }
  if (!response.ok) throw new ApiRequestError(response.status, payload as ApiError);
  return payload as T;
}

export function login(data: { nombreUsuario: string; contrasena: string }) {
  return request<LoginResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
}

export function logout() {
  return request<{ message: string }>('/api/auth/logout', { method: 'POST' }).finally(clearSession);
}

function queryString(filters: ClienteFilters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function listClientes(filters: ClienteFilters = {}) {
  return request<unknown[]>(`/api/clientes${queryString(filters)}`).then((rows) => rows.map(adaptCliente));
}

export function createCliente(data: ClienteForm) {
  return request<unknown>('/api/clientes', { method: 'POST', body: JSON.stringify(data) }).then(adaptCliente);
}

export function updateCliente(id: number, data: Partial<ClienteForm>) {
  return request<unknown>(`/api/clientes/${id}`, { method: 'PUT', body: JSON.stringify(data) }).then(adaptCliente);
}

export function adaptCliente(raw: unknown): Cliente {
  const row = raw as Record<string, unknown>;
  return {
    idCliente: Number(row.idCliente ?? row.idcliente),
    nombreCliente: String(row.nombreCliente ?? row.nombrecliente ?? ''),
    telefono: String(row.telefono ?? ''),
    montoPago: Number(row.montoPago ?? row.montopago ?? 0),
    tipoEntrada: (row.tipoEntrada ?? row.tipoentrada) as Cliente['tipoEntrada'],
    tipoPago: (row.tipoPago ?? row.tipopago) as Cliente['tipoPago'],
    fechaRegistro: String(row.fechaRegistro ?? row.fecharegistro ?? ''),
  };
}
