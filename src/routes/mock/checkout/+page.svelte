<script>
	import Textfield from "$lib/components/textfield";
	import Button from "$lib/components/button/Button-new.svelte";
	let cardName = "";
	let cardValue = "";
	let cardLen = null;
	let isActionShown = false;
	let isMasked = false;
	let storedCardNumber = null;
	
	function formatCreditCardNumber(cardNumber, format) {
    return cardNumber.replace(format, (...groups) => groups.slice(1, 4).filter(Boolean).join(" ")).trim();
	}
	
	function detectCreditCardType(cardNumber) {
    // Remove non-numeric characters from the card number
    const numericCardNumber = cardNumber.replace(/\D/g, "");
		const defaultFormat = /\d{4}(?=\d)/g;
    // Define card type detection patterns
    const cardTypes = [
			{ name: "Visa", format: defaultFormat, pattern: /^4/, length: [16, 13, 19], cvcLength: 3 },
			{ name: "MC", format: defaultFormat, pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/, length: [16], cvcLength: 3 },
			{ name: "AMEX", format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/, pattern: /^3[47]/, length: [15], cvcLength: 4 },
			{ name: "Disc", format: defaultFormat, pattern: /^(6011|65|64[4-9]|622)/, length: [16], cvcLength: 3 },
			{ name: "JCB", format: defaultFormat, pattern: /^35/, length: [16], cvcLength: 3 },
			{ name: "DC", format: defaultFormat, pattern: /^(36|38|30[0-5])/, length: [14], cvcLength: 3}
    ];

    // Check the card number against each pattern
    for (const cardType of cardTypes) {
			if (cardType.pattern.test(numericCardNumber)) {
				return { 
					name: cardType.name,
					formattedNumber: formatCreditCardNumber(numericCardNumber, cardType.format),
					len: cardType.length[0]
				};
			}
    }

    return "Other";
	}

	function handleInput({ target }) {
		if (isMasked && cardValue.length < cardLen) {
			cardValue = storedCardNumber.slice(0, cardValue.length);
			isMasked = false;
			isActionShown = false;
			storedCardNumber = null;
		}
		
		cardValue = cardValue.replace(/[^0-9 ]+/g, "");
		
		if (cardValue.length < 2) {
			cardName = "";	
			cardLen = null;
		}
		
		if (cardValue.length >= 2) {
			const cardType = detectCreditCardType(cardValue);
			console.log("Card type:", cardType);
			cardName = cardType.name;
			cardLen = cardType.len;
		}
		
		if (cardLen !== null && cardValue.length >= cardLen) {
			cardValue = cardValue.slice(0, cardLen);
		}
	}

	function handleBlur() {
		if (cardLen !== null && cardValue.length >= cardLen) {
			storedCardNumber = cardValue;
			cardValue = cardValue.replace(/.(?=.{4})/g, "*");
			isActionShown = true;
			isMasked = true;
		}
	}

	function handleActionClick() {
		if (isMasked && cardLen !== null && cardValue.length >= cardLen) {
				isMasked = false;
				cardValue = storedCardNumber;
		} else {
			isMasked = true;
			cardValue = cardValue.replace(/.(?=.{4})/g, "*");
		}
	}
</script>
<div class="page page--form">
  <form>
    <div class="form__header">
      <h2>Payment</h2>
      <p>All transactions are secure and encrypted.</p>
    </div>
    <Textfield variant="float-above" label="Card Name" autocomplete="cc-name" inputmode="text" type="text" required />
    <Textfield bind:value={cardValue} on:blur={handleBlur} on:input={handleInput} variant="float-above" label="Card Number" autocomplete="cc-number" inputmode="numeric" pattern="[0-9]*" type="text" required>
      <svelte:fragment slot="trailing">
        <div>{cardName}</div>
        {#if cardValue.length === cardLen && isActionShown}
        <Button on:click={handleActionClick} variant="ghost" style="--btn-color:#3367d6;--btn-hover-background-color:transparent;--btn-hover-border-color:transparent">
          {isMasked ? "Show" : "Hide"}
        </Button>
        {/if}
      </svelte:fragment>
    </Textfield>
    <Textfield variant="float-above" label="Expiration date" autocomplete="cc-exp" inputmode="numeric" pattern="[0-9]*" type="text" required />
    <Textfield variant="float-above" label="Security code" autocomplete="cc-csc" inputmode="numeric" pattern="[0-9]*" type="text" required />
  </form>
</div>
<style>
  :global(body) {
    background-color: #f7f7f7;
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
    height: 50vh;
  }

  .form__header {
    border-bottom: 1px solid #d6d6d6;
    height: 48px;
    align-items: center;
  }

  h2 {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
  }

  p {
    font-size: .75rem;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }

	form {
		display: grid;
		gap: .75rem;
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
      "header header" 
			"name name"
			"number number"
			"exp csc";
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
		grid-area: name;
	}

	form > :global(:nth-child(3)) {
		grid-area: number;
	}

	form > :global(:nth-child(4)) {
		grid-area: exp;
	}
	
	form > :global(:nth-child(5)) {
		grid-area: csc;
	}
</style>