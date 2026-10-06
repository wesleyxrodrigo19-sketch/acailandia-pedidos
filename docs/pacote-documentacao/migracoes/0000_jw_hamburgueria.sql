CREATE TABLE `products` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `name` text NOT NULL, `description` text NOT NULL, `category` text NOT NULL, `price` real NOT NULL, `image_url` text NOT NULL, `featured` integer DEFAULT 0 NOT NULL, `active` integer DEFAULT 1 NOT NULL, `sort_order` integer DEFAULT 0 NOT NULL, `created_at` text NOT NULL, `updated_at` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `orders` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `code` text NOT NULL, `channel` text NOT NULL, `customer_name` text NOT NULL, `phone` text DEFAULT '' NOT NULL, `fulfillment` text NOT NULL, `address` text DEFAULT '' NOT NULL, `location_url` text DEFAULT '' NOT NULL, `payment_method` text NOT NULL, `payment_status` text DEFAULT 'pago' NOT NULL, `notes` text DEFAULT '' NOT NULL, `status` text DEFAULT 'novo' NOT NULL, `subtotal` real NOT NULL, `delivery_fee` real DEFAULT 0 NOT NULL, `total` real NOT NULL, `created_at` text NOT NULL, `updated_at` text NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_code_unique` ON `orders` (`code`);
--> statement-breakpoint
CREATE INDEX `idx_orders_status_created` ON `orders` (`status`, `created_at`);
--> statement-breakpoint
CREATE TABLE `order_items` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `order_id` integer NOT NULL, `product_id` integer, `product_name` text NOT NULL, `unit_price` real NOT NULL, `quantity` integer NOT NULL, `notes` text DEFAULT '' NOT NULL, `line_total` real NOT NULL, FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action);
--> statement-breakpoint
CREATE INDEX `idx_order_items_order_id` ON `order_items` (`order_id`);
--> statement-breakpoint
CREATE TABLE `settings` (`key` text PRIMARY KEY NOT NULL, `value` text NOT NULL, `updated_at` text NOT NULL);
--> statement-breakpoint
PRAGMA optimize;
