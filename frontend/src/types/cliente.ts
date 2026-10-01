export type TipoEntrada = 'mensual' | 'semanal' | 'sesión';
export type TipoPago = 'efectivo' | 'QR';

export type Cliente = {
  idCliente: number;
  nombreCliente: string;
  telefono: string;
  montoPago: number;
  tipoEntrada: TipoEntrada;
  tipoPago: TipoPago;
  fechaRegistro: string;
};

export type ClienteForm = Omit<Cliente, 'idCliente' | 'fechaRegistro'> & {
  idCliente?: number;
  fechaRegistro?: string;
};

export type ClienteFilters = {
  nombreCliente?: string;
  telefono?: string;
  tipoEntrada?: TipoEntrada;
  tipoPago?: TipoPago;
  fechaDesde?: string;
  fechaHasta?: string;
};
