<script lang="ts">
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

  let sizeGroupValue = "";
  let name = "Pink Gloomy Bear Hoodie"
  let colors = ["Pink"];
  let sizes = ["S", "M", "L", "XL", "2X"];
  let price = 54.99;
  const images = [{
		src: {
      desktop: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--IpxXvxyE--/c_scale,w_640/v1709237144/jx6nbjhprv6pduzvzedb.webp",
      mobile: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--b7FnYPyM--/c_scale,w_320/v1709237144/jx6nbjhprv6pduzvzedb.webp"
    },
		thumbnail: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--nTMya-gn--/c_scale,w_60/v1709237144/jx6nbjhprv6pduzvzedb.webp",
		detailedSrc: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--5JvW6DEy--/v1709237144/jx6nbjhprv6pduzvzedb.webp",
    alt: `${name}, Front View`
	},{
		src: {
      desktop: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--QJ1U01I7--/c_scale,h_640/v1709237142/cs9wnfguogzx48wsgnqh.webp",
      mobile: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--DgmzEDXo--/c_scale,w_320/v1709237142/cs9wnfguogzx48wsgnqh.webp"
    },
		thumbnail: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--2go8J7O_--/c_scale,h_60,w_60/v1709237142/cs9wnfguogzx48wsgnqh.webp",
		detailedSrc: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--qA93iX2F--/c_scale,h_2000/v1709237142/cs9wnfguogzx48wsgnqh.webp",
    alt: `${name}, Back View`
	}, {
		src: {
      desktop: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--gQA7zTKW--/c_scale,h_640/v1709237145/ui91s88zyfrwg6cbxfdy.webp",
      mobile: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--Fei-sa9A--/c_scale,w_320/v1709237145/ui91s88zyfrwg6cbxfdy.webp"
    },
		thumbnail: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--VX72t8q2--/c_scale,h_60/v1709237145/ui91s88zyfrwg6cbxfdy.webp",
		detailedSrc: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--tX3fShB6--/v1709237145/ui91s88zyfrwg6cbxfdy.webp",
    alt: `${name}, Detail of Sleeve`
	}];
  const breadcrumbs = [{
    href: "/",
    text: "Home",
    current: false
  },{
    href: "/category/pop-culture/4655.uts",
    text: "Pop Culture",
    current: false
  },{
    href: "/category/anime/pc/4655/2507.uts",
    text: "Anime",
    current: false
  },{
    href: "/category/gloomy-bear/pc/4655/c/2507/5500.uts",
    text: "Gloomy Bear",
    current: false
  },{
    href: null,
    text: name,
    current: true
  }];

  let payLaterPrice = divideByFourAndRound(price);

  function getDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = dayNames[deliveryDate.getDay()];
    const monthAbbrev = monthNames[deliveryDate.getMonth()];
    const dayOfMonth = deliveryDate.getDate();
  
    return `Get it by ${dayName}, ${monthAbbrev} ${dayOfMonth}`;
  }

  function divideByFourAndRound(price: number) {
    // Convert price to a whole number by multiplying by 100
    const wholeNumber = Math.round(price * 100);
    
    // Divide the whole number by 4
    const result = Math.floor(wholeNumber / 4);
    const decimal = result / 100;
    // Return the result
    return decimal;
  }

  export let data;
  let { isMobile } = data;

  $: if (sizeGroupValue === "2X") {
    price = 59.99;
  } else {
    price = 54.99;
  }
</script>

<svelte:head>
  <title>Product Demo</title>
  <meta name="description" content="Product page redesign"/>
</svelte:head>

<Page>
  <div class="product-page-container">
    <ProductGallery {images} {isMobile}/>
    <div class="product-page">
      <Breadcrumb>
        {#each breadcrumbs as { href, current, text}}
          <Crumb {href} {current}>{text}</Crumb>
        {/each}
      </Breadcrumb>
      <h1 class="product-page__name">{name}</h1>
      <div class="product-page__rating">
        <StarRating />
        <span>No Ratings</span>
      </div>
      <div class="product-page__price">
        <span class="salePrice"></span>
        <span class="basePrice">{price}</span>
      </div>
      <hr />
      <div class="product-page__variants" role="group">
        <VariantSelector label="Color">
          {#each colors as color, index}
            <Swatch color={color} name="color" value={color} checked={index === 0} />
          {/each}
        </VariantSelector>
        <VariantSelector label="Size" bind:groupValue={sizeGroupValue}>
          {#each sizes as size}
            <Radio variant="box" name="size" value={size} checked={size === "M"}>{size}</Radio>
          {/each}
        </VariantSelector>
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
      <div class="product-page__action">
        <InputStepper/>
        <Button variant="success">Add to Cart</Button>
      </div>
      <div class="product-page__pay-later">or 4 interest-free payments of ${payLaterPrice} with </div>
      <div class="product-page__details">
        <Accordion>
          <svelte:fragment slot="label">Description</svelte:fragment>
          <p>Cozy up with your favorite pop culture character with this pink Gloomy Bear hoodie! This cozy hoodie is perfect for indoors or outdoors and is sure to let everyone know you're a Gloomy Bear fan.</p>
          <ul class="list">
            <li>Officially licensed</li>
            <li>Exclusively at Spencer's</li>
            <li>Crewneck</li>
            <li>Long sleeves</li>
            <li>Material: Cotton</li>
            <li>Care: Machine wash; tumble dry low</li>
            <li>Imported</li>
            <li>This shirt is Unisex Sizing only</li>
            <li>For a fitted look, order one size smaller than your normal size</li>
          </ul>
        </Accordion>
        <Accordion>
          <svelte:fragment slot="label">Size Chart</svelte:fragment>
        </Accordion>
        <Accordion>
          <svelte:fragment slot="label">Shipping & Returns</svelte:fragment>
        </Accordion>
      </div>
    </div>
  </div>
</Page>

<style>
  .list {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
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

  .product-page-container {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: minmax(auto, 710px) 1fr;
    padding: 1rem 0;
  }

  .product-page {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    gap: 8px;
    color: #2e2f32;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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

  .product-page__pay-later {
    font-size: .875rem;
    text-align: center;
    line-height: 1.2;
  }

  .product-page__details {
    display: grid;
    gap: .5rem;
    padding-top: 2.5rem;
  }

  @media(max-width:560px) {
    .product-page-container {
      grid-template-columns: none;
    }
  }
</style>