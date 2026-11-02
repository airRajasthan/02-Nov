-- =============================================================================
-- AirRajasthan™ Production MySQL Database Schema
-- Compatible with MySQL 8.0+ and MariaDB 10.5+
-- Charset: utf8mb4 (Full Unicode support for international business names)
-- =============================================================================

CREATE TABLE IF NOT EXISTS `_migrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL UNIQUE,
  `executed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` VARCHAR(36) NOT NULL,
  `reference_number` VARCHAR(32) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `company_name` VARCHAR(191) NOT NULL,
  `country_code` VARCHAR(10) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `normalized_phone` VARCHAR(32) NOT NULL,
  `category` ENUM('Shipper', 'CHA', 'Freight Forwarder', 'Airline Operator') NOT NULL,
  `message` TEXT NOT NULL,
  `context` VARCHAR(191) NULL DEFAULT NULL,
  `idempotency_key` VARCHAR(64) NULL DEFAULT NULL,
  `status` ENUM('NEW', 'ASSIGNED', 'IN_PROGRESS', 'AWAITING_CUSTOMER', 'CLOSED') NOT NULL DEFAULT 'NEW',
  `assigned_staff_id` VARCHAR(36) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_inquiries_reference_number` (`reference_number`),
  UNIQUE KEY `uniq_inquiries_idempotency_key` (`idempotency_key`),
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_assigned_staff` (`assigned_staff_id`),
  INDEX `idx_inquiries_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `staff_users` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `role` ENUM('ADMIN', 'TEAM') NOT NULL DEFAULT 'TEAM',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_staff_users_email` (`email`),
  INDEX `idx_staff_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `staff_sessions` (
  `id` VARCHAR(64) NOT NULL,
  `staff_id` VARCHAR(36) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_staff_sessions_staff_id` (`staff_id`),
  INDEX `idx_staff_sessions_expires_at` (`expires_at`),
  CONSTRAINT `fk_staff_sessions_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `inquiry_notes` (
  `id` VARCHAR(36) NOT NULL,
  `inquiry_id` VARCHAR(36) NOT NULL,
  `staff_id` VARCHAR(36) NOT NULL,
  `author_name` VARCHAR(191) NOT NULL,
  `note` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_inquiry_notes_inquiry_id` (`inquiry_id`),
  CONSTRAINT `fk_inquiry_notes_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_inquiry_notes_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `inquiry_activity` (
  `id` VARCHAR(36) NOT NULL,
  `inquiry_id` VARCHAR(36) NOT NULL,
  `staff_id` VARCHAR(36) NULL DEFAULT NULL,
  `actor_name` VARCHAR(191) NOT NULL,
  `action` VARCHAR(64) NOT NULL,
  `details` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_inquiry_activity_inquiry_id` (`inquiry_id`),
  CONSTRAINT `fk_inquiry_activity_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
