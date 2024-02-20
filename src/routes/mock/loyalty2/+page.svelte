<script>
	import Textfield from "$lib/components/textfield";
	import Button from "$lib/components/button/Button-new.svelte";
  import { Select, SelectOption } from "$lib/components/select";
  import { Dialog, DialogDismiss, useDialogState } from "$lib/components/dialog";
  const statesAndProvinces = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
    // Canadian provinces
    { code: "AB", name: "Alberta" },
    { code: "BC", name: "British Columbia" },
    { code: "MB", name: "Manitoba" },
    { code: "NB", name: "New Brunswick" },
    { code: "NL", name: "Newfoundland and Labrador" },
    { code: "NS", name: "Nova Scotia" },
    { code: "ON", name: "Ontario" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Quebec" },
    { code: "SK", name: "Saskatchewan" },
    { code: "NT", name: "Northwest Territories" },
    { code: "NU", name: "Nunavut" },
    { code: "YT", name: "Yukon" }
  ];

  function handleBlur() {
    $dialogState.open = true;
  }

  const dialogState = useDialogState();
</script>
<div class="page page--form">

  <form>
    <div class="form__header">
      <h2>Payment</h2>
    </div>
    <Textfield variant="float-above" label="First name" autocomplete="shipping given-name" autocorrect="off" type="text" required />
    <Textfield variant="float-above" label="Last name" autocomplete="shipping family-name" autocorrect="off" type="text" required />
    <Textfield variant="float-above" label="Email" on:blur={handleBlur} autocomplete="shipping email" autocorrect="off" spellcheck="false" type="text" required />
    <Textfield variant="float-above" label="Phone" autocomplete="shipping tel" autocorrect="off" type="tel" required />
    <Textfield variant="float-above" label="Company Name (optional)" autocomplete="shipping organization" autocorrect="off" type="text" required />
    <Textfield variant="float-above" label="Address" autocomplete="shipping address-line1" autocorrect="off" type="text" required />
    <Textfield variant="float-above" label="Address-line 2 (optional)" autocomplete="shipping address-line2" autocorrect="off" type="text" required />
    <Textfield variant="float-above" label="Apartment, suite, etc. (optional)" autocomplete="shipping address-line3" autocorrect="off" type="text" required />
    <div class="cityStateZIP">
      <Textfield variant="float-above" label="ZIP code" autocomplete="shipping postal-code" autocorrect="off" type="text" required />
      <Textfield variant="float-above" label="City" autocomplete="shipping address-level2" autocorrect="off" type="text" required />
      <Select autocomplete="shipping address-level1" autocorrect="off" type="text" required>
        {#each statesAndProvinces as { code, name }}
          <SelectOption value={code}>{name}</SelectOption>
        {/each}
      </Select>
    </div>
    <div class="form__actions">
      <Button variant="primary">
        Continue to Shipping
      </Button>
    </div>
  </form>
</div>

<Dialog state={dialogState} style="max-width: 360px">
  <DialogDismiss />
  <div class="form">
    <Textfield variant="float-above" label="Email" on:blur={handleBlur} autocomplete="email" autocorrect="off" spellcheck="false" type="text" required />
    <Textfield variant="float-above" label="Password" on:blur={handleBlur} autocomplete="password" autocorrect="off" spellcheck="false" type="text" required />
    <Button variant="primary">

    </Button>
  </div>
</Dialog>

<style>
  :global(body) {
    background-color: #f7f7f7;
  }

  .form {
    display: grid;
    gap: .75rem;
  }

  form {
		display: grid;
		gap: .75rem;
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
      "header header"
      "firstname lastname" 
      "email email"
      "phone phone"
      "company company"
			"address address"
      "address2 address2"
			"aptsuite aptsuite"
			"citystatezip citystatezip"
      ". action";
		max-width: 600px;
		/* border: 1px solid #949499; */
		border-radius: 8px;
    overflow: hidden;
		padding: 1rem;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 2px 8px, rgba(0, 0, 0, 0.06) 0px 4px 10px, rgba(0, 0, 0, 0.04) 0px 6px 12px;
	}

  form > :global(:nth-child(1)) {
		grid-area: header;
	}

  form > :global(:nth-child(2)) {
		grid-area: firstname;
	}

	form > :global(:nth-child(3)) {
		grid-area: lastname;
	}

	form > :global(:nth-child(4)) {
		grid-area: email;
	}

	form > :global(:nth-child(5)) {
		grid-area: phone;
	}
	
	form > :global(:nth-child(6)) {
		grid-area: company;
	}

  form > :global(:nth-child(7)) {
		grid-area: address;
	}

  form > :global(:nth-child(8)) {
		grid-area: address2;
	}

  form > :global(:nth-child(9)) {
		grid-area: aptsuite;
	}

  .cityStateZIP {
    grid-area: citystatezip;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: .75rem;
  }

  .form__actions {
    grid-area: action;
    display: flex;
    justify-content: end;
  }

  .page {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    direction: ltr;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-feature-settings: "liga","kern";
    font-size: 1pc;
    font-synthesis: none;
    font-weight: 400;
    line-height: 1.4em;
    margin: 0 auto;
    max-width: 75pc;
    text-rendering: auto;
    unicode-bidi: embed;
    width: 100%;
  }

  .page--form {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }

  .form__header {
    border-bottom: 1px solid #d6d6d6;
    height: 48px;
    align-items: center;
    display: flex;
  }

  h2 {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
  }
</style>