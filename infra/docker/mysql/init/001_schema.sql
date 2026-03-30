CREATE DATABASE IF NOT EXISTS EventZen_db;
USE EventZen_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('CUSTOMER','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
  phone VARCHAR(30),
  avatar_url VARCHAR(500),
  city VARCHAR(120),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  bio TEXT,
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS event_types (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS venues (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city_id BIGINT NOT NULL,
  event_type_id BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  seat_capacity_max INT NOT NULL,
  base_price DECIMAL(12,2) NOT NULL,
  image_url VARCHAR(500),
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_venues_city FOREIGN KEY (city_id) REFERENCES cities(id),
  CONSTRAINT fk_venues_event_type FOREIGN KEY (event_type_id) REFERENCES event_types(id)
);

CREATE TABLE IF NOT EXISTS decoration_vendors (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city_id BIGINT NOT NULL,
  event_type_id BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  tier ENUM('STANDARD','PREMIUM','PLUS') NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  image_url VARCHAR(500),
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_decoration_city FOREIGN KEY (city_id) REFERENCES cities(id),
  CONSTRAINT fk_decoration_event_type FOREIGN KEY (event_type_id) REFERENCES event_types(id)
);

CREATE TABLE IF NOT EXISTS food_vendors (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city_id BIGINT NOT NULL,
  event_type_id BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  tier ENUM('STANDARD','PREMIUM','PLUS') NOT NULL,
  price_per_plate DECIMAL(12,2) NOT NULL,
  image_url VARCHAR(500),
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_food_city FOREIGN KEY (city_id) REFERENCES cities(id),
  CONSTRAINT fk_food_event_type FOREIGN KEY (event_type_id) REFERENCES event_types(id)
);

CREATE TABLE IF NOT EXISTS events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  organizer_id BIGINT NOT NULL,
  city_id BIGINT NOT NULL,
  event_type_id BIGINT NOT NULL,
  venue_id BIGINT NOT NULL,
  decoration_vendor_id BIGINT NOT NULL,
  food_vendor_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  seat_capacity INT NOT NULL,
  booked_seats INT NOT NULL DEFAULT 0,
  visibility ENUM('PUBLIC','PRIVATE') NOT NULL,
  access_code VARCHAR(50),
  ticket_type ENUM('FREE','PAID') NOT NULL,
  ticket_price DECIMAL(12,2),
  venue_cost DECIMAL(12,2) NOT NULL,
  decoration_cost DECIMAL(12,2) NOT NULL,
  food_cost DECIMAL(12,2) NOT NULL,
  platform_fee DECIMAL(12,2) NOT NULL,
  total_cost DECIMAL(12,2) NOT NULL,
  status ENUM('DRAFT','CONFIRMED','CANCELLED','RESCHEDULED','COMPLETED') NOT NULL DEFAULT 'CONFIRMED',
  registration_deadline DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_user FOREIGN KEY (organizer_id) REFERENCES users(id),
  CONSTRAINT fk_events_city FOREIGN KEY (city_id) REFERENCES cities(id),
  CONSTRAINT fk_events_event_type FOREIGN KEY (event_type_id) REFERENCES event_types(id),
  CONSTRAINT fk_events_venue FOREIGN KEY (venue_id) REFERENCES venues(id),
  CONSTRAINT fk_events_decoration FOREIGN KEY (decoration_vendor_id) REFERENCES decoration_vendors(id),
  CONSTRAINT fk_events_food FOREIGN KEY (food_vendor_id) REFERENCES food_vendors(id)
);

CREATE TABLE IF NOT EXISTS venue_availability (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  venue_id BIGINT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  booking_status ENUM('AVAILABLE','BOOKED','BLOCKED') NOT NULL DEFAULT 'BOOKED',
  event_id BIGINT,
  CONSTRAINT fk_va_venue FOREIGN KEY (venue_id) REFERENCES venues(id),
  CONSTRAINT fk_va_event FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS decoration_vendor_availability (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vendor_id BIGINT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  booking_status ENUM('AVAILABLE','BOOKED','BLOCKED') NOT NULL DEFAULT 'BOOKED',
  event_id BIGINT,
  CONSTRAINT fk_dva_vendor FOREIGN KEY (vendor_id) REFERENCES decoration_vendors(id),
  CONSTRAINT fk_dva_event FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS food_vendor_availability (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vendor_id BIGINT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  booking_status ENUM('AVAILABLE','BOOKED','BLOCKED') NOT NULL DEFAULT 'BOOKED',
  event_id BIGINT,
  CONSTRAINT fk_fva_vendor FOREIGN KEY (vendor_id) REFERENCES food_vendors(id),
  CONSTRAINT fk_fva_event FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS registrations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    attendee_name VARCHAR(150) NOT NULL,
    attendee_email VARCHAR(150) NOT NULL,
    attendee_phone VARCHAR(20),
    quantity INT NOT NULL DEFAULT 1,
    registration_status VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_event_user (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_id BIGINT,
  registration_id BIGINT,
  payer_user_id BIGINT,
  provider ENUM('DEMO','RAZORPAY','STRIPE') NOT NULL,
  provider_order_id VARCHAR(120),
  provider_payment_id VARCHAR(120),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  payment_type ENUM('EVENT_BOOKING','REGISTRATION') NOT NULL,
  status ENUM('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  paid_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_event FOREIGN KEY (event_id) REFERENCES events(id),
  CONSTRAINT fk_payment_registration FOREIGN KEY (registration_id) REFERENCES registrations(id),
  CONSTRAINT fk_payment_user FOREIGN KEY (payer_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS refunds (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_id BIGINT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  reason VARCHAR(255),
  status ENUM('PENDING','SUCCESS','FAILED') NOT NULL DEFAULT 'PENDING',
  processed_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_refund_payment FOREIGN KEY (payment_id) REFERENCES payments(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  event_id BIGINT,
  type ENUM('EVENT_CREATED','CANCELLED','RESCHEDULED','REGISTRATION_CONFIRMED','PAYMENT_SUCCESS') NOT NULL,
  channel ENUM('EMAIL') NOT NULL DEFAULT 'EMAIL',
  subject VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  status ENUM('PENDING','SENT','FAILED') NOT NULL DEFAULT 'PENDING',
  sent_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_notification_event FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  admin_user_id BIGINT NOT NULL,
  action_type VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT NOT NULL,
  old_value_json JSON,
  new_value_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_admin FOREIGN KEY (admin_user_id) REFERENCES users(id)
);
