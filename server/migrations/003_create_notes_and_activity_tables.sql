-- Migration 003: Create internal notes and activity log tables
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
