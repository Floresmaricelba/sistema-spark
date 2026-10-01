import { Hono } from 'hono';
import * as controller from '../controllers/auth.controller.js';

export const authRoutes = new Hono();
authRoutes.post('/login', controller.login);
authRoutes.post('/logout', controller.logout);
