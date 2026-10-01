import { serve } from '@hono/node-server';
import app from './app.js';
import { getEnv } from './config/env.js';

serve({ fetch: app.fetch, port: getEnv().PORT });
