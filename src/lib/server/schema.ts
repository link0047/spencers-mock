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
  foreignKey,
  primaryKey,
  unique
} from "drizzle-orm/pg-core";

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
  updated_at: timestamp("updatedAt").defaultNow(),
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
}, (table) => {
  return {
    parentReference: foreignKey({
      columns: [table.parent_category_id],
      foreignColumns: [table.category_id],
      name: "parent_category_id_fk",
    })
      .onDelete("cascade")
  };
});

export const product_categoriesTable = pgTable("product_categories", {
  product_id: integer("product_id").references(() => productsTable.product_id, { onDelete: "cascade" }),
  category_id: integer("category_id").references(() => categoriesTable.category_id, { onDelete: "cascade" })
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.product_id, table.category_id] }),
    pkWithCustomName: primaryKey({ name: 'product_categories_pk', columns: [table.product_id, table.category_id] }),
  }
});

export const product_badgesTable = pgTable("product_badges", {
  product_id: integer("product_id").references(() => productsTable.product_id, { onDelete: "cascade" }),
  badge_id: integer("badge_id").references(() => badgesTable.badge_id, { onDelete: "cascade" })
},(table) => {
  return {
    pk: primaryKey({ columns: [table.product_id, table.badge_id] }),
    pkWithCustomName: primaryKey({ name: 'product_badges_pk', columns: [table.product_id, table.badge_id] }),
  }
});

export const storesTable = pgTable("stores", {
  store_id: serial("store_id").primaryKey(),
  store_name: varchar("store_name", { length: 255 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  state: varchar("state", { length: 50 }),
  zip: varchar("zip", { length: 20 }).notNull()
});

export const store_inventoryTable = pgTable("store_inventory", {
  inventory_id: serial("inventory_id").primaryKey(),
  store_id: integer("store_id").references(() => storesTable.store_id, { onDelete: "cascade" }),
  product_id: integer("product_id").references(() => productsTable.product_id, { onDelete: "cascade" }),
  stock: integer("stock").notNull(),
}, (table) => ({
  unq: unique().on(table.store_id, table.product_id)
}));

export const sizesTable = pgTable("sizes", {
  size_id: serial("size_id").primaryKey(),
  size: varchar("size", { length: 50 })
});

export const colorsTable = pgTable("colors", {
  color_id: serial("color_id").primaryKey(),
  color_name: varchar("color_name", { length: 50 }),
  color_value: text("color_value").notNull()
});

export const product_variantsTable = pgTable("product_variants", {
  variant_id: varchar("variant_id", { length: 50 }).primaryKey(),
  product_id: integer("product_id").references(() => productsTable.product_id, { onDelete: "cascade" }),
  size_id: integer("size_id").references(() => sizesTable.size_id),
  color_id: integer("color_id").references(() => colorsTable.color_id),
  price: numeric("price", {precision: 10, scale: 2 }).notNull(),
  sale_price: numeric("sale_price", {precision: 10, scale: 2 }),
  stock: integer("stock").notNull()
});

export const product_imagesTable = pgTable("product_images", {
  image_id: serial("image_id").primaryKey(),
  product_id: integer("product_id").references(() => productsTable.product_id, { onDelete: "cascade" }),
  image_url: varchar("image_url", { length: 255 }).notNull(),
  image_order: integer("image_order").notNull()      
});

export const product_restrictionsTable = pgTable("product_restrictions", {
  restriction_id: serial("restriction_id").primaryKey(),
  product_id: integer("product_id").references(() => productsTable.product_id, { onDelete: "cascade" }),
  restriction_level: integer("restriction_level").notNull(),      
  restriction_type: varchar("restriction_type", { length: 50 }).notNull(),
  message: text("message").notNull()
});