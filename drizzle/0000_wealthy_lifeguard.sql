CREATE TABLE IF NOT EXISTS "badges" (
	"badge_id" serial PRIMARY KEY NOT NULL,
	"badge_name" varchar(50) NOT NULL,
	CONSTRAINT "badges_badge_name_unique" UNIQUE("badge_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(255) NOT NULL,
	"parent_category_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "colors" (
	"color_id" serial PRIMARY KEY NOT NULL,
	"color_name" varchar(50),
	"color_value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_badges" (
	"product_id" integer,
	"badge_id" integer,
	CONSTRAINT "product_badges_product_id_badge_id_pk" PRIMARY KEY("product_id","badge_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_categories" (
	"product_id" integer,
	"category_id" integer,
	CONSTRAINT "product_categories_product_id_category_id_pk" PRIMARY KEY("product_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_images" (
	"image_id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"image_url" varchar(255) NOT NULL,
	"image_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_restrictions" (
	"restriction_id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"restriction_level" integer NOT NULL,
	"restriction_type" varchar(50) NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variants" (
	"variant_id" varchar(50) PRIMARY KEY NOT NULL,
	"product_id" integer,
	"size_id" integer,
	"color_id" integer,
	"price" numeric(10, 2) NOT NULL,
	"sale_price" numeric(10, 2),
	"stock" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"pid" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"sku" varchar(50) NOT NULL,
	"max_quantity" integer DEFAULT 99 NOT NULL,
	"base_price" numeric(10, 2),
	"discounted_price" numeric(10, 2),
	"price_currency" varchar(3),
	"is_available" boolean DEFAULT true,
	"availability_date" date,
	"created_at" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"meta_title" varchar(255),
	"meta_description" text,
	"meta_keywords" varchar(255),
	"status" varchar(20) DEFAULT 'active',
	"vendor_id" integer,
	"vendor_sku" varchar(50),
	"is_feature" boolean DEFAULT false,
	"is_new" boolean DEFAULT false,
	"is_sale" boolean DEFAULT false,
	CONSTRAINT "products_pid_unique" UNIQUE("pid"),
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sizes" (
	"size_id" serial PRIMARY KEY NOT NULL,
	"size" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_inventory" (
	"inventory_id" serial PRIMARY KEY NOT NULL,
	"store_id" integer,
	"product_id" integer,
	"stock" integer NOT NULL,
	CONSTRAINT "store_inventory_store_id_product_id_unique" UNIQUE("store_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"store_id" serial PRIMARY KEY NOT NULL,
	"store_name" varchar(255) NOT NULL,
	"street_address" varchar(255) NOT NULL,
	"state" varchar(50),
	"zip" varchar(20) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "parent_category_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."categories"("category_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_badges" ADD CONSTRAINT "product_badges_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_badges" ADD CONSTRAINT "product_badges_badge_id_badges_badge_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("badge_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_restrictions" ADD CONSTRAINT "product_restrictions_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_size_id_sizes_size_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("size_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_color_id_colors_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("color_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store_inventory" ADD CONSTRAINT "store_inventory_store_id_stores_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("store_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store_inventory" ADD CONSTRAINT "store_inventory_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
