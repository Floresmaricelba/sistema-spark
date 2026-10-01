import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import * as controller from '../controllers/cliente.controller.js';

export const clientesRoutes = new Hono();
clientesRoutes.use('*', authMiddleware());
clientesRoutes.post('/', controller.create);
clientesRoutes.put('/:id', controller.update);
clientesRoutes.get('/', controller.list);
