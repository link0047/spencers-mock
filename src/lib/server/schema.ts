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
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
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
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).unique().notNull()
});

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  parent_category_id: integer("parent_category_id")
}, (table) => {
  return {
    parentReference: foreignKey({
      columns: [table.parent_category_id],
      foreignColumns: [table.id],
      name: "parent_category_id_fk",
    })
      .onDelete("cascade")
  };
});

export const product_categoriesTable = pgTable("product_categories", {
  product_id: varchar("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
  category_id: integer("category_id").references(() => categoriesTable.id, { onDelete: "cascade" })
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.product_id, table.category_id] }),
    pkWithCustomName: primaryKey({ name: "category_pk", columns: [table.product_id, table.category_id] }),
  }
});

export const product_badgesTable = pgTable("product_badges", {
  product_id: varchar("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
  badge_id: integer("badge_id").references(() => badgesTable.id, { onDelete: "cascade" })
},(table) => {
  return {
    pk: primaryKey({ columns: [table.product_id, table.badge_id] }),
    pkWithCustomName: primaryKey({ name: "badge_pk", columns: [table.product_id, table.badge_id] }),
  }
});

export const storesTable = pgTable("stores", {
  id: varchar("id", {length: 20 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zip: varchar("zip", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).default("US"),
  phone_number: varchar("phone_number", { length: 20 }),
  opening_hours: varchar("opening_hours", { length: 255 })
});

export const store_inventoryTable = pgTable("store_inventory", {
  id: serial("id").primaryKey(),
  store_id: varchar("store_id").references(() => storesTable.id, { onDelete: "cascade" }),
  product_id: varchar("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
  stock: integer("stock").notNull(),
}, (table) => ({
  unq: unique().on(table.store_id, table.product_id)
}));

export const sizesTable = pgTable("sizes", {
  id: serial("id").primaryKey(),
  size: varchar("size", { length: 50 }).unique()
});

export const colorsTable = pgTable("colors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).unique(),
  value: text("value").notNull()
});

export const product_variantsTable = pgTable("product_variants", {
  id: varchar("id", { length: 50 }).primaryKey(),
  product_id: varchar("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
  size_id: integer("size_id").references(() => sizesTable.id),
  color_id: integer("color_id").references(() => colorsTable.id),
  price: numeric("price", {precision: 10, scale: 2 }).notNull(),
  sale_price: numeric("sale_price", {precision: 10, scale: 2 }),
  stock: integer("stock").notNull()
});

export const product_imagesTable = pgTable("product_images", {
  id: serial("id").primaryKey(),
  product_id: varchar("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 255 }).notNull(),
  order: integer("order").notNull()      
});

export const product_restrictionsTable = pgTable("product_restrictions", {
  id: serial("id").primaryKey(),
  product_id: varchar("product_id").references(() => productsTable.id, { onDelete: "cascade" }),
  level: integer("level").notNull(),      
  type: varchar("type", { length: 50 }).notNull(),
  message: text("message").notNull()
});