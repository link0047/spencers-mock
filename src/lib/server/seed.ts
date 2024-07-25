import { db, client } from "$lib/server/db";
import { 
  productsTable,
  badgesTable,
  product_badgesTable,
  storesTable,
  sizesTable,
  colorsTable,
  product_imagesTable,
  product_restrictionsTable,
  product_variantsTable,
  store_inventoryTable
} from "$lib/server/schema";
import { eq } from "drizzle-orm";

interface ColorData {
  name: string;
  displayName: string;
  colorCode: string;
}

interface BreadcrumbItem {
  text: string;
  current: boolean;
  href: string | null;
}

interface Restriction {
  type: string;
  message: string;
}

interface VariantInfo {
  colorSingleValueLabel: string;
  display_attributes: DisplayAttribute[];
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
  productName: string;
}

interface DisplayAttribute {
  name: string;
}

interface Variant {
  cost: number;
  VARIANT_ID: number;
  swatchColorName: string;
  swatchColorCode: string;
  priceFormatted: string;
  neverOutOfStock: boolean;
  COLOR_NAME?: string;
  invLevel: string;
  orderOnlineMessage: string;
  price: {
    amountInDollars: number;
    amountInCents: number;
    currencySymbol: string;
    currency: string;
  };
  orderOnlineEnabled: boolean;
  stock: boolean;
  storePickupMessage: string;
  SIZE_NAME: string;
}

interface Recommendation {
  name: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
  url: string;
}

interface Product {
  maximumquantity: number;
  name: string;
  pid: string;
  sku: string;
  breadcrumb: BreadcrumbItem[];
  images: string[];
  isSoldOut: boolean;
  price: {
    displayedPrice: number;
    msrpPrice: number;
  };
  badges: string[];
  promos: any[]; // Update with actual type if possible
  description: string;
  restrictions: {
    level1: Restriction[];
    level2: Restriction[];
  };
  reviewData: any; // Update with actual type if possible
  valProps: any[]; // Update with actual type if possible
  variantInfo: VariantInfo;
  recommendationData: Recommendation[];
}

const colorMapping: ColorData[] = [
  {"name": "AUBURN", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "AUBURN/BLACK", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "AMETHYST", "displayName": "Purple", "colorCode": "#A020F0"},
  {"name": "ANIMAL PRINT", "displayName": "Print", "colorCode": "linear-gradient(to right,#000407,#faf9f9,#f7eed8,#ddaa36,#03050f,#cb8c35)"},
  {"name": "AQUAMARINE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "AQUARIUS", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "ASSORTED COLORS", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "AUSTIN", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "BERRY", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "BLACK AND  BLUE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLUE RASPBERRY", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLACK AND RED", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "BEIGE", "displayName": "Natural", "colorCode": "#F5F5DC"},
  {"name": "BURGUNDY", "displayName": "Burgundy", "colorCode": "#800020"},
  {"name": "BLUE LIQUID WHITE WAX", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLACK AND SILVER", "displayName": "Black and Silver", "colorCode": "linear-gradient(to right,#000,#C0C0C0)"},
  {"name": "BLACK", "displayName": "Black", "colorCode": "#000"},
  {"name": "BLUE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BRONZE", "displayName": "Bronze", "colorCode": "#CD7F32"},
  {"name": "BLACK ONYX", "displayName": "Black", "colorCode": "#000"},
  {"name": "BLACK AND PINK", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "BLUE LIQUID YELLOW WAX", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BROWN", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "BLUE AND SILVER", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLACK AND TAN", "displayName": "Tan", "colorCode": "#D2B48C"},
  {"name": "BUTTER", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "BASIL", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "BLACK AND WHITE", "displayName": "White", "colorCode": "#FFF"},
  {"name": "BORDEAUX", "displayName": "Burgundy", "colorCode": "#800020"},
  {"name": "BLUEBERRY", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLACK AND GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "BLACK AND ORANGE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "BLACK AND PURPLE", "displayName": "Purple", "colorCode": "#A020F0"},
  {"name": "BLONDE", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "BLACK/BLUE/PINK", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "BLACK/BLUE/RED", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "BLACK AND YELLOW", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "BLACK/GOLD", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "COLA", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "CLEAR LIQUID BLACK WAX", "displayName": "Black", "colorCode": "#000"},
  {"name": "COTTON CANDY", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "CLEAR LIQUID RED WAX", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "CERISE", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "COFFEE", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "CHERRY", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "CAMOUFLAGE", "displayName": "Print", "colorCode": "linear-gradient(to right,#000407,#faf9f9,#f7eed8,#ddaa36,#03050f,#cb8c35)"},
  {"name": "CINNAMON", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "COCONUT", "displayName": "White", "colorCode": "#FFF"},
  {"name": "COPPER", "displayName": "Copper", "colorCode": "#B87333"},
  {"name": "CANDY-APPLE RED", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "CYAN", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "CUBIC ZIRCONIA", "displayName": "Clear", "colorCode": "#DDDDDF"},
  {"name": "DANDELION", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "DIAMOND", "displayName": "Clear", "colorCode": "#DDDDDF"},
  {"name": "DARK BROWN", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "DARK GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "DIAMOND-WHITE", "displayName": "White", "colorCode": "#FFF"},
  {"name": "ECRU", "displayName": "Natural", "colorCode": "#F5F5DC"},
  {"name": "ECRU/BLACK", "displayName": "Natural", "colorCode": "#F5F5DC"},
  {"name": "EBONY", "displayName": "Black", "colorCode": "#000"},
  {"name": "EMERALD", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "EMERALD AND BLACK", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "FROSTED", "displayName": "Clear", "colorCode": "#DDDDDF"},
  {"name": "FOREST GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "FUCHSIA", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "GOLD", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "GOLD AND BLACK", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "GOLD AND RED", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "GOLD/PINK/RED", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "GREEN APPLE", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "GRAPHITE", "displayName": "Gray", "colorCode": "#808080"},
  {"name": "GRANITE", "displayName": "Gray", "colorCode": "#808080"},
  {"name": "GOLD LIQUID WHITE WAX", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "GREEN/BLUE", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "GREEN/GREY", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "GREEN/BLACK", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "HICKORY", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "ICE", "displayName": "Clear", "colorCode": "#DDDDDF"},
  {"name": "IVORY", "displayName": "White", "colorCode": "#FFF"},
  {"name": "ICE BLUE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "JASPER", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "JUTE", "displayName": "Natural", "colorCode": "#F5F5DC"},
  {"name": "JET BLACK", "displayName": "Black", "colorCode": "#000"},
  {"name": "JUNIPER", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "KIWI", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "LAPIS", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "LEMON", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "LAVENDER", "displayName": "Purple", "colorCode": "#A020F0"},
  {"name": "LIGHT GREY", "displayName": "Gray", "colorCode": "#808080"},
  {"name": "LIGHT PINK", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "LIGHT YELLOW", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "LIGHT GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "LIME", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "MAGENTA", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "MALACHITE", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "MANDARIN ORANGE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "MAHOGANY", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "MANGO", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "MOCHA", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "MILK CHOCOLATE", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "MINT", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "MINT GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "MULTI COLOR", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI-GREEN", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI-COLORED", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI PASTEL", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI/PASTELS", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI/BLACK", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI COLORED", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI/WHITE", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI/BROWN", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI/SILVER", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI COLOR BLACK", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTI COLOR/BLACK", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MULTICOLOR", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "MUSTARD", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "NAVY", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "OLIVE", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "ONYX", "displayName": "Black", "colorCode": "#000"},
  {"name": "ORANGE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE AND BLACK", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE AND BLUE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE AND WHITE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE/BLUE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE/PINK", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE/RED", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "PALE YELLOW", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "PALE BLUE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "PEACH", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "PEARL", "displayName": "White", "colorCode": "#FFF"},
  {"name": "PINE", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "PINK", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "PINK/BLACK", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "PINK AND WHITE", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "PINK BLACK", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "PINK PEARL", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "PASTEL MULTI", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "PLUM", "displayName": "Purple", "colorCode": "#A020F0"},
  {"name": "PURPLE", "displayName": "Purple", "colorCode": "#A020F0"},
  {"name": "RAINBOW", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "RED", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "RED AND BLACK", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "RED/BLACK", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "RED AND GOLD", "displayName": "Gold", "colorCode": "#FFD700"},
  {"name": "RED ORANGE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ROSE", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "RUBY", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "RUBY RED", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "SAGE", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "SALMON", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "SAND", "displayName": "Natural", "colorCode": "#F5F5DC"},
  {"name": "SAPPHIRE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "SCARLET", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "SILVER", "displayName": "Silver", "colorCode": "#C0C0C0"},
  {"name": "SILVER AND BLACK", "displayName": "Silver", "colorCode": "#C0C0C0"},
  {"name": "SILVER-WHITE", "displayName": "Silver", "colorCode": "#C0C0C0"},
  {"name": "SILVER/GREY", "displayName": "Silver", "colorCode": "#C0C0C0"},
  {"name": "SKY BLUE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "SMOKED", "displayName": "Gray", "colorCode": "#808080"},
  {"name": "SPICE", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "TAN", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "TANGERINE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "TANGERINE AND BLACK", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "TEAL", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "TERRACOTTA", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "TIGER", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "TOPAZ", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "TURQUOISE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "UNCOLORED", "displayName": "Clear", "colorCode": "#DDDDDF"},
  {"name": "VIOLET", "displayName": "Purple", "colorCode": "#A020F0"},
  {"name": "WHITE", "displayName": "White", "colorCode": "#FFF"},
  {"name": "WHITE/BLACK", "displayName": "White", "colorCode": "#FFF"},
  {"name": "WHITE AND BLACK", "displayName": "White", "colorCode": "#FFF"},
  {"name": "WHITE/GRAY", "displayName": "White", "colorCode": "#FFF"},
  {"name": "WHITE/BLUE", "displayName": "White", "colorCode": "#FFF"},
  {"name": "YELLOW", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "YELLOW/BLACK", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "YELLOW AND BLACK", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "YELLOW AND BLUE", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "YELLOW/BLUE", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "YELLOW GREEN", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "BLOW BERRY", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "BLUE ICE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLONDE/PINK", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "ORANGE/BLUE", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "ORANGE/GREEN", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "ZIRCON", "displayName": "Orange", "colorCode": "#FFA500"},
  {"name": "BLONDE AND BLUE", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "AUBURN AND BLONDE", "displayName": "Red", "colorCode": "#FF0000"},
  {"name": "BLONDE AND BLACK", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "BLONDE/BROWN", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "ZEBRA PRINT", "displayName": "Print", "colorCode": "linear-gradient(to right,#000407,#faf9f9,#f7eed8,#ddaa36,#03050f,#cb8c35)"},
  {"name": "BLUE / WHITE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "TEST", "displayName": "No Color", "colorCode": ""},
  {"name": "BLACK / MULTI", "displayName": "Black", "colorCode": "#000"},
  {"name": "BLACK AND FUCHSIA", "displayName": "Pink", "colorCode": "#FFC0CB"},
  {"name": "BLACK AND IVORY", "displayName": "Natural", "colorCode": "#F5F5DC"},
  {"name": "BLACK/PURPLE/GREEN", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "BLACK/RED/ORANGE", "displayName": "Multi", "colorCode": "linear-gradient(to right,orange,yellow,green,cyan,blue,violet)"},
  {"name": "BLACK/GRAY", "displayName": "Gray", "colorCode": "#808080"},
  {"name": "BLACK/TURQUOISE", "displayName": "Blue", "colorCode": "#0000FF"},
  {"name": "BLUE/GREEN", "displayName": "Green", "colorCode": "#00FF00"},
  {"name": "BLUE/YELLOW", "displayName": "Yellow", "colorCode": "#FFFF00"},
  {"name": "DARK BROWN", "displayName": "Brown", "colorCode": "#964B00"},
  {"name": "LIGHT BROWN", "displayName": "Brown", "colorCode": "#964B00"}
];

const data: Product[] = [
  {
    "maximumquantity": 2,
    "name": "Talking Tiffany Doll - 20 Inch",
    "pid": "166117",
    "sku": "03366192",
    "breadcrumb": [
      { text: "Home", current: false, href: "/" },
      { text: "Seasonal", current: false, href: "#" },
      { text: "Halloween", current: false, href: "#" },
      { text: "Halloween Decorations", current: false, href: "#" },
      { text: "Scary Dolls & Figures", current: false, href: "#" },
      { text: "Talking Tiffany Doll - 20 Inch", current: true, href: null }
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/03366192-a",
      "https://spencers.scene7.com/is/image/Spencers/03366192-b",
      "https://spencers.scene7.com/is/image/Spencers/03366192-c",
      "https://spencers.scene7.com/is/image/Spencers/03366192-d",
      "https://spencers.scene7.com/is/image/Spencers/03366192-e",
      "https://spencers.scene7.com/is/image/Spencers/03366192-f",
      "https://spencers.scene7.com/is/image/Spencers/03366192-g",
      "https://spencers.scene7.com/is/image/Spencers/03366192-a-AVS"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 89.99,
      "msrpPrice": 89.99
    },
    "badges": [
      "Exclusive", "Best Seller"
    ],
    "promos": [],
    "description": "<p>A true classic never goes out of style! This talking Tiffany doll is the perfect addition to every horror buff's collection. With her signature white dress, black jacket and authentic chest tattoo, this Tiffany doll looks just like the real deal.</p><ul><li>Officially licensed</li><li>Exclusively at Spencer's</li><li>Spoken Phrases:<ul><li>Take it from me honey, plastic is no substitute for a nice hunk of wood!</li><li>Oh, Chucky look at us. We belong dead. Goodbye darling. I'll see you in hell.</li><li>We could do this the easy way or the hard way. It's really up to you.</li><li>I believe we already met, haven't we, sweet-face? I hope you left room for dessert!</li></ul></li><li>Head turns and mouth moves</li><li>Battery Type: 3AAA (included)</li><li>Dimensions: 20\" H x 8\" W x 11\" D (13.5\" sitting)</li><li>Material: Polyester, faux leather, synthetic fibers</li><li>Care: Wipe clean</li><li>Imported</li></ul>",
    "restrictions": {
      level1: [{ type: "Oversize Item ", message: "This item is considered oversized and will require an additional shipping fee. Shipping promos are valid, but oversize charge will still apply." }],
      level2: [{ type: "Maximum Quantity", message: "Maximum quantity of item is limited per order." }],
    },
    "reviewData": {},
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        }
      ],
      "productImageFile": "03366192-a",
      "productId": 166117,
      "lowPrice": 89.99,
      "highPrice": 89.99,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 89.99,
          "VARIANT_ID": 401292,
          "swatchColorName": "MULTI-COLOR",
          "swatchColorCode": "MU",
          "priceFormatted": "$89.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "MULTI-COLOR",
          "invLevel": "976",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 89.99,
            "amountInCents": 8999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": ""
        }
      ],
      "priceVariance": false,
      "showSwatches": "N",
      "productName": "Talking+Tiffany+Doll+-+20+Inch"
    },
    recommendationData: [{ "name": "Talking Chucky Doll - 24 inch", "price": "89.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/02842623-a?wid=277&hei=277&fmt=webp", "alt": "02842623 - Talking Chucky Doll - 24 inch" }, "url": "https://www.spencersonline.com/product/talking-chucky-doll-24-inch/21683.uts" }, { "name": "Glen Doll - Chucky", "price": "69.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/04208567-a?wid=277&hei=277&fmt=webp", "alt": "04208567 - Glen Doll - Chucky" }, "url": "https://www.spencersonline.com/product/glen-doll-chucky/250687.uts" }, { "name": "Bride of Chucky Tiffany Doll", "price": "69.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/02402865-a?wid=277&hei=277&fmt=webp", "alt": "02402865 - Bride of Chucky Tiffany Doll" }, "url": "https://www.spencersonline.com/product/bride-of-chucky-tiffany-doll/25401.uts" }, { "name": "Good Guys Chucky Doll - 24 Inch", "price": "89.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/04132239-a?wid=277&hei=277&fmt=webp", "alt": "04132239 - Good Guys Chucky Doll - 24 Inch" }, "url": "https://www.spencersonline.com/product/good-guys-chucky-doll-24-inch/242620.uts" }, { "name": "Chucky Doll", "price": "69.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/02402873-a?wid=277&hei=277&fmt=webp", "alt": "02402873 - Chucky Doll" }, "url": "https://www.spencersonline.com/product/chucky-doll/743.uts" }]
  }, {
    "maximumquantity": 99,
    "name": "Pink Gloomy Bear Hoodie",
    "pid": "253020",
    "sku": "04281861",
    "breadcrumb": [
      { text: "HOME", current: false, href: "/" },
      { text: "Pop Culture", current: false, href: "#" },
      { text: "Anime", current: false, href: "#" },
      { text: "Gloomy Bear", current: false, href: "#" },
      { text: "Pink Gloomy Bear Hoodie", current: true, href: null },
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/04281861-a",
      "https://spencers.scene7.com/is/image/Spencers/04281861-b",
      "https://spencers.scene7.com/is/image/Spencers/04281861-c"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 54.99,
      "msrpPrice": 54.99
    },
    "badges": [],
    "promos": [],
    "description": "<p>Cozy up with your favorite pop culture character with this pink Gloomy Bear hoodie! This cozy hoodie is perfect for indoors or outdoors and is sure to let everyone know you're a Gloomy Bear fan.</p><ul><li>Officially licensed</li><li>Exclusively at Spencer's</li><li>Crewneck</li><li>Long sleeves</li><li>Material: Cotton</li><li>Care: Machine wash; tumble dry low</li><li>Imported</li><li>This shirt is Unisex Sizing only</li><li>For a fitted look, order one size smaller than your normal size</li></ul>",
    "restrictions": [],
    "reviewData": {},
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        },
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "04281861-a",
      "productId": 253020,
      "lowPrice": 54.99,
      "highPrice": 59.99,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 54.99,
          "VARIANT_ID": 579336,
          "swatchColorName": "PINK",
          "swatchColorCode": "PK",
          "priceFormatted": "$54.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "PINK",
          "invLevel": "14",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 54.99,
            "amountInCents": 5499,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT SMALL"
        },
        {
          "cost": 54.99,
          "VARIANT_ID": 579337,
          "swatchColorName": "PINK",
          "swatchColorCode": "PK",
          "priceFormatted": "$54.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "PINK",
          "invLevel": "0",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 54.99,
            "amountInCents": 5499,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": false,
          "stock": false,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT LARGE"
        },
        {
          "cost": 54.99,
          "VARIANT_ID": 579338,
          "swatchColorName": "PINK",
          "swatchColorCode": "PK",
          "priceFormatted": "$54.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "PINK",
          "invLevel": "11",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 54.99,
            "amountInCents": 5499,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT EX LARGE"
        },
        {
          "cost": 59.99,
          "VARIANT_ID": 579339,
          "swatchColorName": "PINK",
          "swatchColorCode": "PK",
          "priceFormatted": "$59.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "PINK",
          "invLevel": "19",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 59.99,
            "amountInCents": 5999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "2X"
        },
        {
          "cost": 54.99,
          "VARIANT_ID": 579335,
          "swatchColorName": "PINK",
          "swatchColorCode": "PK",
          "priceFormatted": "$54.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "PINK",
          "invLevel": "0",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 54.99,
            "amountInCents": 5499,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": false,
          "stock": false,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT MEDIUM"
        }
      ],
      "priceVariance": true,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "Pink+Gloomy+Bear+Hoodie"
    },
    recommendationData: [{ "name": "Towelie Hoodie - South Park", "price": "44.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/04346060-a?wid=277&hei=277&fmt=webp", "alt": "04346086 - Towelie Hoodie - South Park" }, "url": "https://www.spencersonline.com/product/towelie-hoodie-south-park/262420.uts" }, { "name": "Eating Gloomy Bear Sweatshirt", "price": "44.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/03941192-a?wid=277&hei=277&fmt=webp", "alt": "03941234 - Eating Gloomy Bear Sweatshirt" }, "url": "https://www.spencersonline.com/product/eating-gloomy-bear-sweatshirt/237779.uts" }, { "name": "Stitch 3D Hoodie - Lilo & Stitch", "price": "54.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/04281796-a?wid=277&hei=277&fmt=webp", "alt": "04281838 - Stitch 3D Hoodie - Lilo & Stitch" }, "url": "https://www.spencersonline.com/product/stitch-3d-hoodie-lilo-stitch/253059.uts" }, { "name": "Have a Creamy Day Zip Hoodie - South Park", "price": "49.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/04343489-a?wid=277&hei=277&fmt=webp", "alt": "04343505 - Have a Creamy Day Zip Hoodie - South Park" }, "url": "https://www.spencersonline.com/product/have-a-creamy-day-zip-hoodie-south-park/262214.uts" }, { "name": "Jack and Sally Together Forever Tie Dye Hoodie - The Nightmare Before", "price": "49.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/04312112-a?wid=277&hei=277&fmt=webp", "alt": "04312146 - Jack and Sally Together Forever Tie Dye Hoodie - The Nightmare Before" }, "url": "https://www.spencersonline.com/product/jack-and-sally-together-forever-tie-dye-hoodie-the-nightmare-before-christmas/259261.uts" }]
  }, {
    "maximumquantity": 99,
    "name": "Black Vibrating Barbell - 14 Gauge",
    "pid": "178495",
    "sku": "03516903",
    "breadcrumb": [
      { text: "HOME", current: false, href: "/" },
      { text: "Body Jewelry", current: false, href: "/" },
      { text: "Tongue Rings", current: false, href: "/" },
      { text: "Black Vibrating Barbell - 14 Gauge", current: false, href: "/" },
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/03516903-a",
      "https://spencers.scene7.com/is/image/Spencers/03516903-b",
      "https://spencers.scene7.com/is/image/Spencers/03516903-c"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 23.99,
      "msrpPrice": 29.99
    },
    "badges": [],
    "promos": [],
    "description": "<ul><li>Piercing Type: Tongue</li><li>Barbell Material: 316L Surgical steel</li><li>Accent Material: Metal alloy</li><li>Gauge: 14 Gauge</li><li>Ball Size: 5mm</li><li>Battery Type: Cell battery (included)</li><li>Threaded closure</li><li>Battery Type: 3 L736.392 Cell Batteries (Included)</li><li>Jewelry Care: Clean with antibacterial soap and warm water</li><li>Piercing Care: Clean with saline solution</li><li>Imported</li><li>Note: Do not use rubbing alcohol to clean jewelry. Normal alcohol consumption and/or mouthwash may accelerate wear and tear</li><li>Note: To start vibrations, remove circular paper tab from battery compartment.</li><li>Do not over-thread or apply excess pressure when adding/removing beads as breakage could occur</li><li>Surgical steel may contain trace amounts of nickel&nbsp;</li></ul>",
    "restrictions": [],
    "reviewData": {},
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        },
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "03516903-a",
      "productId": 178495,
      "lowPrice": 23.99,
      "highPrice": 23.99,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 29.99,
          "VARIANT_ID": 417915,
          "swatchColorName": "BLACK",
          "swatchColorCode": "BK",
          "priceFormatted": "$23.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "BLACK",
          "invLevel": "42",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 23.99,
            "amountInCents": 2399,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "14G 5/8 INCH"
        }
      ],
      "priceVariance": false,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "Black+Vibrating+Barbell+-+14+Gauge"
    },
    recommendationData: [{ "name": "Black Cum Here Vibrating Barbell - 14 Gauge", "price": "29.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/03638731-a?wid=240&hei=240&fmt=webp", "alt": "03638731 - Black Cum Here Vibrating Barbell - 14 Gauge" }, "url": "https://www.spencersonline.com/product/black-cum-here-vibrating-barbell-14-gauge/215832.uts" }, { "name": "Blue and Black Koosh Vibrating Barbell - 14 Gauge", "price": "29.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/00813022-a?wid=240&hei=240&fmt=webp", "alt": "00813022 - Blue and Black Koosh Vibrating Barbell - 14 Gauge" }, "url": "https://www.spencersonline.com/product/blue-and-black-koosh-vibrating-barbell-14-gauge/60044.uts" }, { "name": "Cum Here Vibrating Barbell - 14 Gauge", "price": "29.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/03731833-a?wid=240&hei=240&fmt=webp", "alt": "03731833 - Cum Here Vibrating Barbell - 14 Gauge" }, "url": "https://www.spencersonline.com/product/cum-here-vibrating-barbell-14-gauge/222710.uts" }, { "name": "Black Fuck Vibrating Barbell - 14 Gauge", "price": "29.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/03516929-a?wid=240&hei=240&fmt=webp", "alt": "03516929 - Black Fuck Vibrating Barbell - 14 Gauge" }, "url": "https://www.spencersonline.com/product/black-fuck-vibrating-barbell-14-gauge/178497.uts" }, { "name": "Black and White Koosh Vibrating Barbell - 14 Gauge", "price": "29.99", "image": { "src": "https://spencers.scene7.com/is/image/Spencers/03980968-a?wid=240&hei=240&fmt=webp", "alt": "03980968 - Black and White Koosh Vibrating Barbell - 14 Gauge" }, "url": "https://www.spencersonline.com/product/black-and-white-koosh-vibrating-barbell-14-gauge/239612.uts" }]
  }, {
    "maximumquantity": 99,
    "name": "Sleep Token Ascension T Shirt",
    "pid": "267647",
    "sku": "04406526",
    "breadcrumb": [
      {
        "text": "Home",
        "current": false,
        "href": "/"
      },
      {
        "text": "Graphic Tees",
        "current": false,
        "href": "#"
      },
      {
        "text": "Sleep Token Ascension T Shirt",
        "current": true,
        "href": null
      }
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/04406526-a"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 19.99,
      "msrpPrice": 24.99
    },
    "badges": [],
    "promos": [],
    "description": "Everyone will know what you're listening to when you show off your taste in music with this officially licensed Sleep Token Ascension T Shirt! Suit up in this stylish tee and you'll always be showing your fandom. Officially licensed Exclusively at Spencer's Crew neck Short sleeves Material: Cotton Care: Machine wash; tumble dry low Imported This tee is Unisex Sizing only For a fitted look, order one size smaller than your regular size Note: This item is print to order and may have a 1 to 2 day extra processing time.",
    "restrictions": [],
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        },
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "04406526-a",
      "productId": 267647,
      "lowPrice": 19.99,
      "highPrice": 21.59,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 24.99,
          "VARIANT_ID": 604095,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "38",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT SMALL"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 604094,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "26",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT MEDIUM"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 604097,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "7",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT EX LARGE"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 604096,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "15",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT LARGE"
        },
        {
          "cost": 26.99,
          "VARIANT_ID": 620949,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$21.59",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "0",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 21.59,
            "amountInCents": 2159,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": false,
          "stock": false,
          "storePickupMessage": "",
          "SIZE_NAME": "2X"
        }
      ],
      "priceVariance": true,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "Sleep+Token+Ascension+T+Shirt"
    },
    "recommendationData:": []
  }, {
    "maximumquantity": 99,
    "name": "White Teeth Crawler Cartilage Barbell - 18 Gauge",
    "pid": "241752",
    "sku": "04115739",
    "breadcrumb": [
      {
        "text": "Home",
        "current": false,
        "href": "/"
      },
      {
        "text": "Body Jewelry",
        "current": false,
        "href": "#"
      },
      {
        "text": "Barbell Jewelry",
        "current": false,
        "href": "#"
      },
      {
        "text": "White Teeth Crawler Cartilage Barbell - 18 Gauge",
        "current": true,
        "href": null
      }
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/04115739-a",
      "https://spencers.scene7.com/is/image/Spencers/04115739-b",
      "https://spencers.scene7.com/is/image/Spencers/04276820-a",
      "https://spencers.scene7.com/is/image/Spencers/04276820-b"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 14.99,
      "msrpPrice": 14.99
    },
    "badges": [],
    "promos": [
      "BOGO 40% OFF"
    ],
    "description": "Exclusively at Spencer's Includes: 1 Cartilage barbell Piercing type: Tragus Barbell material: 316L surgical steel Gauge: 18 Gauge Barbell length: 6mm Ball size: 3mm Externally threaded closure Jewelry Care: Clean with antibacterial soap and warm water Piercing Care: Clean with H2Ocean Aftercare Spray (sold separately) or saline solution Imported Note: Do not use any harsh, alcohol-based chemicals as this may cause tarnishing Surgical steel may contain trace amounts of nickel Do not over-thread or apply excess pressure when adding/removing beads as breakage could occur Wear in healed piercings only. If irritation occurs, remove immediately This is a decorative item and should not be worn to sleep",
    "restrictions": [],
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        },
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "04115739-a",
      "productId": 241752,
      "lowPrice": 14.99,
      "highPrice": 16.99,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 16.99,
          "VARIANT_ID": 578962,
          "swatchColorName": "WHITE",
          "swatchColorCode": "WH",
          "priceFormatted": "$16.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "WHITE",
          "invLevel": "15",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 16.99,
            "amountInCents": 1699,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "16 G"
        },
        {
          "cost": 14.99,
          "VARIANT_ID": 555892,
          "swatchColorName": "WHITE",
          "swatchColorCode": "WH",
          "priceFormatted": "$14.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "WHITE",
          "invLevel": "20",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 14.99,
            "amountInCents": 1499,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "18 G"
        }
      ],
      "priceVariance": true,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "White+Teeth+Crawler+Cartilage+Barbell+-+18+Gauge"
    },
    "carouselData": [
      {
        "name": "Black Coiled Snake Helix Cuff - 16 Gauge",
        "price": "$14.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03912003-a?wid=240&hei=240&fmt=webp",
          "alt": "04277976 - Black Coiled Snake Helix Cuff - 16 Gauge"
        },
        "url": "https://www.spencersonline.com/product/black-coiled-snake-helix-cuff-16-gauge/235677.uts"
      },
      {
        "name": "Silvertone Spike Curve Chain Cartilage Earring - 18 Gauge",
        "price": "$14.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04144069-a?wid=240&hei=240&fmt=webp",
          "alt": "04276812 - Silvertone Spike Curve Chain Cartilage Earring - 18 Gauge"
        },
        "url": "https://www.spencersonline.com/product/silvertone-spike-curve-chain-cartilage-earring-18-gauge/243451.uts"
      },
      {
        "name": "3 Flower Cartilage Earring - 16 Gauge",
        "price": "$16.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03640372-a?wid=240&hei=240&fmt=webp",
          "alt": "04100848 - 3 Flower Cartilage Earring - 16 Gauge"
        },
        "url": "https://www.spencersonline.com/product/3-flower-cartilage-earring-16-gauge/216019.uts"
      },
      {
        "name": "CZ Ear Crawler Cartilage Earrings - 18 Gauge",
        "price": "$16.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03946316-a?wid=240&hei=240&fmt=webp",
          "alt": "03946316 - CZ Ear Crawler Cartilage Earrings - 18 Gauge"
        },
        "url": "https://www.spencersonline.com/product/cz-ear-crawler-cartilage-earrings-18-gauge/237964.uts"
      },
      {
        "name": "Snake Cartilage Earring - 16 Gauge",
        "price": "$14.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03640380-a?wid=240&hei=240&fmt=webp",
          "alt": "03912037 - Snake Cartilage Earring - 16 Gauge"
        },
        "url": "https://www.spencersonline.com/product/snake-cartilage-earring-16-gauge/216020.uts"
      }
    ]
  }, {
    "maximumquantity": 99,
    "name": "Black Velvet Waterproof 20-Function Multi-Speed Rechargeable Wand Massager 7 Inch - Hott Love Extreme",
    "pid": "241556",
    "sku": "04112496",
    "breadcrumb": [
      {
        "text": "Home",
        "current": false,
        "href": "/"
      },
      {
        "text": "Personal Care",
        "current": false,
        "href": "#"
      },
      {
        "text": "Sex & Wellness",
        "current": false,
        "href": "#"
      },
      {
        "text": "Top Sellers",
        "current": false,
        "href": "#"
      },
      {
        "text": "Black Velvet Waterproof 20-function Multi-speed Rechargeable Wand Massager 7 Inch - Hott Love Extreme",
        "current": true,
        "href": null
      }
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/03445640-a",
      "https://spencers.scene7.com/is/image/Spencers/04112496-a",
      "https://spencers.scene7.com/is/image/Spencers/04112496-b",
      "https://spencers.scene7.com/is/image/Spencers/03445640-b",
      "https://spencers.scene7.com/is/image/Spencers/03445640-c",
      "https://spencers.scene7.com/is/image/Spencers/04112496-c",
      "https://spencers.scene7.com/is/image/Spencers/04112496-d",
      "https://spencers.scene7.com/is/image/Spencers/03445640-d",
      "https://spencers.scene7.com/is/image/Spencers/03445640-e",
      "https://spencers.scene7.com/is/image/Spencers/04112496-e",
      "https://spencers.scene7.com/is/image/Spencers/04112496-f",
      "https://spencers.scene7.com/is/image/Spencers/03445640-f"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 49.99,
      "msrpPrice": 49.99
    },
    "badges": [],
    "promos": [
      "BOGO 30% Off with Code"
    ],
    "description": "Have some fun in the bedroom with this Black Velvet Waterproof 20-Function Multi-Speed Rechargeable Wand Massager featuring 20 speeds! Its luxurious butter-soft finish will have you reaching for it again and again. Plus, it's super easy to find the speed that's perfect for you and have a sensual night alone or with a partner. You won't regret incorporating this waterproof vibrator into your sexytime repertoire. Exclusively at Spencer's Total Length: 7.8\" Girth (circumference): 1.6\" at thickest point Material: Silicone, plastic Waterproof 20 functions Multi-speed Battery Type: Lithium battery (rechargeable) Battery Life: 1.5 Hours Charge Time: 1.5 Hours Cord Length: 39.3\" Safe for use with water-based lubricants Care: For best results, use Hott Love Extreme Antibacterial Toy Cleaner. Soap and water may also be used. Imported Arrives in discreet packaging",
    "restrictions": [],
    "powerSound": {
      "power": {
        "total": "4",
        "Discreet": "1",
        "Whisper": "2",
        "Quiet": "3"
      },
      "sound": {
        "total": "2",
        "Discreet": "1",
        "Whisper": "2",
        "Quiet": "3"
      }
    },
    "valProps": [],
    "variantInfo": {
      "display_attributes": [
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "04112496-a",
      "productId": 241556,
      "lowPrice": 49.99,
      "highPrice": 49.99,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 49.99,
          "VARIANT_ID": 555549,
          "swatchColorName": "BLACK",
          "swatchColorCode": "BK",
          "priceFormatted": "$49.99",
          "neverOutOfStock": false,
          "invLevel": "214",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 49.99,
            "amountInCents": 4999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "7 INCHES"
        }
      ],
      "priceVariance": false,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "Black+Velvet+Waterproof+20-Function+Multi-Speed+Rechargeable+Wand+Massager+7+Inch+-+Hott+Love+Extreme"
    },
    "carouselData": [
      {
        "name": "Purple Wiggle Wand 8-Function Double-Ended Rechargeable Waterproof Mas",
        "price": "$59.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04102299-a?wid=240&hei=240&fmt=webp",
          "alt": "04102299 - Purple Wiggle Wand 8-Function Double-Ended Rechargeable Waterproof Mas"
        },
        "url": "https://www.spencersonline.com/product/purple-wiggle-wand-8-function-double-ended-rechargeable-waterproof-massager-9-inch-hott-love-extreme/240918.uts"
      },
      {
        "name": "Full Bloom Rechargeable Tongue Vibrator 3 Inch - Hott Love Extreme",
        "price": "$44.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03886942-a?wid=240&hei=240&fmt=webp",
          "alt": "03886942 - Full Bloom Rechargeable Tongue Vibrator 3 Inch - Hott Love Extreme"
        },
        "url": "https://www.spencersonline.com/product/rose-rechargeable-tongue-vibrator-3-inch/233929.uts"
      },
      {
        "name": "Midnight Magic 20-Function Vibrating Rechargeable Wand Massager - Hott",
        "price": "$44.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04215398-a?wid=240&hei=240&fmt=webp",
          "alt": "04215398 - Midnight Magic 20-Function Vibrating Rechargeable Wand Massager - Hott"
        },
        "url": "https://www.spencersonline.com/product/midnight-magic-20-function-vibrating-rechargeable-wand-massager-hott-love-extreme/248009.uts"
      },
      {
        "name": "Purple Velvet Lust Waterproof 20-Function Multi-Speed Rechargeable Wan",
        "price": "$49.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04248860-a?wid=240&hei=240&fmt=webp",
          "alt": "04248860 - Purple Velvet Lust Waterproof 20-Function Multi-Speed Rechargeable Wan"
        },
        "url": "https://www.spencersonline.com/product/purple-velvet-lust-waterproof-20-function-multi-speed-rechargeable-wand-massager-7-inch-hott-love-extreme/250177.uts"
      },
      {
        "name": "Secret Love Panty Vibrator 2.0 - Hott Love Extreme",
        "price": "$54.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04169447-a?wid=240&hei=240&fmt=webp",
          "alt": "04169447 - Secret Love Panty Vibrator 2.0 - Hott Love Extreme"
        },
        "url": "https://www.spencersonline.com/product/secret-love-panty-vibrator-2-0-hott-love-extreme/245070.uts"
      }
    ]
  }, {
    "maximumquantity": 99,
    "name": "Nirvana Neon In Utero T Shirt",
    "pid": "263234",
    "sku": "04360368",
    "breadcrumb": [
      {
        "text": "Home",
        "current": false,
        "href": "/"
      },
      {
        "text": "Graphic Tees",
        "current": false,
        "href": "#"
      },
      {
        "text": "Nirvana Neon In Utero T Shirt",
        "current": true,
        "href": null
      }
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/04360368-a"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 19.99,
      "msrpPrice": 24.99
    },
    "badges": [],
    "promos": [],
    "description": "Celebrate the one and only Nirvana with this bold and colorful neon In Utero t shirt! This stylish graphic tee is the perfect way to show off your musical taste! Officially licensed Exclusively at Spencer's Crewneck Short sleeves Material: Cotton Care: Machine wash; tumble dry low Imported This shirt is Unisex Sizing only For a fitted look, order one size smaller than your normal size",
    "restrictions": [],
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        },
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "04360368-a",
      "productId": 263234,
      "lowPrice": 19.99,
      "highPrice": 21.59,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 26.99,
          "VARIANT_ID": 621112,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$21.59",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "0",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 21.59,
            "amountInCents": 2159,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": false,
          "stock": false,
          "storePickupMessage": "",
          "SIZE_NAME": "2X"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 596079,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "1",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT MEDIUM"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 596081,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "1",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT LARGE"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 596080,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "11",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT SMALL"
        },
        {
          "cost": 24.99,
          "VARIANT_ID": 596082,
          "swatchColorName": "CHARCOAL",
          "swatchColorCode": "C6",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "CHARCOAL",
          "invLevel": "3",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "ADULT EX LARGE"
        }
      ],
      "priceVariance": true,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "Nirvana+Neon+In+Utero+T+Shirt"
    },
    "carouselData": [
      {
        "name": "Forest In Utero Nirvana T Shirt",
        "price": "$24.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03123486-a?wid=240&hei=240&fmt=webp",
          "alt": "03448164 - Forest In Utero Nirvana T Shirt"
        },
        "url": "https://www.spencersonline.com/product/forest-in-utero-nirvana-t-shirt/140538.uts"
      },
      {
        "name": "In Utero Album T Shirt - Nirvana",
        "price": "$24.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03942521-a?wid=240&hei=240&fmt=webp",
          "alt": "04363982 - In Utero Album T Shirt - Nirvana"
        },
        "url": "https://www.spencersonline.com/product/in-utero-album-t-shirt-nirvana/237819.uts"
      },
      {
        "name": "Floral Heart Nirvana T Shirt",
        "price": "$24.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03455649-a?wid=240&hei=240&fmt=webp",
          "alt": "03455664 - Floral Heart Nirvana T Shirt"
        },
        "url": "https://www.spencersonline.com/product/floral-heart-nirvana-t-shirt/173370.uts"
      },
      {
        "name": "Come As You Are Nirvana T Shirt",
        "price": "$24.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03841541-a?wid=240&hei=240&fmt=webp",
          "alt": "03841566 - Come As You Are Nirvana T Shirt"
        },
        "url": "https://www.spencersonline.com/product/come-as-you-are-nirvana-t-shirt/231299.uts"
      },
      {
        "name": "Nirvana Smiley Face T Shirt",
        "price": "$24.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04206371-a?wid=240&hei=240&fmt=webp",
          "alt": "04206397 - Nirvana Smiley Face T Shirt"
        },
        "url": "https://www.spencersonline.com/product/nirvana-smiley-face-t-shirt/247368.uts"
      }
    ]
  }, {
    "maximumquantity": 99,
    "name": "Multi-Pack CZ Heart L-Bend Nose Rings 6 Pack - 20 Gauge",
    "pid": "224372",
    "sku": "03753480",
    "breadcrumb": [
      {
        "text": "Home",
        "current": false,
        "href": "/"
      },
      {
        "text": "Body Jewelry",
        "current": false,
        "href": "#"
      },
      {
        "text": "Nose Rings & Nose Studs",
        "current": false,
        "href": "#"
      },
      {
        "text": "Nose L Bends",
        "current": false,
        "href": "#"
      },
      {
        "text": "Multi-pack Cz Heart L-bend Nose Rings 6 Pack - 20 Gauge",
        "current": true,
        "href": null
      }
    ],
    "images": [
      "https://spencers.scene7.com/is/image/Spencers/03753480-a",
      "https://spencers.scene7.com/is/image/Spencers/03753480-b",
      "https://spencers.scene7.com/is/image/Spencers/03948247-a",
      "https://spencers.scene7.com/is/image/Spencers/03948247-b"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 19.99,
      "msrpPrice": 19.99
    },
    "badges": [],
    "promos": [
      "BOGO 40% OFF"
    ],
    "description": "Includes: 6 Nose L-Bends Piercing Type: Nostril Barbell Material: 316L surgical steel Accent Material: Metal alloy Gauge: 20 gauge/0.8mm Length: 8mm Stone Type: Cubic zirconia Jewelry Care: Clean with antibacterial soap and warm water Piercing Care: Clean with H2Ocean Aftercare Spray (sold separately) or saline solution Imported Note: Do not use any harsh, alcohol-based chemicals as this may cause tarnishing Wear in healed piercings only. If irritation occurs, remove immediately. Surgical steel may contain trace amounts of nickel This is a decorative item and should not be worn to sleep",
    "restrictions": [],
    "valProps": [],
    "variantInfo": {
      "colorSingleValueLabel": "Color",
      "display_attributes": [
        {
          "name": "COLOR_NAME"
        },
        {
          "name": "SIZE_NAME"
        }
      ],
      "productImageFile": "03753480-a",
      "productId": 224372,
      "lowPrice": 19.99,
      "highPrice": 19.99,
      "messages": {
        "notAvailableAt": "Out of stock at",
        "backorderToMessageSingleVariant": "This item is backordered and is expected by {0}.",
        "backorderMessageSingleVariant": "This item is backordered.",
        "changeStore": "change",
        "selectStore": "Select a store",
        "preorderMessageSingleVariant": "This item is on pre-order.",
        "notAvailable": "Not Available",
        "outOfStockAt": "Out of stock at",
        "preOrderTo": "Pre-order; expected {0}",
        "preorderToMessageSingleVariant": "This item is on pre-order. The expected ship date is {0}.",
        "backOrder": "Backordered",
        "availableAt": "Available at",
        "backOrderTo": "Backordered; expected {0}",
        "defaultMessage": "Select options to see availability",
        "preOrder": "Pre-order",
        "inStock": "In stock"
      },
      "variants": [
        {
          "cost": 19.99,
          "VARIANT_ID": 509538,
          "swatchColorName": "BLACK AND SILVER",
          "swatchColorCode": "BI",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "BLACK AND SILVER",
          "invLevel": "87",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "22G"
        },
        {
          "cost": 19.99,
          "VARIANT_ID": 504929,
          "swatchColorName": "SILVER",
          "swatchColorCode": "SL",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "SILVER",
          "invLevel": "111",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "18 G"
        },
        {
          "cost": 19.99,
          "VARIANT_ID": 484288,
          "swatchColorName": "BLACK AND SILVER",
          "swatchColorCode": "BI",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "BLACK AND SILVER",
          "invLevel": "34",
          "orderOnlineMessage": "Order Now! Expected to ship on or before ",
          "price": {
            "amountInDollars": 19.99,
            "amountInCents": 1999,
            "currencySymbol": "$",
            "currency": "$"
          },
          "orderOnlineEnabled": true,
          "stock": true,
          "storePickupMessage": "",
          "SIZE_NAME": "20 G"
        }
      ],
      "priceVariance": false,
      "showSwatches": "N",
      "sizeSingleValueLabel": "Size",
      "productName": "Multi-Pack+CZ+Heart+L-Bend+Nose+Rings+6+Pack+-+20+Gauge"
    },
    "carouselData": [
      {
        "name": "Multi-Pack Goldtone CZ L-Bend Stud Nose Rings 6 Pack - 20 Gauge",
        "price": "$19.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03830668-b?wid=240&hei=240&fmt=webp",
          "alt": "03989597 - Multi-Pack Goldtone CZ L-Bend Stud Nose Rings 6 Pack - 20 Gauge"
        },
        "url": "https://www.spencersonline.com/product/multi-pack-goldtone-cz-l-bend-stud-nose-rings-6-pack-20-gauge/230716.uts"
      },
      {
        "name": "Multi-Pack Goldtone and Black Heart L-Bend Nose Rings 6 Pack 2- Gauge",
        "price": "$19.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/04145777-a?wid=240&hei=240&fmt=webp",
          "alt": "04145777 - Multi-Pack Goldtone and Black Heart L-Bend Nose Rings 6 Pack 2- Gauge"
        },
        "url": "https://www.spencersonline.com/product/multi-pack-goldtone-and-black-heart-l-bend-nose-rings-6-pack-2-gauge/243577.uts"
      },
      {
        "name": "Multi-Pack CZ L-Bend Nose Rings 6 Pack - 20 Gauge",
        "price": "$19.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03548732-a?wid=240&hei=240&fmt=webp",
          "alt": "03985991 - Multi-Pack CZ L-Bend Nose Rings 6 Pack - 20 Gauge"
        },
        "url": "https://www.spencersonline.com/product/multi-pack-cz-l-bend-nose-rings-6-pack-20-gauge/180175.uts"
      },
      {
        "name": "Multi-Pack Prong CZ L-Bend Nose Rings 6 Pack – 20 Gauge",
        "price": "$19.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03734134-a?wid=240&hei=240&fmt=webp",
          "alt": "03877107 - Multi-Pack Prong CZ L-Bend Nose Rings 6 Pack – 20 Gauge"
        },
        "url": "https://www.spencersonline.com/product/multi-pack-prong-cz-l-bend-nose-rings-6-pack-20-gauge/222904.uts"
      },
      {
        "name": "Multi-Pack Shape CZ L-Bend Nose Rings 6 Pack - 20 Gauge",
        "price": "$16.99",
        "image": {
          "src": "https://spencers.scene7.com/is/image/Spencers/03474525-a?wid=240&hei=240&fmt=webp",
          "alt": "03876976 - Multi-Pack Shape CZ L-Bend Nose Rings 6 Pack - 20 Gauge"
        },
        "url": "https://www.spencersonline.com/product/multi-pack-shape-cz-l-bend-nose-rings-6-pack-20-gauge/174818.uts"
      }
    ]
  }
];

function findColorByName(name: string): ColorData | undefined {
  return colorMapping.find(color => color.name.toLowerCase() === name.toLowerCase());
}

function isObject(value: unknown) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

async function seedProductData() {
  try {
    for (const product of data) {
      const {
        maximumquantity,
        name,
        pid,
        sku,
        description,
      } = product;
      
      await db.insert(productsTable).values({
        max_quantity: maximumquantity,
        id: pid,
        name,
        description,
        sku,
      });
    }
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedBadgesData() {
  try {
    for (const product of data) {
      const { badges } = product;
      for(const badge of badges) {
        await db.insert(badgesTable).values({
          name: badge
        });
      }
    }
  } catch(error) {
    console.error("Error inserting products:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedProductBadgeData() {
  try {
    for (const product of data) {
      const { badges, pid } = product;
      for(const [index, badge] of badges.entries()) {
        await db.insert(product_badgesTable).values({
          product_id: `${pid}`,
          badge_id: index + 1
        });
      }
    }
  } catch(error) {
    console.error("Error inserting products:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedStoreData() {
  try {
    await db.insert(storesTable).values({
      id: "00538",
      name: "Hamilton",
      street_address: "239 HAMILTON MALL, 4403 BLACK HORSE PIKE STE 2144",
      city: "MAYS LANDING",
      state: "NJ",
      zip: "08330",
      opening_hours: "Open today till 09:00 PM"
    });
  } catch(error) {
    console.error("Error inserting products:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedSizeData() {
  try {
    for (const product of data) {
      const { variantInfo: { variants } } = product;
      for (const variant of variants) {
        const { SIZE_NAME } = variant;
        
        if (!SIZE_NAME.trim()) {
          console.warn("Skipping empty size name.");
          continue;
        }

        try {
          await db.insert(sizesTable).values({
            size: SIZE_NAME
          })
          .onConflictDoNothing();
        } catch (error) {
            // Check if the error is due to a duplicate key violation
            if (error.code === "23505") { // 23505 is the PostgreSQL error code for unique_violation
              console.warn(`Size '${SIZE_NAME}' already exists, skipping insertion.`);
            } else {
              console.error("Error inserting size:", error);
            }
          
        }
      }
    }
  } catch (error) {
    console.error("Error seeding size data:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedColorData() {
  try {
    for (const product of data) {
      const { variantInfo: { variants } } = product;
      for (const variant of variants) {
        const COLOR_NAME = variant?.COLOR_NAME || "";
        
        if (!COLOR_NAME.trim()) {
          console.warn("Skipping empty size name.");
          continue;
        }

        if (findColorByName(COLOR_NAME)) {
          try {
            await db.insert(colorsTable).values({
              name: COLOR_NAME,
              value: ""
            })
            .onConflictDoNothing();
          } catch (error) {
            // Check if the error is due to a duplicate key violation
            if (error.code === "23505") { // 23505 is the PostgreSQL error code for unique_violation
              console.warn(`Size '${COLOR_NAME}' already exists, skipping insertion.`);
            } else {
              console.error("Error inserting size:", error);
            }
          }
        }

      }
    }
  } catch (error) {
    console.error("Error seeding color data:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedImageData() {
  try {
    for (const product of data) {
      const { images } = product;
      for (const [index, image] of images.entries()) {
        await db.insert(product_imagesTable).values({
          product_id: product.pid,
          url: image,
          order: index + 1
        });
      }
    }
  } catch (error) {
    console.error("Error seeding images data:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedRestrictionsData() {
  try {
    for (const product of data) {
      const { restrictions, pid } = product;
      if (isObject(restrictions)) {
        for (const [key, value] of Object.entries(restrictions)) {
          const match = key.match(/\d+/);
          const level = match ? parseInt(match[0], 10) : NaN;
          for (const { message, type } of value) {
            await db.insert(product_restrictionsTable).values({
              product_id: pid,
              level,
              type,
              message
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error seeding restrictions data:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedVariantsData() {
  try {
    for (const product of data) {
      const { variantInfo: { variants } , pid } = product;
      for (const { VARIANT_ID, COLOR_NAME, SIZE_NAME, cost, price: { amountInDollars }, invLevel } of variants) {
        const colorMap: { [key: string]: number } = {
          "MULTI-COLOR": 1,
          "PINK": 2,
          "BLACK": 7,
          "CHARCOAL": 8,
          "WHITE": 13,
          "BLACK AND SILVER": 20,
          "SILVER": 21,
        }

        const sizeMap: { [key: string]: number } = {
          "ADULT SMALL": 1,
          "ADULT LARGE": 2,
          "ADULT EX LARGE": 3,
          "2X": 4,
          "ADULT MEDIUM": 5,
          "14G 5/8 INCH": 6,
          "16 G": 12,
          "18 G": 13,
          "7 INCHES": 14,
          "22G": 20,
          "20 G": 22,
        }

        const colorId = COLOR_NAME ? colorMap[COLOR_NAME] : null;
        const sizeId = SIZE_NAME ? sizeMap[SIZE_NAME] : null;

        await db.insert(product_variantsTable).values({
          id: `${VARIANT_ID}`,
          product_id: pid,
          size_id: sizeId,
          color_id: colorId,
          price: cost,
          sale_price: amountInDollars,
          stock: invLevel
        })
      }
    }
  } catch (error) {
    console.error("Error seeding variants data:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

async function seedStoreInventoryData() {
  try {
    await db.insert(store_inventoryTable).values({
      store_id: "00538",
      product_id: "166117",
      stock: 12
    });
  } catch (error) {
    console.error("Error seeding store inventory data:", error);
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

// seedProductData();
// seedBadgesData();
// seedProductBadgeData();
// seedStoreData();
// seedSizeData();
// seedColorData();
// seedImageData();
// seedRestrictionsData();
// seedVariantsData();
// seedStoreInventoryData();

async function queryProduct(pid: string) {
  try {
    const product = await db
      .select()
      .from(productsTable)
      .leftJoin(product_variantsTable, eq(productsTable.id, product_variantsTable.product_id))
      .leftJoin(product_imagesTable, eq(productsTable.id, product_imagesTable.product_id))
      .where(eq(productsTable.id, pid));
    
    console.log(product);
  } catch (error) {
    console.error(`Error querying product: ${pid}`)
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

queryProduct("253020")
