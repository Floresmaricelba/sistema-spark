export type ApiError = {
  error: string;
  details?: unknown;
};

export type LoginResponse = {
  token: string;
  user: {
    idAdmin: number;
    nombreAdmin: string;
    nombreUsuario: string;
  };
};
