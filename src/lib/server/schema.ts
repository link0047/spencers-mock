import { 
  integer,
  pgTable,
  serial,
  boolean,
  varchar,
  numeric,
  date,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const productsTable =  pgTable("products", {
  product_id: serial("product_id").primaryKey(),
  pid: varchar("pid").unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sku: varchar("sku", { length: 50 }).unique().notNull(),
  max_quantity: integer("max_quantity").notNull().default(99),
  base_price: numeric("base_price", { precision: 10, scale: 2 }),
  discounted_price: numeric("discounted_price", { precision: 10, scale: 2 }),
  price_currency: varchar("price_currency", { length: 3 }),
  is_available: boolean("is_available").default(true),
  availability_date: date("availability_date"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`).notNull(),
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  meta_keywords: varchar("meta_keywords", { length: 255 }),
  status: varchar("status", { length: 20 }).default("active"),
  vendor_id: integer("vendor_id"),
  vendor_sku: varchar("vendor_sku", { length: 50 }),
  is_featured: boolean("is_feature").default(false),
  is_new: boolean("is_new").default(false),
  is_sale: boolean("is_sale").default(false)
});



export const badgesTable = pgTable("badges", {
  badge_id: serial("badge_id").primaryKey(),
  badge_name: varchar("badge_name", { length: 50 }).unique().notNull()
});

export const categoriesTable = pgTable("categories", {
  category_id: serial("category_id").primaryKey(),
  category_name: varchar("category_name", { length: 255 }).notNull(),
  parent_category_id: integer("parent_category_id")
    .notNull()
    .references(()=> categoriesTable.id, { onDelete: "cascade" })  
});


export const product_categoriesTable = pgTable("product_categories", {
  product_id: INT REFERENCES products(product_id) ON DELETE CASCADE,
  category_id: INT REFERENCES categories(category_id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
});


export const product_badgesTable = pgTable("product_badges", {
  product_id: INT REFERENCES products(product_id) ON DELETE CASCADE,
  badge_id: INT REFERENCES badges(badge_id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, badge_id)
});


export const storesTable = pgTable("stores", {
  store_id: serial("store_id").primaryKey(),
  store_name: VARCHAR(255) NOT NULL,
  street_address: VARCHAR(255) NOT NULL,
  state: VARCHAR(50) NOT NULL,
  zip: VARCHAR(20) NOT NULL
});


export const store_inventoryTable = pgTable("store_inventory", {
  inventory_id: serial("inventory_id").primaryKey(),
  store_id: INT REFERENCES stores(store_id) ON DELETE CASCADE,
  product_id: INT REFERENCES products(product_id) ON DELETE CASCADE,
  stock: INT NOT NULL,
  UNIQUE(store_id, product_id)
});


export const sizesTable = pgTable("sizes", {
  size_id: serial("size_id").primaryKey(),
  size: VARCHAR(50) NOT NULL
});


export const colorsTable = pgTable("colors", {
  color_id: serial("color_id").primaryKey(),
  color_name: VARCHAR(50) NOT NULL,
  color_value: TEXT NOT NULL  
});


export const product_variantsTable = pgTable("product_variants", {
  variant_id: VARCHAR(50) PRIMARY KEY,  
  product_id: INT REFERENCES products(product_id) ON DELETE CASCADE,
  size_id: INT REFERENCES sizes(size_id),
  color_id: INT REFERENCES colors(color_id),
  price: NUMERIC(10, 2) NOT NULL,
  sale_price: NUMERIC(10, 2),
  stock: INT NOT NULL
});


export const product_imagesTable = pgTable("product_images", {
  image_id: serial("image_id").primaryKey(),
  product_id: INT REFERENCES products(product_id) ON DELETE CASCADE,
  image_url: VARCHAR(255) NOT NULL,
  image_order: INT NOT NULL      
});


export const product_restrictionsTable = pgTable("product_restrictions", {
  restriction_id: serial("restriction_id").primaryKey(),
  product_id: INT REFERENCES products(product_id) ON DELETE CASCADE,
  restriction_level: INT NOT NULL,      
  restriction_type: VARCHAR(50) NOT NULL,   
  message: TEXT NOT NULL                    
});