const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || '',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:9001',
  CATALOG_SERVICE_URL: process.env.CATALOG_SERVICE_URL || 'http://localhost:9003',
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://localhost:9002',
  EVENT_SERVICE_URL: process.env.EVENT_SERVICE_URL || 'http://localhost:9004',
  REGISTRATION_SERVICE_URL: process.env.REGISTRATION_SERVICE_URL || 'http://localhost:9005',
  PAYMENT_SERVICE_URL: process.env.PAYMENT_SERVICE_URL || 'http://localhost:9006',
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:9007',
  ADMIN_SERVICE_URL: process.env.ADMIN_SERVICE_URL || 'http://localhost:9008',
};
