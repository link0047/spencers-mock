<script>
  import {
    ShippingFulfillmentGroup,
    ShippingFulfillmentOption,
  } from "$lib/components/shippingfulfillment";
  import Icon from "$lib/components/icon";

  const examples = [
    {
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
    },
    {
      heading: "Loading State",
      shiptome: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
      pickupinstore: {
        disabled: false,
        isLoading: true,
        noSizeSelected: false,
        desc: "Checking Store Availability",
      },
    },
    {
      heading: "Default state (size/color selected)",
      shiptome: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
      pickupinstore: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
    },
    {
      heading: "Pick up in store Low inventory",
      shiptome: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
      pickupinstore: {
        disabled: false,
        isLoading: false,
        noSizeSelected: true,
        desc: `<span>Low Inventory&nbsp;–&nbsp;</span><span>Selling&nbsp;</span><span>Fast</span><svg style="width:24px;height:24px" role="presentation" viewBox="0 0 24 24"><path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.23.1-.47.04-.66-.12a.58.58 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5.14.6.41 1.2.71 1.73 1.08 1.73 2.95 2.97 4.96 3.22 2.14.27 4.43-.12 6.07-1.6 1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6-1.12.4-2.24-.16-2.9-.82 1.19-.28 1.9-1.16 2.11-2.05.17-.8-.15-1.46-.28-2.23-.12-.74-.1-1.37.17-2.06.19.38.39.76.63 1.06.77 1 1.98 1.44 2.24 2.8.04.14.06.28.06.43.03.82-.33 1.72-.93 2.27Z"/></svg>`,
      },
    },
    {
      heading: "Out of stock online but available for Pickup",
      shiptome: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Out to stock",
      },
      pickupinstore: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
    },
    {
      heading: "In-Store only",
      shiptome: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Not available",
      },
      pickupinstore: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
    },
    {
      heading: "Online only",
      shiptome: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
      pickupinstore: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Not Available",
      },
    },
    {
      heading: "Available online but out of stock in store",
      shiptome: {
        disabled: false,
        isLoading: false,
        noSizeSelected: false,
        desc: "In stock ready to ship",
      },
      pickupinstore: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Out of stock",
      },
    },
    {
      heading: "Out of stock for Ship to me and Pickup",
      shiptome: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Out of stock",
      },
      pickupinstore: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Out of stock",
      },
    },
    {
      heading: "Out of stock for Ship to me and Pickup",
      shiptome: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Not Available",
      },
      pickupinstore: {
        disabled: true,
        isLoading: false,
        noSizeSelected: false,
        desc: "Not Available",
      },
    },
  ];
</script>

<div class="mock-pdp-panel">
  <div class="examples-grid">
    {#each examples as example}
      <section class="example">
        <h3 class="example__heading">{example.heading}</h3>
        <ShippingFulfillmentGroup>
          <ShippingFulfillmentOption
            noSizeSelected={example.shiptome.noSizeSelected}
            disabled={example.shiptome.disabled}
            isLoading={example.shiptome.isLoading}
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
              >{example.shiptome.desc}</svelte:fragment
            >
          </ShippingFulfillmentOption>
          <ShippingFulfillmentOption
            noSizeSelected={example.pickupinstore.noSizeSelected}
            disabled={example.pickupinstore.disabled}
            isLoading={example.pickupinstore.isLoading}
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
              {#if example.pickupinstore.isLoading}
                <svg
                  class="icon animate-spin"
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
                </svg>
              {/if}
              {@html example.pickupinstore.desc}
            </svelte:fragment>
          </ShippingFulfillmentOption>
        </ShippingFulfillmentGroup>
      </section>
    {/each}
  </div>
</div>

<style>
  .mock-pdp-panel {
    width: 100%;
    max-width: 600px;
    padding: 16px 0;
  }

  .examples-grid {
    display: grid;
    gap: 40px;
  }

  .example {
    display: grid;
    gap: 8px;
  }

  .example__heading {
    margin: 0;
    line-height: 1;
  }

  @media (min-width: 561px) {
    .mock-pdp-panel {
      padding: 16px 8px;
    }
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: #000;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
