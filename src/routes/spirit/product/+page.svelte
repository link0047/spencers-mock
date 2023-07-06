<script>
  import { Select, SelectOption } from "$lib/components/select";
  import {
    ShippingFulfillmentGroup,
    ShippingFulfillmentOption,
  } from "$lib/components/shippingfulfillment";
  import Icon from "$lib/components/icon";
  import Button from "$lib/components/button";
  import InputStepper from "$lib/components/inputstepper";

  const fullfilment = {
    heading: "Default state (size/color not selected)",
    shiptome: {
      disabled: false,
      isLoading: false,
      noSizeSelected: true,
      desc: "Select Size/Color",
    },
    pickupinstore: {
      disabled: false,
      isLoading: false,
      noSizeSelected: true,
      desc: "Select Size/Color for availability",
    },
  };

  const productData = {
    name: "Forest In Utero Nirvana T Shirt",
    thumbnails: [
      "//spencers.scene7.com/is/image/Spencers/03123486-a?$Alternate$",
      "//spencers.scene7.com/is/image/Spencers/03123486-b?$Alternate$",
      "//spencers.scene7.com/is/image/Spencers/03123486-c?$Alternate$",
      "//spencers.scene7.com/is/image/Spencers/03123486-d?$Alternate$",
    ],
    baseImage: "//spencers.scene7.com/is/image/Spencers/03123486-a?$Detail$",
  };
  const thumbnailCount = productData.thumbnails.length;
</script>

<svelte:head>
  <title>{productData.name} - Spencer's</title>
  <meta name="description" content={productData.name} />
</svelte:head>

<div class="product-page">
  <div class="product-page__gallery">
    <div class="product-page__thumbnails">
      {#each productData.thumbnails as thumbnail, i}
        <button
          class="product-page__thumbnail-action"
          type="button"
          aria-label="View {productData.name}, {i +
            1} of {thumbnailCount} slides, selected"
        >
          <picture class="product-page__thumbnail">
            <img
              class="image"
              src={thumbnail}
              width="84"
              height="105"
              decoding="async"
              alt="{productData.name}, {i + 1} of {thumbnailCount} slides"
            />
          </picture>
        </button>
      {/each}
    </div>
    <picture>
      <img
        class="image"
        src={productData.baseImage}
        width="465"
        height="581"
        decoding="async"
        alt={productData.name}
      />
    </picture>
  </div>
  <div class="product-page__controls">
    <h1 class="product-title">{productData.name}</h1>
    <div />
    <div class="font-16"><span class="bold">Color:</span> BLACK</div>
    <Select>
      <svelte:fragment slot="label">
        <span class="font-16 bold">Size:</span>
        <div class="sizechart-action">
          <svg
            focusable="false"
            role="presentation"
            class="icon"
            viewBox="0 0 24 24"
          >
            <path
              d="M1.39,18.36L3.16,16.6L4.58,18L5.64,16.95L4.22,15.54L5.64,14.12L8.11,16.6L9.17,15.54L6.7,13.06L8.11,11.65L9.53,13.06L10.59,12L9.17,10.59L10.59,9.17L13.06,11.65L14.12,10.59L11.65,8.11L13.06,6.7L14.47,8.11L15.54,7.05L14.12,5.64L15.54,4.22L18,6.7L19.07,5.64L16.6,3.16L18.36,1.39L22.61,5.64L5.64,22.61L1.39,18.36Z"
            />
          </svg>

          <Button size="xs">Size Chart</Button>
        </div>
      </svelte:fragment>
      <SelectOption value="small">Small</SelectOption>
      <SelectOption value="medium">Medium</SelectOption>
      <SelectOption value="large">Large</SelectOption>
      <SelectOption value="xl">XL</SelectOption>
      <SelectOption value="2x">2X</SelectOption>
    </Select>
    <ShippingFulfillmentGroup>
      <ShippingFulfillmentOption
        noSizeSelected={fullfilment.shiptome.noSizeSelected}
        disabled={fullfilment.shiptome.disabled}
        isLoading={fullfilment.shiptome.isLoading}
      >
        <svelte:fragment slot="heading">
          <Icon>
            <path
              d="M2.4 9.1v.8c0 1.1.7 2.1 1.7 2.6v8.4c0 1 .8 1.7 1.7 1.7h12.5c1 0 1.7-.8 1.7-1.7v-8.4c1.3-.5 2-1.5 2-2.7V9l-1.9-7.2-.1-.2H4.5m10.1 12.6H9.3l-.3.3v7H5.9c-.4 0-.6-.3-.6-.6v-8.1c1 0 1.8-.5 2.4-1.2.5.7 1.4 1.2 2.3 1.2.9 0 1.8-.5 2.3-1.2.5.8 1.4 1.2 2.3 1.2.9 0 1.8-.4 2.3-1.2.5.7 1.3 1.2 2.2 1.2V21c0 .4-.3.6-.6.6h-3.6v-7l-.3-.4zm-1.8-5.7V2.7h2.6l.8 5.8h-3.4zm0 1.3v-.2h3.5v.2c0 1-.8 1.7-1.7 1.7s-1.8-.7-1.8-1.7zm4.5-1.3-.8-5.8h2.7l1.5 5.8h-3.4zm-9.1 0 .6-5.8h2.8v5.8H8.2zm0 1.3v-.2h3.5v.2c0 1-.8 1.7-1.7 1.7-1 0-1.8-.7-1.8-1.7zM3.8 8.5l1.4-5.8h2.6l-.7 5.8H3.8zm-.3.8H7v.6c0 1-.8 1.7-1.7 1.7s-1.7-.8-1.7-1.7v-.6zm13.9.5v-.2h3.5v.2c0 1-.8 1.7-1.7 1.7s-1.8-.7-1.8-1.7zm-7.3 11.7v-6.2h3.6v6.2h-3.6z"
            />
          </Icon>
          <span>Ship to me</span>
        </svelte:fragment>
        <svelte:fragment slot="description"
          >{fullfilment.shiptome.desc}</svelte:fragment
        >
      </ShippingFulfillmentOption>
      <ShippingFulfillmentOption
        noSizeSelected={fullfilment.pickupinstore.noSizeSelected}
        disabled={fullfilment.pickupinstore.disabled}
        isLoading={fullfilment.pickupinstore.isLoading}
      >
        <svelte:fragment slot="heading">
          <Icon>
            <path
              d="M.9 5.7h4.3v.9H.9zM5 7.9h3.4v.9H5zM1.6 9.8h9.8v.9H1.6zM5.7 12.1h5.9v.9H5.7zM2.3 12.8h3v.9h-3zM1 15.1h2.7v.9H1z"
            />
            <path
              d="m23 10.8-3.1-1.4.4-2.7c0-.3 0-.6-.2-.8-.2-.2-.4-.3-.7-.3H5.8v.9H16L15.5 9c-.1.3 0 .5.2.8.2.2.4.3.7.3l3-.1 3.2 1.5-1.4 3.5h-2c-.1-.4-.2-.7-.5-1-.3-.4-.8-.5-1.3-.5-.9 0-1.9.6-2.5 1.5h-3.8c0-.4-.2-.8-.4-1.1-.3-.4-.8-.6-1.4-.6-1 0-2 .7-2.6 1.7H4.6v.9h1.8c-.1.6 0 1.3.3 1.7.3.4.9.7 1.4.7 1.2 0 2.5-1 2.8-2.3v-.1h3.6c-.2.7-.1 1.4.3 1.9.3.4.9.7 1.4.7 1.2 0 2.5-1 2.8-2.3 0-.1 0-.2.1-.2H21c.4 0 .7-.2.9-.6l1.4-3.5c.2-.4.1-.9-.3-1.1zm-6.7-1.5.6-2.7h2.5v.1L19 9.2l-2.7.1v.3-.3zm1.1 5.2c.3 0 .6.1.7.3.1.2.2.4.2.7v.1c0 .1 0 .2-.1.3-.2.9-1.1 1.7-2 1.7-.3 0-.6-.1-.7-.3-.2-.3-.3-.7-.1-1.1.3-.9 1.2-1.7 2-1.7zm-7.2 1.3c-.2.9-1.1 1.7-2 1.7-.3 0-.6-.1-.7-.3-.2-.3-.3-.7-.1-1.1.2-.9 1.1-1.7 2-1.7.3 0 .6.1.7.3.1.2.2.4.2.7v.1l-.1.3z"
            />
          </Icon>
          <span>Pick up in store</span>
        </svelte:fragment>
        <svelte:fragment slot="description">
          {#if fullfilment.pickupinstore.isLoading}
            <svg
              class="icon animate-spin"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
            </svg>
          {/if}
          {@html fullfilment.pickupinstore.desc}
        </svelte:fragment>
      </ShippingFulfillmentOption>
    </ShippingFulfillmentGroup>
    <div class="quanity-atc-container">
      <InputStepper />
      <Button variant="success">Add to Cart</Button>
    </div>
  </div>
</div>

<style>
  .bold {
    font-weight: 700;
  }

  .font-16 {
    font-size: 1rem;
  }

  .product-page {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    padding: 8px;
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 456px;
  }

  .product-title {
    margin: 0;
    letter-spacing: 0.03rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 24px;
    font-weight: 400;
    line-height: 1.2;
  }

  .product-page__gallery {
    display: grid;
    grid-template-columns: 84px 1fr;
    gap: 16px;
  }

  .product-page__thumbnails {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
  }

  .product-page__thumbnail-action {
    display: flex;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
    margin: 0;
    border-radius: 4px;
    outline: 0;
    background-color: transparent;
    overflow: hidden;
    touch-action: manipulation;
    user-select: none;
    appearance: none;
    height: 104px;
  }

  .product-page__controls {
    display: flex;
    flex-flow: column;
    gap: 8px;
  }

  .image {
    width: 100%;
    height: auto;
    display: block;
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: #212121;
  }

  .sizechart-action {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 8px;
    padding-inline-start: 32px;
  }

  .quanity-atc-container {
    margin-top: 24px;
    display: grid;
    grid-template-columns: fit-content(112px) 1fr;
    gap: 16px;
  }
</style>
