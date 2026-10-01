import { jwt } from 'hono/jwt';
import { getEnv } from '../config/env.js';

export const authMiddleware = () => {
  const env = getEnv();
  return jwt({
    secret: env.JWT_SECRET,
    alg: 'HS256',
    verification: {
      iss: env.JWT_ISSUER,
      aud: env.JWT_AUDIENCE,
    },
  });
};
