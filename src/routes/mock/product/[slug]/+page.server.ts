import { error } from '@sveltejs/kit';
import parser from "ua-parser-js";

const dataStore = [{
  "name": "Talking Tiffany Doll - 20 Inch - Spencer's",
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
    "msrpPrice": "89.99"
  },
  "badges": [
    "Exclusive"
  ],
  "promos": [],
  "description": "<p>A true classic never goes out of style! This talking Tiffany doll is the perfect addition to every horror buff's collection. With her signature white dress, black jacket and authentic chest tattoo, this Tiffany doll looks just like the real deal.</p><ul><li>Officially licensed</li><li>Exclusively at Spencer's</li><li>Spoken Phrases:<ul><li>Take it from me honey, plastic is no substitute for a nice hunk of wood!</li><li>Oh, Chucky look at us. We belong dead. Goodbye darling. I'll see you in hell.</li><li>We could do this the easy way or the hard way. It's really up to you.</li><li>I believe we already met, haven't we, sweet-face? I hope you left room for dessert!</li></ul></li><li>Head turns and mouth moves</li><li>Battery Type: 3AAA (included)</li><li>Dimensions: 20\" H x 8\" W x 11\" D (13.5\" sitting)</li><li>Material: Polyester, faux leather, synthetic fibers</li><li>Care: Wipe clean</li><li>Imported</li></ul>",
  "restrictions": [
    "Maximum Quantity"
  ],
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
  recommendationData: [{"name":"Talking Chucky Doll - 24 inch","price":"$89.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/02842623-a?wid=400&qlt=85,1&resMode=bicub&fmt=jpeg&op_sharpen=1&hei=400","alt":"02842623 - Talking Chucky Doll - 24 inch"},"url":"http://www.spencersonline.com/product/talking-chucky-doll-24-inch/21683.uts"},{"name":"Glen Doll - Chucky","price":"$69.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/04208567-a?wid=400&qlt=85,1&resMode=bicub&fmt=jpeg&op_sharpen=1&hei=400","alt":"04208567 - Glen Doll - Chucky"},"url":"http://www.spencersonline.com/product/glen-doll-chucky/250687.uts"},{"name":"Bride of Chucky Tiffany Doll","price":"$69.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/02402865-a?wid=400&qlt=85,1&resMode=bicub&fmt=jpeg&op_sharpen=1&hei=400","alt":"02402865 - Bride of Chucky Tiffany Doll"},"url":"http://www.spencersonline.com/product/bride-of-chucky-tiffany-doll/25401.uts"},{"name":"Good Guys Chucky Doll - 24 Inch","price":"$89.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/04132239-a?wid=400&qlt=85,1&resMode=bicub&fmt=jpeg&op_sharpen=1&hei=400","alt":"04132239 - Good Guys Chucky Doll - 24 Inch"},"url":"http://www.spencersonline.com/product/good-guys-chucky-doll-24-inch/242620.uts"},{"name":"Chucky Doll","price":"$69.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/02402873-a?wid=400&qlt=85,1&resMode=bicub&fmt=jpeg&op_sharpen=1&hei=400","alt":"02402873 - Chucky Doll"},"url":"http://www.spencersonline.com/product/chucky-doll/743.uts"}]
}, {
  "name": "Pink Gloomy Bear Hoodie - Spencer's",
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
    "msrpPrice": "54.99"
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
  recommendationData: [{"name":"Towelie Hoodie - South Park","price":"44.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/04346060-a?wid=220&hei=220&fmt=webp","alt":"04346086 - Towelie Hoodie - South Park"},"url":"http://www.spencersonline.com/product/towelie-hoodie-south-park/262420.uts"},{"name":"Eating Gloomy Bear Sweatshirt","price":"44.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/03941192-a?wid=220&hei=220&fmt=webp","alt":"03941234 - Eating Gloomy Bear Sweatshirt"},"url":"http://www.spencersonline.com/product/eating-gloomy-bear-sweatshirt/237779.uts"},{"name":"Stitch 3D Hoodie - Lilo & Stitch","price":"54.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/04281796-a?wid=220&hei=220&fmt=webp","alt":"04281838 - Stitch 3D Hoodie - Lilo & Stitch"},"url":"http://www.spencersonline.com/product/stitch-3d-hoodie-lilo-stitch/253059.uts"},{"name":"Have a Creamy Day Zip Hoodie - South Park","price":"49.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/04343489-a?wid=220&hei=220&fmt=webp","alt":"04343505 - Have a Creamy Day Zip Hoodie - South Park"},"url":"http://www.spencersonline.com/product/have-a-creamy-day-zip-hoodie-south-park/262214.uts"},{"name":"Jack and Sally Together Forever Tie Dye Hoodie - The Nightmare Before","price":"49.99","image":{"src":"https://spencers.scene7.com/is/image/Spencers/04312112-a?wid=220&hei=220&fmt=webp","alt":"04312146 - Jack and Sally Together Forever Tie Dye Hoodie - The Nightmare Before"},"url":"http://www.spencersonline.com/product/jack-and-sally-together-forever-tie-dye-hoodie-the-nightmare-before-christmas/259261.uts"}]
}
];


/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  const ua = parser(locals.ua);
  const isMobile: boolean = ua.device.type === "mobile" || ua.device.type === "tablet";
  const isProduct = dataStore.find((data) => data.sku === params.slug);

  if (isProduct) {
    return {
      product: isProduct,
      isMobile
    }
  }

  error(404, 'Not found');
}