<script>
  import TextField from "$lib/components/textfield";
</script>

<div class="page">
  <section>
    <header>
      <h2>Payment</h2>
      <p>All transaction are secure and encrypted</p>
    </header>
    <header class="subdued-interactive-background" />
    <div class="payment">
      <div style="grid-area:cc">
        <TextField label="Card Number" />
      </div>
      <div style="grid-area:cn">
        <TextField label="Name on Card" />
      </div>
      <TextField label="Expiration date (MM/YY)" />
      <TextField label="Security code" />
    </div>
  </section>
</div>
<svg
  class="icon"
  viewBox="0 0 24 24"
  focusable="false"
  aria-label="More Information"
>
  <path
    d="M18.6 20.9H5.4c-.7 0-1.2-.5-1.2-1.2v-8c0-.7.5-1.2 1.2-1.2h.9c.1-3.8 2.1-7.4 5.7-7.4s5.6 3.6 5.7 7.3h.9c.7 0 1.2.5 1.2 1.2v8c0 .7-.5 1.3-1.2 1.3zM5.4 11.5c-.1 0-.2.1-.2.2v8c0 .1.1.2.2.2h13.3c.1 0 .2-.1.2-.2v-8c0-.1-.1-.2-.2-.2H5.4zm1.9-1h9.5C16.6 7.2 15 4.1 12 4.1s-4.6 3.1-4.7 6.4z"
  />
</svg>

<style>
  .subdued-interactive-background {
    background-color: #f0f5ff;
    border: 1px solid #1773b0;
    min-height: 40px;
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: #212121;
  }

  .page {
    padding: 16px;
  }

  .payment {
    width: 100%;
    max-width: 560px;
    padding: 16px;
    display: grid;
    border: 1px solid #dedede;
    background-color: #f5f5f5;
    border-radius: 12px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "cc cc"
      "cn cn"
      "ed sc";
    gap: 16px;
  }
</style>
