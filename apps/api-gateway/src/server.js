const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const { env } = require('./config/env');
const { requireAuth, requireRole } = require('./middlewares/auth.middleware');
const { buildProxy } = require('./utils/proxy');

const app = express();

app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

app.use('/api/v1/auth', buildProxy(env.services.auth));
app.use('/api/v1/users', requireAuth, buildProxy(env.services.user));
app.use('/api/v1/catalog', buildProxy(env.services.catalog));
app.use('/api/v1/events', buildProxy(env.services.event));
app.use('/api/v1/registrations', requireAuth, buildProxy(env.services.registration));
app.use('/api/v1/payments', requireAuth, buildProxy(env.services.payment));
app.use('/api/v1/notifications', requireAuth, buildProxy(env.services.notification));
app.use('/api/v1/admin', requireAuth, requireRole('ADMIN'), buildProxy(env.services.admin));

app.listen(env.port, () => {
  console.log(`API Gateway running on http://localhost:${env.port}`);
});
