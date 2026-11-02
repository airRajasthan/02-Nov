-- Migration 001: Create inquiries table
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
