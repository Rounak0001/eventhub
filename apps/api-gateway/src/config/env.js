const dotenv = require('dotenv');

dotenv.config();

const env = {
  port: Number(process.env.GATEWAY_PORT || 8080),
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  services: {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:9001',
    user: process.env.USER_SERVICE_URL || 'http://localhost:9002',
    catalog: process.env.CATALOG_SERVICE_URL || 'http://localhost:9003',
    event: process.env.EVENT_SERVICE_URL || 'http://localhost:9004',
    registration: process.env.REGISTRATION_SERVICE_URL || 'http://localhost:9005',
    payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:9006',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:9007',
    admin: process.env.ADMIN_SERVICE_URL || 'http://localhost:9008'
  }
};

module.exports = { env };
