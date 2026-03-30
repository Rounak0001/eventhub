const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {
  PORT,
  FRONTEND_ORIGIN,
  AUTH_SERVICE_URL,
  CATALOG_SERVICE_URL,
  USER_SERVICE_URL,
  EVENT_SERVICE_URL,
  REGISTRATION_SERVICE_URL,
  PAYMENT_SERVICE_URL,
  NOTIFICATION_SERVICE_URL,
  ADMIN_SERVICE_URL,
} = require('./config/env');

const { requireAuth } = require('./middlewares/auth.middleware');
const { buildProxy } = require('./utils/proxy');

const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway is running',
  });
});

/* ================= AUTH ================= */
app.use(
  '/api/auth',
  buildProxy(AUTH_SERVICE_URL, '/api/auth', '/auth')
);


/* ================= CATALOG ================= */
app.use(
  '/api/catalog',
  buildProxy(CATALOG_SERVICE_URL, '/api/catalog', '/catalog')
);

/* ================= USER ================= */
app.use(
  '/api/users',
  requireAuth,
  buildProxy(USER_SERVICE_URL, '/api/users', '/users')
);

/* ================= EVENT ================= */
app.get(
  '/api/events/:id',
  buildProxy(EVENT_SERVICE_URL, '/api/events', '/events')
);

app.use(
  '/api/events',
  requireAuth,
  buildProxy(EVENT_SERVICE_URL, '/api/events', '/events')
);

/* ================= REGISTRATION ================= */
app.use(
  '/api/registrations',
  requireAuth,
  buildProxy(REGISTRATION_SERVICE_URL, '/api/registrations', '/registrations')
);

/* ================= PAYMENT ================= */
app.use(
  '/api/payments',
  requireAuth,
  buildProxy(PAYMENT_SERVICE_URL, '/api/payments', '/payments')
);

/* ================= NOTIFICATION ================= */
app.use(
  '/api/notifications',
  requireAuth,
  buildProxy(
    NOTIFICATION_SERVICE_URL,
    '/api/notifications',
    '/notifications'
  )
);

/* ================= ADMIN ================= */
app.use(
  '/api/admin',
  requireAuth,
  buildProxy(ADMIN_SERVICE_URL, '/api/admin', '/admin')
);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
