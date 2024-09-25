export interface ColorData {
  name: string;
  displayName: string;
  colorCode: string;
}

interface Price {
  displayedPrice: number;
  msrpPrice: number;
}

interface Breadcrumb {
  text: string;
  current: boolean;
  href: string | null;
}

interface ValueProps {
  power: number;
  sound: number;
  waterproof: boolean;
  rechargeable: boolean;
  bluetooth: boolean;
}

interface VariantPrice {
  amountInDollars: number;
  amountInCents: number;
  currencySymbol: string;
  currency: string;
}

interface Variant {
  cost: number;
  VARIANT_ID: number;
  swatchColorName: string;
  swatchColorCode: string;
  priceFormatted: string;
  neverOutOfStock: boolean;
  COLOR_NAME: string;
  invLevel: string;
  orderOnlineMessage: string;
  price: VariantPrice;
  orderOnlineEnabled: boolean;
  stock: boolean;
  storePickupMessage: string;
  SIZE_NAME: string;
}

interface VariantInfo {
  colorSingleValueLabel: string;
  display_attributes: Array<{ name: string }>;
  productImageFile: string;
  productId: number;
  lowPrice: number;
  highPrice: number;
  messages: {
    [key: string]: string;
  };
  variants: Variant[];
  priceVariance: boolean;
  showSwatches: string;
  sizeSingleValueLabel?: string;
  productName: string;
}

interface CarouselItem {
  name: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
  url: string;
}

interface RecommendationItem {
  name: string;
  price: string;
  image: {
    src: string;
    alt: string;
  }
  url: string;
}

export interface Product {
  maximumquantity: number;
  name: string;
  pid: string;
  valueprops: ValueProps;
  sku: string;
  breadcrumb: Breadcrumb[];
  recommendationData?: RecommendationItem[];
  images: string[];
  isSoldOut: boolean;
  reviewData?: any;
  price: Price;
  badges: string[]; // You might want to define a more specific type if badges have a known structure
  promos: string[];
  description: string;
  restrictions?: {
    level1?: Array<{ type: string; message: string }>;
    level2?: Array<{ type: string; message: string }>;
  };
  valProps: any[]; // You might want to define a more specific type if valProps have a known structure
  variantInfo?: VariantInfo;
  carouselData?: CarouselItem[];
}

export interface Upsell {
  maximumquantity: number;
  image: string;
  name: string;
  price: number;
  salePrice: number;
  rating: number;
  sku: string;
  fulfillmentValue: null;
  quantity: number;
  variants: Variant[];
  colors?: string[];
  badges: string[];
  promos: string[];
  sizes?: { name: string; outOfStock: boolean }[];
  colorGroupValue?: string;
  defaultSize?: string;
  sizeGroupValue?: string;
  restrictions?: {
    level1?: Array<{ type: string; message: string }>;
    level2?: Array<{ type: string; message: string }>;
  };
  shouldShowSalePrice?: boolean;
}

export type UpsellsCart = {
  [sku: string]: number;
};