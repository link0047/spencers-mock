<script lang="ts">
  import type { Writable } from "svelte/store";
  import { onMount, tick } from "svelte";
  import Page from "$lib/components/page/Page.svelte";
  import { ProductGallery } from "$lib/components/productGallery";
  import StarRating from "$lib/components/starrating";
  import VariantSelector from "$lib/components/variantselector";
  import { Radio } from "$lib/components/radio";
  import Swatch from "$lib/components/swatch";
  import { FulfillmentRadioGroup, FulfillmentOption } from "$lib/components/fulfillmentRadioGroup";
  import Button from "$lib/components/button";
  import Accordion from "$lib/components/accordion";
  import InputStepper from "$lib/components/inputstepper";
  import { Breadcrumb, Crumb } from "$lib/components/breadcrumbs";
  import Icon from "$lib/components/icon";
  import Table from "$lib/components/table";
  import Link from "$lib/components/link";
  import { RatingsAndReviewsCard } from "$lib/components/ratingsandreviewscard";
  import { fetchData } from "$lib/client/util/utilities";
  import { browser } from "$app/environment";
  import IconSet from "$lib/components/iconset";
  import { Collapsible } from "$lib/components/collapsible";
  import WarningCard from "$lib/components/warningcard";
  import ButtonNew from "$lib/components/button/Button-new.svelte";
  import { Drawer, DrawerDismiss, DrawerPanel, useDrawerState } from "$lib/components/drawer";
  import { PowerAndSound } from "$lib/components/powerAndSound";
  import { Tooltip, useTooltipState } from "$lib/components/tooltip";
  import { AOVBooster } from "$lib/components/aovBooster";
  import { Image } from "$lib/components/image";
  
  export let data;

  let { isMobile, product } = data;
  const merchantId = "7874";
	const locale = "en_US";
	const pageId = product?.sku;
	const pagingSize = 10;
	const apiKey = "4299eaeb-b748-43e4-adba-e46a09962a74";
	const noconfig = true;
	const timeout = 5000;
  const review_endpoint = `https://readservices-b2c.powerreviews.com/m/${merchantId}/l/${locale}/product/${pageId}/reviews?paging.size=${pagingSize}&apikey=${apiKey}&_noconfig=${noconfig}`;
  
  interface ColorData {
    name: string;
    displayName: string;
    colorCode: string;
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

  /**
	 * Extracts the first sequence of digits from a string and returns it as a number.
	 * @param {string} input - The string from which to extract the number.
	 * @returns {number} - The first number found in the string, or NaN if no number is found or if the input is not a string.
	 */
	function getNumberFromString(input: string) {
	  // Check if the input is a valid string and trim any surrounding whitespace
	  if (typeof input !== 'string' || input.trim() === '') {
	    return NaN;
	  }
	
	  // Match any sequence of digits (\d+)
	  const digitMatch = input.match(/\d+/);
	
	  // Return the matched number or NaN if no match is found
	  return digitMatch?.[0] ? parseInt(digitMatch[0], 10) : NaN;
	}

  /**
   * Calculates the estimated delivery date, which is 7 days from the current date.
   * @returns {string} A string indicating the estimated delivery date.
   */
  function getDeliveryDate(): string {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = dayNames[deliveryDate.getDay()];
    const monthAbbrev = monthNames[deliveryDate.getMonth()];
    const dayOfMonth = deliveryDate.getDate();
  
    return `Get it by <strong class="bold">${dayName}, ${monthAbbrev} ${dayOfMonth}</strong>`;
  }

  /**
   * Divides a price by four and rounds the result to two decimal places.
   * @param {number} price - The price to be divided.
   * @returns {number} The result of dividing the price by four and rounding it to two decimal places.
   */
  function divideByFourAndRound(price: number): number {
    // Convert price to a whole number by multiplying by 100
    const wholeNumber = Math.round(price * 100);
    
    // Divide the whole number by 4
    const result = Math.floor(wholeNumber / 4);
    const decimal = result / 100;
    // Return the result
    return decimal;
  }

  /**
   * Calculates the percentage difference between two numbers.
   *
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The percentage difference between the two numbers.
   *                   Returns 0 if both numbers are zero.
   */
  function percentageDifference(a: number, b: number): number {
    if (a === 0 && b === 0) {
      return 0; // Handle case where both numbers are zero
    }

    const difference: number = Math.abs(a - b);
    const average: number = (a + b) / 2;
    const percentageDiff: number = (difference / average) * 100;

    return Math.round(percentageDiff);
  }

  /**
   * Handles intersection observer entries.
   * @param {IntersectionObserverEntry[]} entries - The array of intersection observer entries.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */
  function handleObserver(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // console.log(`${entry.target.textContent} is visible`);
        showControls = false;
      } else {
        // console.log(`${entry.target.textContent} is not visible`);
        if (window.scrollY > 100) {
          showControls = true;
        }
      }
    });
  }

  /**
   * Compares two sizes and returns a value indicating their relative order.
   * @param {string} a - The first size to compare.
   * @param {string} b - The second size to compare.
   * @returns {number} A negative value if a is smaller than b, 0 if they are equal, or a positive value if a is larger than b.
   */
   function sortSize(a: string, b: string): number {
    /**
     * A scoring system for different size labels.
     * @type {{ [key: string]: number }}
     */
    const sizeScorer: { [key: string]: number } = {
      xs: 0,
      small: 1,
      s: 1,
      medium: 2,
      m: 2,
      large: 3,
      l: 3,
      xl: 4,
      xxl: 5,
      "1x": 6,
      "2x": 7,
      "3x": 8,
      "4x": 9
    };

    return sizeScorer[a.toLowerCase()] - sizeScorer[b.toLowerCase()];
  }

  /**
   * Extracts color names, size names, and out of stock status from an array of variant objects,
   * avoiding duplicates and empty strings.
   * @param {Array<{
   *   COLOR_NAME: string;
   *   SIZE_NAME: string;
   *   stock: boolean;
   * }>} variantsArray - The array of variant objects.
   * @returns {[string[], { name: string, outOfStock: boolean }[]]} An array containing two arrays: color names and an array of size objects with their out of stock status.
   */
  function extractColorAndSizeNames(variantsArray: Array<{ COLOR_NAME: string; SIZE_NAME: string; stock: boolean; }>): [string[], { name: string, outOfStock: boolean }[]] {
    if (!variantsArray || variantsArray.length === 0) {
      return [[], []]; // Return empty arrays if variantsArray is empty or undefined
    }
    const colorNames: string[] = [];
    const sizes: { name: string, outOfStock: boolean }[] = [];

    // Object to keep track of unique color names
    const colorNameSet: { [key: string]: boolean } = {};

    /**
     * A mapping of full size names to their abbreviated forms.
     * @type {{ [key: string]: string }}
     */
    const sizeMapping: { [key: string]: string } = {
      "small": "S",
      "medium": "M",
      "large": "L",
      "ex large": "XL"
    };

    // Loop over each variant object
    variantsArray.forEach(variant => {
      // Extract COLOR_NAME, SIZE_NAME, and stock status
      const { COLOR_NAME, SIZE_NAME, stock } = variant;

      // Add non-empty color names to the array
      if (COLOR_NAME && COLOR_NAME?.trim() !== "" && !colorNameSet[COLOR_NAME]) {
        colorNames.push(COLOR_NAME);
        colorNameSet[COLOR_NAME] = true; // Mark color name as encountered
      }

      // Add non-empty size names to the array
      if (SIZE_NAME?.trim() !== "") {
        let sizeDisplayName: string;

        const lowercaseSize: string = SIZE_NAME.toLowerCase();
        // Check if the size contains any of the words and map accordingly
        if (lowercaseSize.includes("small")) {
          sizeDisplayName = sizeMapping["small"];
        } else if (lowercaseSize.includes("medium")) {
          sizeDisplayName = sizeMapping["medium"];
        } else if (lowercaseSize.includes("ex large")) {
          sizeDisplayName = sizeMapping["ex large"];
        } else if (lowercaseSize.includes("large")) {
          sizeDisplayName = sizeMapping["large"];
        } else {
          // If the size doesn't contain any of the words, return the original size
          sizeDisplayName = SIZE_NAME;
        }

        // Check if the size name already exists
        const existingSize = sizes.find(size => size.name === sizeDisplayName);
        if (!existingSize) {
          // Add the size with its stock status
          sizes.push({
            name: sizeDisplayName,
            outOfStock: !stock
          });
        }
      }
    });

    // Sort sizes by using sortSize function
    sizes.sort((a, b) => sortSize(a.name, b.name));

    return [colorNames, sizes];
  }

  /**
   * Get the default size from an array of size objects.
   * @param {{ name: string, outOfStock: boolean }[]} sizes - An array of size objects.
   * @returns {string | null} - The default size ("M" if it exists and is in stock, else the first size in the array that is in stock), or null if the array is empty or all sizes are out of stock.
   */
  function getDefaultSize(sizes: { name: string, outOfStock: boolean }[]): string | null {
    // Check if "M" size exists and is in stock
    const mediumSize = sizes.find(size => size.name.toLowerCase() === "m" && !size.outOfStock);
    if (mediumSize) {
      return "M";
    }

    // Find the first size that is in stock
    const firstInStockSize = sizes.find(size => !size.outOfStock);
    if (firstInStockSize) {
      return firstInStockSize.name;
    }

    return null; // Return null if no sizes are in stock
  }

  /**
   * Scrolls to the size chart container and opens the accordion.
   */
  async function scrollToAndOpenAccordion() {
    sizeChartOpenState = true;
    await tick();
    sizeChartContainerRef.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /**
   * Gets the mapped color data for a given color name.
   *
   * @param {string} color - The color name to search for.
   * @returns {ColorData | undefined} The color data if found, otherwise undefined.
   */
  function getMappedColorData(color: string): ColorData | undefined {
    return colorMapping.find(item => item.name === color);
  }

  function toggleProductNameClamp(event: Event) {
    console.log(event.target.classList)
  }

  const drawerState = useDrawerState();
	const tooltipState = useTooltipState();
	let isPanelOpen = false;

	function addToCart() {
		drawerState.open.set(true);
	}

	function close() {
		isPanelOpen = false;
		drawerState.open.set(false);
	}

	function openUpSellPanel({ currentTarget: { dataset: { index }}}) {
    const selected = upsells[parseInt(index)];

		upsell = upsells[parseInt(index)];
		isPanelOpen = true;
	}

	function closeUpSellPanel() {
		isPanelOpen = false;
    upsell = null;
	}

	const upsells = [
		{
      "image": "https://spencers.scene7.com/is/image/Spencers/04343133-a",
			"name": "Springtrap T Shirt - Five Nights at Freddy's",
			"price": "24.99",
			"variants": [{
				"cost": 24.99,
				"VARIANT_ID": 592811,
				"swatchColorName": "BLACK",
				"swatchColorCode": "BK",
				"priceFormatted": "$19.99",
				"neverOutOfStock": false,
				"COLOR_NAME": "BLACK",
				"invLevel": "97",
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
				"VARIANT_ID": 592810,
				"swatchColorName": "BLACK",
				"swatchColorCode": "BK",
				"priceFormatted": "$19.99",
				"neverOutOfStock": false,
				"COLOR_NAME": "BLACK",
				"invLevel": "125",
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
				"VARIANT_ID": 592813,
				"swatchColorName": "BLACK",
				"swatchColorCode": "BK",
				"priceFormatted": "$19.99",
				"neverOutOfStock": false,
				"COLOR_NAME": "BLACK",
				"invLevel": "159",
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
				"VARIANT_ID": 592812,
				"swatchColorName": "BLACK",
				"swatchColorCode": "BK",
				"priceFormatted": "$19.99",
				"neverOutOfStock": false,
				"COLOR_NAME": "BLACK",
				"invLevel": "101",
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
			}]
    },
    {
			"image": "https://spencers.scene7.com/is/image/Spencers/04132817-a",
			"name": "Sunnydrop T Shirt - Five Nights at Freddy's",
			"price": "24.99",
      "variants": [{
        "cost": 24.99,
        "VARIANT_ID": 557960,
        "swatchColorName": "BLACK",
        "swatchColorCode": "BK",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLACK",
        "invLevel": "322",
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
        "VARIANT_ID": 557957,
        "swatchColorName": "BLACK",
        "swatchColorCode": "BK",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLACK",
        "invLevel": "157",
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
        "VARIANT_ID": 557958,
        "swatchColorName": "BLACK",
        "swatchColorCode": "BK",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLACK",
        "invLevel": "129",
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
        "VARIANT_ID": 557959,
        "swatchColorName": "BLACK",
        "swatchColorCode": "BK",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLACK",
        "invLevel": "206",
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
      }]
    },
    {
			"image": "https://spencers.scene7.com/is/image/Spencers/03998515-a",
			"name": "Kick Retro Sonic the Hedgehog T Shirt",
			"price": "24.99",
      "variants":[{
        "cost": 24.99,
        "VARIANT_ID": 553694,
        "swatchColorName": "BLUE",
        "swatchColorCode": "BL",
        "priceFormatted": "$16.08",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLUE",
        "invLevel": "18",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 16.08,
          "amountInCents": 1608,
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
        "VARIANT_ID": 553695,
        "swatchColorName": "BLUE",
        "swatchColorCode": "BL",
        "priceFormatted": "$16.08",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLUE",
        "invLevel": "21",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 16.08,
          "amountInCents": 1608,
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
        "VARIANT_ID": 553696,
        "swatchColorName": "BLUE",
        "swatchColorCode": "BL",
        "priceFormatted": "$16.08",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLUE",
        "invLevel": "34",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 16.08,
          "amountInCents": 1608,
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
        "VARIANT_ID": 553697,
        "swatchColorName": "BLUE",
        "swatchColorCode": "BL",
        "priceFormatted": "$16.08",
        "neverOutOfStock": false,
        "COLOR_NAME": "BLUE",
        "invLevel": "19",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 16.08,
          "amountInCents": 1608,
          "currencySymbol": "$",
          "currency": "$"
        },
        "orderOnlineEnabled": true,
        "stock": true,
        "storePickupMessage": "",
        "SIZE_NAME": "ADULT EX LARGE"
      }]
    },
    {
			"image": "https://spencers.scene7.com/is/image/Spencers/07710429-a",
			"name": "Sweetest Princess Lolly T Shirt - Candyland",
			"price": "24.99",
      "variants": [{
        "cost": 24.99,
        "VARIANT_ID": 568360,
        "swatchColorName": "WHITE",
        "swatchColorCode": "WH",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "WHITE",
        "invLevel": "998",
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
        "VARIANT_ID": 568361,
        "swatchColorName": "WHITE",
        "swatchColorCode": "WH",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "WHITE",
        "invLevel": "999",
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
        "cost": 26.99,
        "VARIANT_ID": 568362,
        "swatchColorName": "WHITE",
        "swatchColorCode": "WH",
        "priceFormatted": "$21.59",
        "neverOutOfStock": false,
        "COLOR_NAME": "WHITE",
        "invLevel": "999",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 21.59,
          "amountInCents": 2159,
          "currencySymbol": "$",
          "currency": "$"
        },
        "orderOnlineEnabled": true,
        "stock": true,
        "storePickupMessage": "",
        "SIZE_NAME": "2X"
      },
      {
        "cost": 26.99,
        "VARIANT_ID": 568363,
        "swatchColorName": "WHITE",
        "swatchColorCode": "WH",
        "priceFormatted": "$21.59",
        "neverOutOfStock": false,
        "COLOR_NAME": "WHITE",
        "invLevel": "999",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 21.59,
          "amountInCents": 2159,
          "currencySymbol": "$",
          "currency": "$"
        },
        "orderOnlineEnabled": true,
        "stock": true,
        "storePickupMessage": "",
        "SIZE_NAME": "3X"
      },
      {
        "cost": 24.99,
        "VARIANT_ID": 568358,
        "swatchColorName": "WHITE",
        "swatchColorCode": "WH",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "WHITE",
        "invLevel": "999",
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
        "VARIANT_ID": 568359,
        "swatchColorName": "WHITE",
        "swatchColorCode": "WH",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "WHITE",
        "invLevel": "999",
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
      }]
    },
    {
			"image": "https://spencers.scene7.com/is/image/Spencers/07710197-a",
			"name": "Candy Land Characters T Shirt",
			"price": "24.99",
      "variants": [{
        "cost": 24.99,
        "VARIANT_ID": 568091,
        "swatchColorName": "NATURAL",
        "swatchColorCode": "NT",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "NATURAL",
        "invLevel": "999",
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
        "VARIANT_ID": 568092,
        "swatchColorName": "NATURAL",
        "swatchColorCode": "NT",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "NATURAL",
        "invLevel": "998",
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
        "VARIANT_ID": 568093,
        "swatchColorName": "NATURAL",
        "swatchColorCode": "NT",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "NATURAL",
        "invLevel": "999",
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
        "VARIANT_ID": 568094,
        "swatchColorName": "NATURAL",
        "swatchColorCode": "NT",
        "priceFormatted": "$19.99",
        "neverOutOfStock": false,
        "COLOR_NAME": "NATURAL",
        "invLevel": "996",
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
        "cost": 26.99,
        "VARIANT_ID": 568095,
        "swatchColorName": "NATURAL",
        "swatchColorCode": "NT",
        "priceFormatted": "$21.59",
        "neverOutOfStock": false,
        "COLOR_NAME": "NATURAL",
        "invLevel": "999",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 21.59,
          "amountInCents": 2159,
          "currencySymbol": "$",
          "currency": "$"
        },
        "orderOnlineEnabled": true,
        "stock": true,
        "storePickupMessage": "",
        "SIZE_NAME": "2X"
      },
      {
        "cost": 26.99,
        "VARIANT_ID": 568096,
        "swatchColorName": "NATURAL",
        "swatchColorCode": "NT",
        "priceFormatted": "$21.59",
        "neverOutOfStock": false,
        "COLOR_NAME": "NATURAL",
        "invLevel": "998",
        "orderOnlineMessage": "Order Now! Expected to ship on or before ",
        "price": {
          "amountInDollars": 21.59,
          "amountInCents": 2159,
          "currencySymbol": "$",
          "currency": "$"
        },
        "orderOnlineEnabled": true,
        "stock": true,
        "storePickupMessage": "",
        "SIZE_NAME": "3X"
      }]
    }
	];

	let upsell = null;

  let ctaRef: HTMLElement;
  let pageRef: HTMLElement;
  let sizeChartContainerRef: HTMLElement;
  let sizeChartOpenState: boolean = false;
  let sku = product?.sku;
  let name = product?.name;
  let [colors, sizes] = extractColorAndSizeNames(product?.variantInfo?.variants || []);
  let price = product?.variantInfo.lowPrice || 0;
  let salePrice = product?.price.msrpPrice || 0;
  let shouldShowSalePrice = price !== salePrice;
  let showControls = false;
  const images = product?.images?.map((image, index) => ({
    src: {
      desktop: `${image}?wid=640&hei=640&fmt=webp`,
      mobile: `${image}?wid=480&hei=480&fmt=webp`,
    },
    thumbnail: `${image}?wid=120&hei=120&fmt=webp`,
    detailedSrc: `${image}?wid=2000&hei=2000&fmt=webp`,
    alt: `${name} ${index + 1}`
  })) || [];
  const badges = product?.badges || [];
  const promos = product?.promos || [];
  const breadcrumbs = product?.breadcrumb || [];
  const valueprop = product?.valueprops;
  const restrictions = Object.entries(product?.restrictions || {});
  const tableData = [
    ['Size', 'Chest', 'Body Length'],
    ['Small', '40"', '28"'],
    ['Medium', '40"', '29"'],
    ['Large', '44"', '30"'],
    ['Extra Large', '48"', '31"'],
    ['2XL', '52"', '32"'],
    ['3XL', '56"', '33"']
  ];
  const description = product?.description;
  const recommendationData = product?.recommendationData || [];
  let payLaterPrice = divideByFourAndRound(Number(price));
  const reviewData = browser ? fetchData(review_endpoint, { timeout }) : null;
  const hasLimitedQuantity = product?.maximumquantity != 99 || false;
  const defaultSize = getDefaultSize(sizes);
  let sizeGroupValue = defaultSize;
  let colorGroupValue = colors[0];
  const fulfillmentTypes = [{
		type: "shipping",
		name: "Shipping",
		message: "In stock",
	}, {
		type: "pickup",
		name: "Pickup",
		message: "Free pickup today",
	}, {
		type: "sameday",
		name: "Same Day",
		message: "Order by 2pm to get it today!",
	}];
  let fulfillmentValue: Writable<string>;

  onMount(async () => {
    const observer = new IntersectionObserver(handleObserver, { root: null, threshold: 0.5 });
    observer.observe(ctaRef);
    const data = await reviewData;
  });

  $: if (sizeGroupValue === "2X") {
    price = product?.variantInfo.highPrice;
  } else {
    price = product?.variantInfo.lowPrice;
  }
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content="Product page redesign"/>
  {@html `<link rel="preload" fetchpriority="high" as="image" href=${isMobile ? images[0].src.mobile : images[0].src.desktop}>`}
  <link rel="preconnect" href="https://readservices-b2c.powerreviews.com" />
</svelte:head>

<IconSet>
	<symbol id="recommended-check"><path d="M2.836 10.855L0 13.473l7.418 6.982L24 5.618 21.164 3 7.418 15.218"/></symbol>
  <symbol id="ruler-flat"><path d="M21.4 16.8H2.6c-.7 0-1.4-.6-1.4-1.3V8.7c0-.7.6-1.4 1.4-1.4h18.8c.7 0 1.3.6 1.3 1.4v6.8c0 .7-.6 1.3-1.3 1.3ZM2.8 15.2h18.5V8.7h-3.5v2.2c0 .4-.3.8-.8.8s-.8-.3-.8-.8V8.7h-3.5v2.2c0 .4-.3.8-.8.8s-.8-.3-.8-.8V8.7H7.6v2.2c0 .4-.3.8-.8.8s-.8-.3-.8-.8V8.7H2.5v6.5Z"/></symbol>
  <symbol id="shipping">
    <g fill="#d7d6d6" stroke-width="0"><path d="M.8 16.2V5.4L11.7 2l11.5 4.6v10.8L12.3 22 .8 16.2z"/><path fill="#a3a3a2" d="m11.7 2.2 11.2 4.5v10.5l-10.7 4.5L1 16V5.6l10.7-3.3m0-.5L.6 5.2v11.1l11.7 5.9 11.2-4.7v-11L11.7 1.8Z"/></g><g fill="#c2c1c1" stroke-width="0"><path d="M.8 16.2V5.6L12 10.3v11.6L.8 16.2z"/><path fill="#a3a3a2" d="m1 5.9 10.8 4.6v11L1 16V5.9m-.4-.7v11.1l11.7 5.9v-12L.6 5.2Z"/></g><path fill="none" stroke="#a3a3a2" stroke-miterlimit="10" stroke-width=".8" d="m12 10.3 11.1-3.7"/><path fill="#6b6c6c" d="M20.3 7.7 8.4 2.8 4.2 4.1l11.6 5.1.3 7.4 2.4-3.3 1.9 1.4-.1-7z"/>
  </symbol>
  <symbol id="sameday">
    <g fill="#c2c1c1">
      <path d="M3.7,15.6H1.7v1.5h1.3c0-.6.3-1.1.7-1.5Z"/>
      <path d="M20.6,8.4h-3.3c-.4,0-.7.3-.7.7v6.5H6.6c.4.4.7.9.7,1.5h10.6c0-1.1,1-2,2.2-2s2.1.9,2.2,2h1.2v-4.3c0-.1,0-.2,0-.3l-2.1-3.6c-.1-.3-.4-.4-.7-.4Z"/>
      <path d="M15.9,15.1H1.7V4.8h13.3c.5,0,.9.4.9.9v9.3h0Z" />
    </g>
    <g fill="#fff">
      <polygon points="22.7 12.6 17.2 12.6 17.2 9 20.7 9 22.7 12.6" />
      <path d="M18.8,13.2h-1.7v-.3s0,0,0,0h1.5s0,0,0,0c0,0,0,.3,0,.3Z" />
    </g>
    <g fill="#6b6c6c">
      <path d="M5.2,15.3c-1.1,0-1.9.9-1.9,1.9s.9,1.9,1.9,1.9,1.9-.9,1.9-1.9-.9-1.9-1.9-1.9ZM5.2,18.2c-.5,0-1-.4-1-1s.4-1,1-1,1,.4,1,1-.4,1-1,1Z"/>
      <path d="M20,15.3c-1.1,0-1.9.9-1.9,1.9s.9,1.9,1.9,1.9,1.9-.9,1.9-1.9-.9-1.9-1.9-1.9ZM20,18.2c-.5,0-1-.4-1-1s.4-1,1-1,1,.4,1,1-.4,1-1,1Z"/>
    </g>
    <g stroke="#6b6c6c" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.2">
      <line x1=".6" y1="10.2" x2="6" y2="10.2" />
      <line x1="1.2" y1="12.5" x2="6.6" y2="12.5" />
      <line x1="2.2" y1="8" x2="7.6" y2="8" />
    </g>
  </symbol>
  <symbol id="pickup">
    <path fill="#c1c1c1" d="M1.9 11h20.2v10.9H1.9z"/><g style="fill:#6b6b6b;stroke:#fff;stroke-miterlimit:10;stroke-width:.2px"><path d="M19.4 4.3H4.6c-.4 0-.8.2-1 .6l-2.7 6h22l-2.7-6c-.2-.4-.5-.6-1-.6ZM2.8 12.8c1 0 1.8-.8 1.8-1.8H1c0 1 .8 1.8 1.8 1.8ZM6.5 12.8c1 0 1.8-.8 1.8-1.8H4.6c0 1 .8 1.8 1.8 1.8ZM13.8 12.8c1 0 1.8-.8 1.8-1.8h-3.7c0 1 .8 1.8 1.8 1.8Z"/><path d="M10.2 12.8c1 0 1.8-.8 1.8-1.8H8.3c0 1 .8 1.8 1.8 1.8ZM17.5 12.8c1 0 1.8-.8 1.8-1.8h-3.7c0 1 .8 1.8 1.8 1.8ZM21.2 12.8c1 0 1.8-.8 1.8-1.8h-3.7c0 1 .8 1.8 1.8 1.8Z"/></g><g fill="#6b6b6b"><path d="M20.8 18.9h-4.6c-.1 0-.2-.1-.2-.2v-3.9c0-.1.1-.2.2-.2h4.6c.1 0 .2.1.2.2v3.9c0 .1-.1.2-.2.2ZM3.9 14.5h5.5v7.4H3.9zM9.5 14.5H15v7.4H9.5z"/></g><g fill="#c1c1c1"><path d="M8.1 17.6h1v2.2h-1zM9.7 17.6h1v2.2h-1z"/></g><path fill="#fff" d="M6.9 4.9c-.1 0-.3-.2-.3-.4V2.2c0-.2.1-.4.3-.4h10.3c.1 0 .3.2.3.4v2.3c0 .2-.1.4-.3.4H6.9Z"/><path fill="#6b6b6b" d="M17.1 2c.1 0 .2.1.2.3v2.3c0 .2 0 .3-.2.3H6.9c-.1 0-.2-.1-.2-.3V2.3c0-.2 0-.3.2-.3h10.3m-.1-.1H6.9c-.2 0-.3.2-.3.4v2.3c0 .2.1.4.3.4h10.3c.2 0 .3-.2.3-.4V2.3c0-.2-.1-.4-.3-.4Z"/><text style="fill:#6b6b6b;font-family:ArialRoundedMTBold,&quot;Arial Rounded MT Bold&quot;;font-size:2.8px;isolation:isolate" transform="translate(7.2 4.4)">STORE</text>
  </symbol>
</IconSet>
<Drawer state={drawerState} alignment="right" afterClose={closeUpSellPanel}>
	<svelte:fragment slot="header">
		<Icon>
			<path fill="#0a8a00" d="M4 12c0-4.4183 3.5817-8 8-8s8 3.5817 8 8-3.5817 8-8 8-8-3.5817-8-8zm8-10C6.4771 2 2 6.4771 2 12c0 5.5228 4.4771 10 10 10 5.5228 0 10-4.4772 10-10 0-5.5229-4.4772-10-10-10zm4.551 5.5066-5.9727 6.0047L7.419 10.335l-1.418 1.4104 4.5773 4.6019L17.969 8.917l-1.418-1.4104z"/>
		</Icon>
		<span>Added to cart</span>
		<DrawerDismiss alignment="right" id={tooltipState.anchorId} />
	</svelte:fragment>
	<div class="product-info">
		<img
			class="product-info__image"
			src="https://spencers.scene7.com/is/image/Spencers/03366192-a?wid=192&amp;hei=192&amp;fmt=webp"
			loading="lazy"
			width="80"
			height="80"
			decoding="async"
			alt="Product added to cart"
		>
		<div class="product-info__name">Talking Tiffany Doll - 20 Inch</div>
		<div class="product-info__price">$89.99</div>
		<div class="product-info__edit-message">Edit delivery method in cart</div>
	</div>
	<div class="drawer__aov-booster">
		<AOVBooster value={13} max={20} />
	</div>
	<h2 class="drawer__heading">Customers also bought these products</h2>
	<div class="upsells">
		{#each upsells as { image, name, price }, index }
			<div class="upsell-product">
				<img
					class="upsell-product__image"
					src="{image}?wid=344&hei=344&fmt=webp"
					loading="lazy"
					width="172"
					height="172"
					decoding="async"
					alt="Product added to cart"
				>
				<div class="upsell-product__name">{name}</div>
				<div class="upsell-product__price">${price}</div>
				<ButtonNew data-index={index} variant="outlined" color="success" on:click={openUpSellPanel}>
					Add to cart
				</ButtonNew>
			</div>
		{/each}
	</div>
	<DrawerPanel bind:open={isPanelOpen}>
		<svelte:fragment slot="header">
			<div class="drawer__panel-title">
				<ButtonNew variant="ghost" size="sm" on:click={closeUpSellPanel}>
					<Icon>
						<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
					</Icon>
				</ButtonNew>
				Choose options
			</div>
    </svelte:fragment>
    {#if upsell !== null}
      <Image width="400" height="400" src={`${upsell.image}?wid=800&hei=800&fmt=webp`} />
      <h2 class="product-page__name">{upsell.name}</h2>
      <div class="product-page__rating">
        {#if browser}
          {#await reviewData}
            <StarRating --ratings-height="20px" />
            <span>No Ratings</span>
          {:then data}
            <StarRating rating={data.results[0]?.rollup?.average_rating || 0} --ratings-height="20px" />
            <span class="product-page__feedbackCount">
              {#if data.results[0]?.rollup?.average_rating}
                {`(${data.results[0]?.rollup?.average_rating})`} 
                <Link href="#" color="secondary">{`${data.paging.total_results} review${data.paging.total_results > 1 ? "s" : ""}`}</Link>
              {:else}
                <Link href="#" color="secondary">be the first!</Link>
              {/if}
            </span>
          {:catch error}
            <StarRating />
            <span>No Ratings</span>
          {/await}
        {/if}
      </div>
      <div class="product-page__price">
        <span class="basePrice" class:onSale={ shouldShowSalePrice }>${upsell.price}</span>
        {#if shouldShowSalePrice}
        <span class="salePrice">${salePrice}</span>
        {/if}
      </div>
      {#if shouldShowSalePrice}
        <div class="yousave-block">
          <span class="yousave-block__label">You save</span>
          <span class="onSale">${(salePrice - price).toFixed(2)}</span>
          <!-- <span class="yousave-block__percentage">({percentageDifference(salePrice, price)}% off)</span> -->
        </div>
      {/if}
      {#if badges.length}
      <div class="product-page__badges">
        {#each badges as badge}
          <div class="badge">{badge}</div>
        {/each}
      </div>
      {/if}
      {#if promos.length}
      <div class="product-page__promos">
        {#each promos as promo}
          <div class="promo">{promo}</div>
        {/each}
      </div>
      {/if}
      <hr />
      {#if sizes.length || colors.length && !colors.includes("MULTI-COLOR")}
      <div class="product-page__variants" role="group">
        {#if colors.length && !colors.includes("MULTI-COLOR")}
        <VariantSelector label="Color" bind:groupValue={colorGroupValue}>
          {#if colors.length > 1}
            {#each colors as color, index}
              <Swatch aria-label={color} color={getMappedColorData(color)?.colorCode} name="color" value={color} checked={index === 0} />
            {/each}
          {/if}
        </VariantSelector>
        {/if}
        {#if sizes.length}
        <VariantSelector label="Size" bind:groupValue={sizeGroupValue}>
          <svelte:fragment slot="action">
            <Button variant="icon" size="small" aria-label="Size Chart" on:click={scrollToAndOpenAccordion}>
              <Icon>
                <use href="#ruler-flat" />
              </Icon>
              Size Chart
            </Button>
          </svelte:fragment>
          {#if sizes.length > 1}
            {#each sizes as { name, outOfStock }}
              <Radio 
                disabled={outOfStock} 
                variant="box" 
                name="size" 
                value={name} 
                checked={name === defaultSize} 
                aria-label={`${name} ${name === defaultSize ? "selected" : ""}`}
              >
                {name}
              </Radio>
            {/each}
          {/if}
        </VariantSelector>
        {/if}
      </div>
      <hr />
      {/if}
      <FulfillmentRadioGroup bind:value={fulfillmentValue}>
        {#each fulfillmentTypes as { type, name, message }, index}
          <FulfillmentOption 
            value={type} 
            {name} 
            {message} 
            label="{name} - {$fulfillmentValue === type ? "selected" : "unselected"} - {index + 1} of {fulfillmentTypes.length} - {message}"
          >
            <Icon slot="icon">
              <use href="#{type}" />
            </Icon>
          </FulfillmentOption>
        {/each}
        <svelte:fragment slot="group-message">
          {#if $fulfillmentValue === "shipping"}
            <span class="color-success">Ready to Ship</span>
          {:else if $fulfillmentValue === "pickup"}
            Pickup at <span class="underline">Ocean County, NJ</span>
            <ButtonNew variant="ghost" color="primary" underline>Change Store</ButtonNew>
          {:else if $fulfillmentValue === "sameday"}
            Delivery to <span class="underline">08234</span>
            <ButtonNew variant="ghost" color="primary" underline>Change Zip</ButtonNew>
          {/if}
        </svelte:fragment>
      </FulfillmentRadioGroup>
      {#if hasLimitedQuantity}
        <div class="product-page__limited-quantity">
          Maxiumum of {product?.maximumquantity} units per order
        </div>
      {/if}
      <div class="product-page__action">
        <InputStepper max={product?.maximumquantity} />
        <ButtonNew color="success" on:click={closeUpSellPanel}>Add to Cart</ButtonNew>
      </div>
    {/if}
	</DrawerPanel>
	<svelte:fragment slot="footer">
		<div class="drawer__footer-actions">
			<ButtonNew variant="outlined" rounded on:click={close}>
				Continue shopping
			</ButtonNew>
			<ButtonNew rounded>
				View Cart
			</ButtonNew>
		</div>
	</svelte:fragment>
</Drawer>
<Tooltip state={tooltipState}>
	Close
</Tooltip>
<Page>
  <div class="product-page-container" bind:this={pageRef}>
    <div class="product-page__gallery">
      <ProductGallery {images} {isMobile}/>
    </div>
    <div class="product-page">
      <Breadcrumb label="Product Breadcrumbs" scrollable={isMobile}>
        {#each breadcrumbs as { href, current, text}}
          <Crumb {href} {current}>{text}</Crumb>
        {/each}
      </Breadcrumb>
      <h1 
        class="product-page__name"
        class:ellipsis={isMobile}
        on:pointerup={toggleProductNameClamp}
      >
        {name}
      </h1>
      <div class="product-page__rating">
        {#if browser}
          {#await reviewData}
            <StarRating --ratings-height="20px" />
            <span>No Ratings</span>
          {:then data}
            <StarRating rating={data.results[0]?.rollup?.average_rating || 0} --ratings-height="20px" />
            <span class="product-page__feedbackCount">
              {#if data.results[0]?.rollup?.average_rating}
                {`(${data.results[0]?.rollup?.average_rating})`} 
                <Link href="#" color="secondary">{`${data.paging.total_results} review${data.paging.total_results > 1 ? "s" : ""}`}</Link>
              {:else}
                <Link href="#" color="secondary">be the first!</Link>
              {/if}
            </span>
          {:catch error}
            <StarRating />
            <span>No Ratings</span>
          {/await}
        {/if}
      </div>
      <div class="product-page__price">
        <span class="basePrice" class:onSale={ shouldShowSalePrice }>${price}</span>
        {#if shouldShowSalePrice}
        <span class="salePrice">${salePrice}</span>
        {/if}
      </div>
      {#if shouldShowSalePrice}
        <div class="yousave-block">
          <span class="yousave-block__label">You save</span>
          <span class="onSale">${(salePrice - price).toFixed(2)}</span>
          <!-- <span class="yousave-block__percentage">({percentageDifference(salePrice, price)}% off)</span> -->
        </div>
      {/if}
      {#if badges.length || promos.length}
      <div class="product-page__badges">
        {#each badges as badge}
          <div class="badge">{badge}</div>
        {/each}
        {#each promos as promo}
          <div class="promo">{promo}</div>
        {/each}
      </div>
      {/if}
      <!-- {#if promos.length}
      <div class="product-page__promos">
        {#each promos as promo}
          <div class="promo">{promo}</div>
        {/each}
      </div>
      {/if} -->
      <hr />
      {#if sizes.length || colors.length && !colors.includes("MULTI-COLOR")}
      <div class="product-page__variants" role="group">
        {#if colors.length && !colors.includes("MULTI-COLOR")}
        <VariantSelector label="Color" bind:groupValue={colorGroupValue}>
          {#if colors.length > 1}
            {#each colors as color, index}
              <Swatch aria-label={color} color={getMappedColorData(color)?.colorCode} name="color" value={color} checked={index === 0} />
            {/each}
          {/if}
        </VariantSelector>
        {/if}
        {#if sizes.length}
        <VariantSelector label="Size" bind:groupValue={sizeGroupValue}>
          <svelte:fragment slot="action">
            <Button variant="icon" size="small" aria-label="Size Chart" on:click={scrollToAndOpenAccordion}>
              <Icon>
                <use href="#ruler-flat" />
              </Icon>
              Size Chart
            </Button>
          </svelte:fragment>
          {#if sizes.length > 1}
            {#each sizes as { name, outOfStock }}
              <Radio 
                disabled={outOfStock} 
                variant="box" 
                name="size" 
                value={name} 
                checked={name === defaultSize} 
                aria-label={`${name} ${name === defaultSize ? "selected" : ""}`}
              >
                {name}
              </Radio>
            {/each}
          {/if}
        </VariantSelector>
        {/if}
      </div>
      <hr />
      {/if}
      <FulfillmentRadioGroup bind:value={fulfillmentValue}>
        {#each fulfillmentTypes as { type, name, message }, index}
          <FulfillmentOption 
            value={type} 
            {name} 
            {message} 
            label="{name} - {$fulfillmentValue === type ? "selected" : "unselected"} - {index + 1} of {fulfillmentTypes.length} - {message}"
          >
            <Icon slot="icon">
              <use href="#{type}" />
            </Icon>
          </FulfillmentOption>
        {/each}
        <svelte:fragment slot="group-message">
          {#if $fulfillmentValue === "shipping"}
            <span class="color-success">Ready to Ship</span>
          {:else if $fulfillmentValue === "pickup"}
            Pickup at <span class="underline">Ocean County, NJ</span>
            <ButtonNew variant="ghost" color="primary" underline>Change Store</ButtonNew>
          {:else if $fulfillmentValue === "sameday"}
            Delivery to <span class="underline">08234</span>
            <ButtonNew variant="ghost" color="primary" underline>Change Zip</ButtonNew>
          {/if}
        </svelte:fragment>
      </FulfillmentRadioGroup>
      {#if hasLimitedQuantity}
        <div class="product-page__limited-quantity">
          Maxiumum of {product?.maximumquantity} units per order
        </div>
      {/if}
      <div class="product-page__action" bind:this={ctaRef}>
        <InputStepper max={product?.maximumquantity} />
        <ButtonNew color="success" on:click={addToCart}>Add to Cart</ButtonNew>
      </div>
      <div class="product-page__pay-later">
        <span class="paylater-text">or 4 interest-free payments of ${payLaterPrice} with</span>
        <Icon>
          <path d="m17.7 8.7-9.2 10H5.1c-.2 0-.4-.2-.4-.5L7 4c0-.3.3-.6.7-.6h5.7c3.9.2 5 2.2 4.3 5.3z" style="fill:#002c8a"/>
          <path d="M17.8 7.7c1.4.8 1.7 2.2 1.3 4-.6 2.8-2.4 3.9-5.1 4h-.8c-.3 0-.5.2-.5.5l-.6 3.8c0 .3-.3.6-.7.6H8.6c-.2 0-.4-.2-.4-.5l1-6.7c.1-.3 8.6-5.7 8.6-5.7z" style="fill:#009be1"/>
          <path d="m9.2 13.7.9-6c.1-.3.3-.5.6-.5h4.5c1.1 0 1.9.2 2.5.5-.2 2.1-1.2 5.4-6 5.5H9.8c-.3 0-.5.2-.6.5z" style="fill:#001f6b"/>
        </Icon>
        or
        <Icon viewBox="0 0 72 24" variant="logo">
          <path d="M15.5,5h-3.2c0,2.5-1.2,4.8-3.3,6.3l-1.3.9,4.8,6.4h4l-4.4-5.8c2.1-2.1,3.3-4.8,3.3-7.7ZM4.2,5h3.2v13.5h-3.2V5ZM17.5,5h3v13.5h-3s0-13.5,0-13.5ZM47,9c-1.2,0-2.3.4-3,1.3v-1h-2.9v9.4h2.9v-4.9c0-1.5,1-2.2,2.2-2.2s2,.7,2,2.2v5h2.9v-6c0-2.3-1.7-3.7-4.1-3.7h0ZM29.6,9.2v.6c-.8-.5-1.7-.8-2.9-.8-2.8,0-5.1,2.3-5.1,5s2.3,5,5.1,5,2-.4,2.9-.8v.6h2.9v-9.4h-2.9v-.2ZM27,16.4c-1.4,0-2.6-1.1-2.6-2.4s1.2-2.4,2.6-2.4,2.6,1.1,2.6,2.4-1.2,2.4-2.6,2.4ZM37,10.5v-1.2h-3v9.4h3v-4.4c0-1.5,1.6-2.3,2.8-2.3v-2.7c-1.2,0-2.3.5-2.8,1.2h0ZM60,9.2v.6c-.8-.5-1.7-.8-2.9-.8-2.8,0-5.1,2.3-5.1,5s2.3,5,5.1,5,2-.4,2.9-.8v.6h2.9v-9.4h-2.9v-.2ZM57.3,16.4c-1.4,0-2.6-1.1-2.6-2.4s1.2-2.4,2.6-2.4,2.6,1.1,2.6,2.4-1.2,2.4-2.6,2.4ZM65,9.5c0-.2,0-.3-.3-.3h-.3v.7h0v-.3h.2v.3h.3v-.5h0ZM64.8,9.6h-.2v-.3h.2v.3Z"/>
          <path d="M64.8,9c-.4,0-.7.4-.7.7s.4.7.7.7.7-.4.7-.7-.4-.7-.7-.7ZM64.8,10.2c-.4,0-.5-.3-.5-.5s.3-.5.5-.5.5.3.5.5-.3.5-.5.5ZM65.9,15.3c-1,0-1.8.7-1.8,1.8s.8,1.8,1.8,1.8,1.8-.7,1.8-1.8-.8-1.8-1.8-1.8Z"/>          
        </Icon>
      </div>
      {#if valueprop.power && valueprop.sound}
        <PowerAndSound power={valueprop.power} sound={valueprop.sound} bluetooth={valueprop.bluetooth} rechargeable={valueprop.rechargeable} waterproof={valueprop.waterproof} />
      {/if}
      {#if restrictions.length}
      <div class="product-page__restrictions">
        {#each restrictions as [level, warnings]}
          <WarningCard level={getNumberFromString(level)}>
            {#each warnings as {type, message}}
              <div><strong>{type}</strong> - {message}</div>
            {/each}
          </WarningCard>
        {/each}
      </div>
      {/if}
      <div class="product-page__details">
        <Accordion open>
          <svelte:fragment slot="label">Description</svelte:fragment>
          <Collapsible height="150px">
            {@html description}
            <div class="item-sku">Item# {sku}</div>
          </Collapsible>
        </Accordion>
        {#if sizes.length}
        <Accordion bind:open={sizeChartOpenState}>
          <svelte:fragment slot="label">Size Chart</svelte:fragment>
          <div class="size-chart" bind:this={sizeChartContainerRef}>
            <p class="size-chart__label">When trying to decide between two sizes, choose the larger size for a better fit.</p>
            <Table variant="bordered" {tableData} />
          </div>  
        </Accordion>
        {/if}
        <Accordion>
          <svelte:fragment slot="label">Shipping & Returns</svelte:fragment>
          <div class="shippingAndReturns">
            <div class="shippingAndReturns__block">
              <h3 class="shippingAndReturns__heading">Shipping</h3>
              <p class="shippingAndReturns__content">We greatly appreciate your order. Therefore, we provide prompt, secure, and dependable shipping options for every item.</p>
              <Link href="/shipping-policy" alt="Shipping Policy">Read our Shipping Policy</Link>
            </div>
            <div class="shippingAndReturns__block">
              <h3 class="shippingAndReturns__heading">30-Day Return</h3>
              <p class="shippingAndReturns__content">Not loving it? We offer returns for items within 30 days of delivery for a refund.</p>
              <Link href="/shipping-return-policy" alt="30-Day Return Policy">Read our 30-Day Return Policy</Link>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  </div>
  {#if recommendationData.length}
  <section class="recommendation-section">
    <h2 class="recommendation-section__heading">More Cool Stuff</h2>
    <div class="recommendation-section__carousel">
      {#each recommendationData as { image, name, price, url}}
        <a href={url} class="product-card">
          <img 
            class="product-card__image"
            loading="lazy"
            width="277"
            height="277"
            decoding="async"
            draggable="false"
            src={image.src}
            alt={image.alt}
          />
          <div class="product-card__name">{name}</div>
          <div class="product-card__price">${price}</div>
        </a>
      {/each}
    </div>
  </section>
  {/if}
  {#if browser}
  {#await reviewData}
    <div>waiting for Recommendations</div>
  {:then data}
    <RatingsAndReviewsCard data={data} url={review_endpoint}>
      <svelte:fragment slot="subheading">
        Our <Link href="/help/article/community-guidelines">Community Guidelines</Link> help customers write honest reviews.
      </svelte:fragment>
    </RatingsAndReviewsCard>
  {:catch error}
    <div>Something went wrong.</div>
  {/await}
  {/if}
  {#if recommendationData.length}
  <section class="recommendation-section">
    <h2 class="recommendation-section__heading">Recently Viewed</h2>
    <div class="recommendation-section__carousel">
      {#each [recommendationData[0]] as { image, name, price, url}}
        <a href={url} class="product-card">
          <img 
            class="product-card__image"
            loading="lazy"
            width="277"
            height="277"
            decoding="async"
            draggable="false"
            src={image.src}
            alt={image.alt}
          />
          <div class="product-card__name">{name}</div>
          <div class="product-card__price">${price}</div>
        </a>
      {/each}
    </div>
  </section>
  {/if}
</Page>
<div class="page-controls" class:page-controls--show={showControls}>
  <div class="product-page__action">
    <InputStepper/>
    <Button variant="success" on:click={addToCart}>Add to Cart</Button>
  </div>
</div>

<style>
.drawer__heading {
  margin: 0;
  line-height: 1.25;
  font-size: 1rem;
  padding: 1rem 1.5rem;
}

.drawer__aov-booster {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.drawer__footer-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1rem;
  flex-flow: row nowrap;
  gap: 1rem;
}

.drawer__footer-actions > :global(button) {
  flex: 0 0 50%;
}

.drawer__panel-title {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: .25rem;
  --uikit-btn-width: 2rem;
  --uikit-btn-padding-inline: 0;
}

.upsells {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 1.5rem;
  padding: 0 1.5rem 1rem;
}

.product-info {
  position: sticky;
  top: 0;
  flex: 0 0 100%;
  display: grid;
  grid-template-areas: 
    "image name"
    "image price"
    "image edit-message";
  grid-template-columns: fit-content(80px) 1fr;
  grid-template-rows: fit-content(2rem) 1rem 1fr;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  gap: .5rem;
  padding: .5rem;
  border-bottom: 1px solid #DFDFDF;
  background-color: var(--uikit-drawer-bg-color);
  z-index: 1;
}

.product-info__image {
  width: 100%;
  grid-area: image;
}

.upsell-product__image {
  display: block;
  width: 100%;
  height: auto;
}

.product-info__name {
  grid-area: name;
}

.product-info__price {
  grid-area: price;
}

.product-info__edit-message {
  grid-area: edit-message;
  color: #666;
  display: flex;
  font-size: .75rem;
  align-items: end;
}

.upsell-product {
  display: grid;
  gap: .5rem;
}

.upsell-product__name,
.product-info__name {	
  font-size: .875rem;
  font-size: .8125rem;
  line-height: 1;
}

.upsell-product__price,
.product-info__price {
  line-height: 1;
  font-size: 1rem;
  font-weight: 500;
}

/* General Styles */
hr {
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 0;
  border-top: 1px solid #eeeeee;
}

:global(.bold) {
  font-weight: 700;
}

.underline {
  text-decoration: underline;
}

.color-success {
  color: #008300;
}

.promo {
  font-size: .75rem;
  font-weight: 700;
  display: flex;
  height: 1.4rem;
  min-width: 1.5rem;
  padding: 0 .5rem;
  align-items: center;
  justify-content: center;
  background: #e6f1fc;
  color: #004f9a;
  border-radius: .75rem;
}

/* Product Page Container */
.product-page-container {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: minmax(auto, 710px) 1fr;
  padding: 1rem 0;
}

@media (max-width: 1024px) {
  .product-page-container {
    grid-template-columns: calc(50% - .25rem) calc(50% - .25rem);
    gap: .5rem;
  }
}

@media(max-width: 640px) {
  .product-page-container {
    grid-template-columns: none;
  }
}

/* Product Page */
.product-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-page__gallery {
  position: sticky;
  top: 102px;
  height: fit-content;
}

@media (max-width: 640px) {
  .product-page__gallery {
    position: relative;
    top: initial;
  }
}

.product-page__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-page__name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.025em;
}

.product-page__price {
  padding: .25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.product-page__rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 24px;
  font-size: .875rem;
}

.product-page__variants {
  display: grid;
  gap: .5rem;
}

.product-page__action {
  padding-top: 2.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
}

.product-page:has(.product-page__limited-quantity) .product-page__action {
  padding-top: 0;
}

.product-page__limited-quantity {
  /* padding-top: 2.5rem; */
}

.product-page__pay-later {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .875rem;
  line-height: 1.2;
  gap: 4px;
}

@media(max-width: 560px) {
  .product-page :global(.breadcrumbs) {
    width: calc(100vw - 1rem);
  }

  .product-page__pay-later {
    font-size: .75rem;
  }
}

.product-page__details,
.product-page__restrictions {
  display: grid;
  gap: .5rem;
  margin-top: 2.5rem;
}

/* Badges */
.badge {
  background-color: #2a508f;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  height: 24px;
  min-width: 24px;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 12px;
}

/* Item SKU */
.item-sku {
  font-size: .875rem;
  font-weight: 700;
  line-height: 1.4;
  color: #4c4c4c;
  margin-top: 1rem;
}

/* You Save Block */
.yousave-block__label {
  background-color: #eaf3e6;
  color: #256b09;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  min-height: 24px;
  padding-inline: .25rem;
  border-radius: 4px;
}

/* .yousave-block__percentage {
  color: #74767c;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1;
} */

.salePrice {
  color: #74767c;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1;
  text-decoration: line-through;
}

.onSale {
  color: #2a8703;
  font-weight: 700;
}

/* Page Controls */
.page-controls {
  display: none;
  transition: opacity .25s ease-in-out;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  bottom: 0;
  box-shadow: 1px 3px 8px 3px rgba(0, 0, 0, 0.3);
  left: 0;
  gap: .5rem;
  z-index: 10;
  background-color: #fff;
  padding: 1rem;
  width: 100vw;
}

.page-controls--show {
  opacity: 1;
  pointer-events: initial;
}

@media(max-width: 560px) {
  .page-controls {
    display: grid;
  }

  .page-controls .product-page__action {
    padding: 0;
  }
}

/* Recommendation Section */
.recommendation-section {
  margin: 3rem 0;
  display: grid;
  gap: .5rem;
  overflow: hidden;
}

.recommendation-section__heading {
  font-size: 1.5rem;
  color: #000;
  font-weight: 400;
}

.recommendation-section__carousel {
  display: flex;
  gap: 1rem;
  flex-flow: row nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: manipulation;
  overscroll-behavior-x: none;
  scroll-snap-type: x mandatory;
  scroll-padding-right: 1rem;
}

.recommendation-section__carousel .product-card {
  scroll-snap-align: start;
}

/* Product Card */
.product-card,
.product-card:visited {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: #212121;
  text-decoration: none;
  flex: 0 0 calc((100% - (4 * .5rem)) / 5);
}

.product-card__image {
  width: 100%;
  height: auto;
  display: block;
}

.product-card__name {
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.4;
  color: #000;
}

.product-card__price {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  color: #000;
}

@media(max-width: 560px) {
  .product-card,
  .product-card:visited {
    flex: 0 0 calc((100% - 0px) / 2.5);
  }

  .ellipsis {
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
  }
}

/* Size Chart */
.size-chart {
  display: grid;
  gap: .5rem;
  padding: .5rem 0;
}

.size-chart__label {
  font-size: .875rem;
  line-height: 1;
  margin: 0;
}

/* Shipping and Returns */
.shippingAndReturns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.shippingAndReturns__block {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.shippingAndReturns__heading {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1;
  font-weight: 500;
}

.shippingAndReturns__content {
  margin: 0;
  font-size: .875rem;
  line-height: 1.5;
}

</style>