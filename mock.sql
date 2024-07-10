CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  pid VARCHAR(50) UNIQUE NOT NULL,  -- Product ID (PID)
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(50) UNIQUE NOT NULL,  -- SKU for the product
  total_stock INT NOT NULL DEFAULT 0,  -- Total combined stock for the product
  max_quantity INT NOT NULL DEFAULT 99,  -- Maximum quantity allowed per purchase, defaulting to 99
  base_price NUMERIC(10, 2),  -- Base price of the product
  discounted_price NUMERIC(10, 2),  -- Discounted price, if applicable
  price_currency VARCHAR(3),  -- Currency code for pricing
  is_available BOOLEAN DEFAULT true,  -- Flag indicating if the product is currently available
  availability_date DATE,  -- Date when the product will be available, if not currently available
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the product record was created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp when the product record was last updated
  meta_title VARCHAR(255),  -- SEO meta title
  meta_description TEXT,  -- SEO meta description
  meta_keywords VARCHAR(255),  -- SEO meta keywords
  status VARCHAR(20) DEFAULT 'active',  -- Product status (e.g., active, discontinued)
  vendor_id INT,  -- ID of the vendor or supplier
  vendor_sku VARCHAR(50),  -- SKU used by the vendor
  is_featured BOOLEAN DEFAULT false,  -- Flag indicating if the product is featured
  is_new BOOLEAN DEFAULT false,  -- Flag indicating if the product is new
  is_sale BOOLEAN DEFAULT false  -- Flag indicating if the product is on sale
);

-- Table to store badges
CREATE TABLE badges (
  badge_id SERIAL PRIMARY KEY,
  badge_name VARCHAR(50) UNIQUE NOT NULL  -- Name of the badge (e.g., "Exclusive", "Best Seller")
);

-- Table to store categories
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL,
  parent_category_id INT,  -- Self-referencing foreign key to represent nested categories
  FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Table to associate products with categories
CREATE TABLE product_categories (
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Table to associate products with badges
CREATE TABLE product_badges (
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
  badge_id INT REFERENCES badges(badge_id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, badge_id)
);

-- Table to store physical stores
CREATE TABLE stores (
  store_id SERIAL PRIMARY KEY,
  store_name VARCHAR(255) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip VARCHAR(20) NOT NULL
);

-- Table to store store inventory of products
CREATE TABLE store_inventory (
  inventory_id SERIAL PRIMARY KEY,
  store_id INT REFERENCES stores(store_id) ON DELETE CASCADE,
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
  stock INT NOT NULL,
  UNIQUE(store_id, product_id)
);

-- Table to store available sizes
CREATE TABLE sizes (
  size_id SERIAL PRIMARY KEY,
  size VARCHAR(50) NOT NULL
);

-- Table to store colors
CREATE TABLE colors (
  color_id SERIAL PRIMARY KEY,
  color_name VARCHAR(50) NOT NULL,
  color_value TEXT NOT NULL  -- Stores either a hex value or a URL to an image
);

-- Table to store product variants
CREATE TABLE product_variants (
  variant_id VARCHAR(50) PRIMARY KEY,  -- Unique product variant ID
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
  size_id INT REFERENCES sizes(size_id),
  color_id INT REFERENCES colors(color_id),
  price NUMERIC(10, 2) NOT NULL,
  sale_price NUMERIC(10, 2),
  stock INT NOT NULL
);

-- Table to store product images
CREATE TABLE product_images (
  image_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  image_order INT NOT NULL      -- To specify the order of the images
);

-- Table to store product restrictions
CREATE TABLE product_restrictions (
  restriction_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
  restriction_level INT NOT NULL,      -- Level of restriction as a number
  restriction_type VARCHAR(50) NOT NULL,   -- Type of restriction (e.g., "Age Restriction", "Usage Limitation")
  message TEXT NOT NULL                    -- Description or message associated with the restriction
);