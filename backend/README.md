# Gimnasio API

API REST construida con Hono, TypeScript y PostgreSQL.

## Puesta en marcha

1. Copiar `.env.example` como `.env` y completar `DATABASE_URL` y `JWT_SECRET`.
2. Instalar dependencias con `npm install`.
3. Desde la raíz del proyecto, ejecutar los scripts SQL de `db/` en este orden:
   `1.CreacionDeTablas.sql`, `2.Restricciones.sql`, `3.InsercionDeDatos.sql`.
4. Ejecutar `npm run dev` para usar Vercel localmente.

## Rutas

- `POST /api/auth/login`: recibe `{ "nombreUsuario": "floresadm", "contrasena": "floresadmi06" }`.
- `POST /api/auth/logout`: cierre de sesión informativo; el cliente elimina el JWT.
- `GET /api/clientes`: lista clientes y admite `nombreCliente`, `telefono`, `tipoEntrada`, `tipoPago`, `fechaDesde` y `fechaHasta`.
- `POST /api/clientes`: registra un cliente.
- `PUT /api/clientes/:id`: actualiza un cliente.

Las rutas de clientes requieren `Authorization: Bearer <token>`.
