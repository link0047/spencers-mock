<script lang="ts">
  import { onMount } from "svelte";
  import Page from "$lib/components/page/Page.svelte";
  import ProductGallery from "$lib/components/productGallery/ProductGallery.svelte";
  import StarRating from "$lib/components/starrating";
  import VariantSelector from "$lib/components/variantselector";
  import { Radio } from "$lib/components/radio";
  import Swatch from "$lib/components/swatch";
  import { ShippingFulfillmentGroup, ShippingFulfillmentOption } from "$lib/components/shippingfulfillment";
  import Button from "$lib/components/button";
  import Accordion from "$lib/components/accordion";
  import InputStepper from "$lib/components/inputstepper";
  import { Breadcrumb, Crumb } from "$lib/components/breadcrumbs";
  import Icon from "$lib/components/icon";
  import Table from "$lib/components/table";
  import Link from "$lib/components/link";
  import { RatingsAndReviewsCard } from "$lib/components/ratingsandreviewscard";
  import { fetchData } from "$lib/client/util/utilities.js";
  import { browser } from "$app/environment";
  import IconSet from "$lib/components/iconset";
  import { Collapsible } from "$lib/components/collapsible";
  import WarningCard from "$lib/components/warningcard";
  
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
  
    return `Get it by ${dayName}, ${monthAbbrev} ${dayOfMonth}`;
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
   * Handles intersection observer entries.
   * @param {IntersectionObserverEntry[]} entries - The array of intersection observer entries.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */
  function handleObserver(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(`${entry.target.textContent} is visible`);
        showControls = false;
      } else {
        console.log(`${entry.target.textContent} is not visible`);
        if (window.scrollY > 100) {
          showControls = true;
        }
      }
    });
  }

  /**
   * Extracts color names and size names from an array of variant objects,
   * avoiding duplicates and empty strings.
   * @param {Array<{ COLOR_NAME: string; SIZE_NAME: string; }>} variantsArray - The array of variant objects.
   * @returns {[string[], string[]]} An array containing two arrays: color names and size names.
   */
  function extractColorAndSizeNames(variantsArray: Array<{ COLOR_NAME: string; SIZE_NAME: string; }>): [string[], string[]] {
    if (!variantsArray || variantsArray.length === 0) {
      return [[], []]; // Return empty arrays if variantsArray is empty or undefined
    }
    const colorNames: string[] = [];
    const sizeNames: string[] = [];

    // Object to keep track of unique color names and size names
    const colorNameSet: { [key: string]: boolean } = {};
    const sizeNameSet: { [key: string]: boolean } = {};

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
      // Extract COLOR_NAME and SIZE_NAME properties
      const { COLOR_NAME, SIZE_NAME } = variant;

      // Add non-empty color names to the array
      if (COLOR_NAME.trim() !== "" && !colorNameSet[COLOR_NAME]) {
        colorNames.push(COLOR_NAME);
        colorNameSet[COLOR_NAME] = true; // Mark color name as encountered
      }

      // Add non-empty size names to the array
      if (SIZE_NAME.trim() !== "" && !sizeNameSet[SIZE_NAME]) {

        const lowercaseSize: string = SIZE_NAME.toLowerCase();
        // Check if the size contains any of the words and map accordingly
        if (lowercaseSize.includes("small")) {
          sizeNames.push(sizeMapping["small"]);
        } else if (lowercaseSize.includes("medium")) {
          sizeNames.push(sizeMapping["medium"]);
        } else if (lowercaseSize.includes("ex large")) {
          sizeNames.push(sizeMapping["ex large"]);
        } else if (lowercaseSize.includes("large")) {
          sizeNames.push(sizeMapping["large"]);
        } else {
          // If the size doesn't contain any of the words, return the original size
          sizeNames.push(SIZE_NAME);
        }

        sizeNameSet[SIZE_NAME] = true; // Mark size name as encountered
      }
    });

    return [colorNames, sizeNames.sort(sortSize)];
  }

  /**
   * Get the default size from an array of sizes.
   * @param {string[]} sizes - An array of sizes.
   * @returns {string | null} - The default size ("m" if it exists, else the first size in the array), or null if the array is empty.
   */
  function getDefaultSize(sizes: string[]): string | null {
    return sizes.includes("M") ? "M" : sizes.length > 0 ? sizes[0] : null;
  }

  let ctaRef: HTMLElement;
  let pageRef: HTMLElement;
  let sizeGroupValue = "";
  let sku = product?.sku;
  let name = product?.name;
  let [colors, sizes] = extractColorAndSizeNames(product?.variantInfo.variants || []);
  let price = product?.variantInfo.lowPrice;
  let showControls = false;
  const images = product?.images?.map((image, index) => ({
    src: {
      desktop: `${image}?wid=640&hei=640&fmt=webp`,
      mobile: `${image}?wid=480&hei=480&fmt=webp`,
    },
    thumbnail: `${image}?wid=60&hei=60&fmt=webp`,
    detailedSrc: `${image}?wid=2000&hei=2000&fmt=webp`,
    alt: `${name} ${index + 1}`
  })) || [];
  const badges = product?.badges || [];
  const breadcrumbs = product?.breadcrumb || [];
  const restrictions = Object.entries(product?.restrictions || {});

  console.log("restrictions",restrictions);
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

  onMount(async () => {
    const observer = new IntersectionObserver(handleObserver, { root: null, threshold: 0.5 });
    observer.observe(ctaRef);

    const data = await reviewData;
    console.log(data);
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
  <link rel="preload" as="image" href={isMobile ? images[0].src.mobile : images[0].src.desktop}>
</svelte:head>

<IconSet>
	<symbol id="recommended-check"><path d="M2.836 10.855L0 13.473l7.418 6.982L24 5.618 21.164 3 7.418 15.218"/></symbol>
</IconSet>
<Page>
  <div class="product-page-container" bind:this={pageRef}>
    <div class="product-page__gallery">
      <ProductGallery {images} {isMobile}/>
    </div>
    <div class="product-page">
      <Breadcrumb>
        {#each breadcrumbs as { href, current, text}}
          <Crumb {href} {current}>{text}</Crumb>
        {/each}
      </Breadcrumb>
      <h1 class="product-page__name">{name}</h1>
      
      <div class="product-page__rating">
        {#if browser}
          {#await reviewData}
            <StarRating --ratings-height="20px" />
            <span>No Ratings</span>
          {:then data}
            <StarRating rating={data.results[0].rollup.average_rating} --ratings-height="20px" />
            <span class="product-page__feedbackCount">
              {#if data.results[0].rollup.average_rating}
                {`(${data.results[0].rollup.average_rating})`} 
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
        <span class="salePrice"></span>
        <span class="basePrice">${price}</span>
      </div>
      <div class="product-page__badges">
        {#each badges as badge}
          <div class="badge">{badge}</div>
        {/each}
      </div>
      <hr />
      <div class="product-page__variants" role="group">
        <VariantSelector label="Color">
          {#each colors as color, index}
            <Swatch aria-label={color} color={color} name="color" value={color} checked={index === 0} />
          {/each}
        </VariantSelector>
        {#if sizes.length}
        <VariantSelector label="Size" bind:groupValue={sizeGroupValue}>
          {#each sizes as size}
            <Radio variant="box" name="size" value={size} checked={size === defaultSize}>{size}</Radio>
          {/each}
        </VariantSelector>
        {/if}
      </div>
      <hr />
      <ShippingFulfillmentGroup>
        <ShippingFulfillmentOption>
          <Icon slot="icon">
            <path d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16V4Z" />
          </Icon>
          <svelte:fragment slot="heading">
            Shipping
          </svelte:fragment>
          <svelte:fragment slot="description">
            {getDeliveryDate()}
          </svelte:fragment>
        </ShippingFulfillmentOption>
        <ShippingFulfillmentOption>
          <Icon slot="icon">
            <path d="M.9 5.7h4.3v.9H.9zM5 7.9h3.4v.9H5zM1.6 9.8h9.8v.9H1.6zM5.7 12.1h5.9v.9H5.7zM2.3 12.8h3v.9h-3zM1 15.1h2.7v.9H1z" />
            <path d="m23 10.8-3.1-1.4.4-2.7c0-.3 0-.6-.2-.8-.2-.2-.4-.3-.7-.3H5.8v.9H16L15.5 9c-.1.3 0 .5.2.8.2.2.4.3.7.3l3-.1 3.2 1.5-1.4 3.5h-2c-.1-.4-.2-.7-.5-1-.3-.4-.8-.5-1.3-.5-.9 0-1.9.6-2.5 1.5h-3.8c0-.4-.2-.8-.4-1.1-.3-.4-.8-.6-1.4-.6-1 0-2 .7-2.6 1.7H4.6v.9h1.8c-.1.6 0 1.3.3 1.7.3.4.9.7 1.4.7 1.2 0 2.5-1 2.8-2.3v-.1h3.6c-.2.7-.1 1.4.3 1.9.3.4.9.7 1.4.7 1.2 0 2.5-1 2.8-2.3 0-.1 0-.2.1-.2H21c.4 0 .7-.2.9-.6l1.4-3.5c.2-.4.1-.9-.3-1.1zm-6.7-1.5.6-2.7h2.5v.1L19 9.2l-2.7.1v.3-.3zm1.1 5.2c.3 0 .6.1.7.3.1.2.2.4.2.7v.1c0 .1 0 .2-.1.3-.2.9-1.1 1.7-2 1.7-.3 0-.6-.1-.7-.3-.2-.3-.3-.7-.1-1.1.3-.9 1.2-1.7 2-1.7zm-7.2 1.3c-.2.9-1.1 1.7-2 1.7-.3 0-.6-.1-.7-.3-.2-.3-.3-.7-.1-1.1.2-.9 1.1-1.7 2-1.7.3 0 .6.1.7.3.1.2.2.4.2.7v.1l-.1.3z"/>
          </Icon>
          <svelte:fragment slot="heading">Pickup</svelte:fragment>
          <svelte:fragment slot="description">Free pickup today</svelte:fragment>
        </ShippingFulfillmentOption>
        <ShippingFulfillmentOption>
          <Icon slot="icon">
            <path d="M12.1 23.8c-.1 0-.1 0-.2-.1L1.5 17.6c-.1-.1-.2-.2-.2-.4V6.1c0-.2.1-.3.2-.4L11.9.3c.1-.1.3-.1.4 0l10.1 5.4c.1.1.2.2.2.4v11.1c0 .1-.1.3-.2.4l-10.1 6.1c-.1.1-.1.1-.2.1zm.3-10.7v9.6l9.3-5.7V7.2l-9.3 5.9zM2.1 17l9.5 5.6V13L9 11.3v3.9c0 .2-.1.3-.3.4-.2 0-.4 0-.5-.2l-1.9-3.2-1.5 1.1c-.1.1-.3.1-.4 0-.1-.1-.2-.2-.2-.4V8.3L2.1 7v10zm4.3-5.8c.1 0 .1 0 0 0 .2 0 .3.1.4.2l1.4 2.3v-2.9L5 8.8v3.4l1.2-.9c.1 0 .1-.1.2-.1zm3.1-.5 2.5 1.6 9.6-6-3.3-1.8.1.1-8.9 6.1zM5.6 8.3l3.1 2 8.8-6.1-2.8-1.5.1.1-9.2 5.5zM2.4 6.2l2.5 1.5 9.3-5.5-2.1-1.1-9.7 5.1z"/>
          </Icon>
          <svelte:fragment slot="heading">Same Day Delivery</svelte:fragment>
          <svelte:fragment slot="description">Order by 2pm to get it today!</svelte:fragment>
        </ShippingFulfillmentOption>
      </ShippingFulfillmentGroup>
      {#if hasLimitedQuantity}
        <div class="product-page__limited-quantity">
          Maxiumum of {product?.maximumquantity} units per order
        </div>
      {/if}
      <div class="product-page__action" bind:this={ctaRef}>
        <InputStepper max={product?.maximumquantity} />
        <Button variant="success">Add to Cart</Button>
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
        <Accordion>
          <svelte:fragment slot="label">Size Chart</svelte:fragment>
          <div class="size-chart">
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
  {#if browser}
  {#await reviewData}
    <div>waiting</div>
  {:then data}
    <RatingsAndReviewsCard data={data} url={review_endpoint}>
      <svelte:fragment slot="subheading">
        Our <Link href="/help/article/community-guidelines">Community Guidelines</Link> help customers write honest reviews.
      </svelte:fragment>
    </RatingsAndReviewsCard>
  {:catch error}
    <div>Something went wrong</div>
  {/await}
  {/if}
  <section class="recommendation-section mb-120">
    <h2 class="recommendation-section__heading">Recently Viewed</h2>
    <div class="recommendation-section__carousel">
      {#each [recommendationData[0]] as { image, name, price, url}, index}
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
</Page>
<div class="page-controls" class:page-controls--show={showControls}>
  <div class="product-page__action">
    <InputStepper/>
    <Button variant="success">Add to Cart</Button>
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
</div>

<style>
  .item-sku {
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.4;
    color: #4c4c4c;
  }

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

    .mb-120 {
      margin-bottom: 140px!important;
    }
  }

  .page-controls .product-page__action {
    padding: 0;
  }

  .recommendation-section {
    margin: 3rem 0;
    display: grid;
    gap: .5rem;
    overflow: hidden;
  }

  .recommendation-section__heading {
    font-size: 1.5rem;
    line-height: 1;
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
  }

  .recommendation-section__carousel {
    display: flex;
    gap: 1rem;
    flex-flow: row nowrap;
    overflow-x: auto;
  }

  .product-card, .product-card:visited {
    display: flex;
    flex-flow: column nowrap;
    gap: .5rem;
    color: #212121;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-decoration: none;
    flex: 0 0 calc((100% - (4*8px)) / 5);
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

  @media(max-width:560px) {
    .product-card, .product-card:visited {
      flex: 0 0 calc((100% - 0px) / 2.5);
    }
  }

  hr {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    border-width: 1px 0px 0px;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    border-image: initial;
    border-top-style: solid;
    border-top-color: rgb(238, 238, 238);
  }

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

  .shippingAndReturns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	
	.shippingAndReturns__block {
		display: flex;
		flex-flow: column nowrap;
		gap: .5rem;
	}
	
	.shippingAndReturns__heading {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1;
		font-weight: 500;
		height: fit-content;
	}
	
	.shippingAndReturns__content {
		margin: 0;
		font-size: .875rem;
		line-height: 1.5;
	}

  .product-page-container {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: minmax(auto, 710px) 1fr;
    padding: 1rem 0;
  }

  .product-page__gallery {
    position: sticky;
    top: 102px;
    height: fit-content;
  }

  .product-page {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    gap: 8px;
    color: #2e2f32;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .product-page__badges {
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
  }

  .badge {
    background-color: #2a508f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    display: flex;
    height: 24px;
    min-width: 24px;
    padding: 0 8px;
    align-items: center;
    justify-content: center;
    letter-spacing: .02rem;
    color: #fff;
    border-radius: 4px;
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
    font-size: .875rem;
  }

  .product-page__variants {
		display: grid;
		gap: 16px;
	}

  .product-page__action {
    padding-top: 2.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }

  .product-page:has(.product-page__limited-quantity) .product-page__action  {
    padding-top: 0;
  }

  .product-page__limited-quantity {
    padding-top: 2.5rem;
  }

  .product-page__pay-later {
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: .875rem;
    line-height: 1.2;
    gap: 4px;
  }

  .paylater-text {
    text-wrap: nowrap
  }

  .product-page__details {
    display: grid;
    gap: .5rem;
    margin-top: 2.5rem;
  }

  .product-page__restrictions {
    margin-top: 2.5rem;
  }

  @media(max-width: 560px) {
    .product-page-container {
      grid-template-columns: none;
    }

    .product-page__gallery {
      position: relative;
      top: initial;
    }

    .product-page__pay-later {
      font-size: .75rem;
    }
  }

  @media(max-width: 320px) {
    .icon {
      height: 16px;
    }
  }
</style>