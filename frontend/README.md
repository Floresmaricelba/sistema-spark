# Gymness Frontend

Frontend estático construido con Astro, Tailwind CSS y Zod. Está preparado para desplegarse en Vercel y consumir el backend Hono.

## Instalación

```bash
cd frontend
npm install
```

Copia `.env.example` como `.env` y configura `PUBLIC_API_URL` con la URL del backend:

```env
PUBLIC_API_URL=http://localhost:3000
```

En desarrollo, el backend debe permitir el origen de Astro:

```env
CORS_ORIGIN=http://localhost:4321
```

Comandos disponibles:

```bash
npm run dev       # desarrollo local
npm run check     # comprobación Astro/TypeScript
npm run build     # genera dist/
npm run preview   # previsualiza la compilación
```

## Conexión con el backend

El cliente utiliza `src/lib/api.ts` para consumir:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/clientes`
- `POST /api/clientes`
- `PUT /api/clientes/:id`

El JWT y los datos públicos del administrador se almacenan en `localStorage`. Las contraseñas nunca se guardan. Las respuestas del backend se normalizan en `adaptCliente`, incluyendo las columnas PostgreSQL en minúscula (`idcliente`, `nombrecliente`, etc.).

## Vercel

El proyecto usa `output: 'static'`, por lo que Astro genera archivos estáticos y no necesita un servidor Node para el frontend. Configura `PUBLIC_API_URL` en las variables de entorno de Vercel antes del despliegue.
