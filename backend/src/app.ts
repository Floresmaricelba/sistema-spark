import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { errorHandler } from './middlewares/error.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { clientesRoutes } from './routes/clientes.routes.js';

const app = new Hono();
app.onError(errorHandler);
app.use('*', cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
app.get('/api/health', (c) => c.json({ status: 'ok' }));
app.route('/api/auth', authRoutes);
app.route('/api/clientes', clientesRoutes);

app.notFound((c) => c.json({ error: 'Ruta no encontrada' }, 404));

export default app;
