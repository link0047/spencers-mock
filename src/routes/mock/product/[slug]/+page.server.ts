import type { PageServerLoad } from "./$types";
import type { Product } from "$lib/types/product";
import { error } from "@sveltejs/kit";
import parser from "ua-parser-js";

const dataStore: Product[] = [
  {
    "maximumquantity": 2,
    "name": "Talking Tiffany Doll - 20 Inch",
    "pid": "166117",
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
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
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
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
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
    "sku": "03516903",
    "breadcrumb": [
      { text: "HOME", current: false, href: "/" },
      { text: "Body Jewelry", current: false, href: "#" },
      { text: "Tongue Rings", current: false, href: "#" },
      { text: "Black Vibrating Barbell - 14 Gauge", current: true, href: null },
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
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
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
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
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
    "valueprops": {
      "power": 3,
      "sound": 4,
      "waterproof": true,
      "rechargeable": true,
      "bluetooth": false
    },
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
      "https://spencers.scene7.com/is/image/Spencers/04112496-b",
      "https://spencers.scene7.com/is/image/Spencers/03445640-c",
      "https://spencers.scene7.com/is/image/Spencers/04112496-d",
      "https://spencers.scene7.com/is/image/Spencers/03445640-e",
      "https://spencers.scene7.com/is/image/Spencers/03445640-f"
    ],
    "isSoldOut": false,
    "price": {
      "displayedPrice": 49.99,
      "msrpPrice": 49.99
    },
    "badges": ["Best Seller"],
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
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
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
    "valueprops": {
      "power": 0,
      "sound": 0,
      "waterproof": false,
      "rechargeable": false,
      "bluetooth": false
    },
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
          "swatchColorName": "BLACK",
          "swatchColorCode": "BI",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "BLACK",
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
          "swatchColorName": "PLUM",
          "swatchColorCode": "BI",
          "priceFormatted": "$19.99",
          "neverOutOfStock": false,
          "COLOR_NAME": "PLUM",
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

export function load({ params, locals }: Parameters<PageServerLoad>[0]) {
  let isMobile = false;

  try {
    const ua = parser(locals.ua as string | undefined);
    isMobile = ua.device.type === "mobile" || ua.device.type === "tablet" || false;
  } catch (e) {
    console.error("Error parsing user agent:", e);
    // Default to non-mobile if parsing fails
  }
  
  const product = dataStore.find((data) => data.sku === params.slug);

  if (product) {
    return {
      product,
      isMobile
    };
  }

  throw error(404, 'Not found');
}