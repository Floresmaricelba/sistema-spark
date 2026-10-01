export type AuthUser = {
  idAdmin: number;
  nombreAdmin: string;
  nombreUsuario: string;
};

export type JwtPayload = AuthUser & {
  sub: string;
  iss: string;
  aud: string;
  exp: number;
};
