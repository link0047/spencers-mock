<script>
  export let disabled = false;
  export let variant = undefined;
</script>
<button 
  type="button" 
  aria-disabled={disabled}
	{disabled}
  class="pagination__control"
  class:pagination__prev={ variant == "prev" }
  class:pagination__next={ variant == "next" }
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:blur
  on:focus
>
  <svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
    {#if variant == "prev"}
    <path d="M17.3 22c.5 0 .9-.4.9-.8 0-.2-.1-.4-.2-.6L8.1 12l9.8-8.6c.3-.4.2-.9-.2-1.2-.3-.2-.7-.2-1 0L6.2 11.4c-.4.3-.4.8-.1 1.2 0 0 0 .1.1.1l10.5 9.2c.1.1.3.1.6.1z"/>
    {:else if variant == "next"}
    <path d="M6.7 22c-.5 0-.9-.4-.9-.8 0-.2.1-.4.2-.6l9.8-8.6-9.7-8.7c-.2-.3-.2-.9.2-1.1.3-.2.7-.2 1 0l10.5 9.2c.4.3.4.8.1 1.2 0 0 0 .1-.1.1L7.4 21.8c-.2.2-.4.2-.7.2z"/>
    {/if}
  </svg>
</button>
<style>
	.icon {
		width: 24px;
		height: 24px;
	}
	
  .pagination__prev {
    grid-area: prev;
  }

  .pagination__next {
    grid-area: next;
  }

  .pagination__control {
    -webkit-tap-highlight-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 48px;
    width: 48px;
    padding: 0;
    border: none;
    border-radius: 50%;
    outline: 0;
    background-color: #fff;
    overflow: hidden;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    transition: box-shadow .15s cubic-bezier(.22,.61,.36,1), background-color .35s cubic-bezier(.22,.61,.36,1);
    box-shadow: inset 0 0 0 1px #ccc;
  }

  .pagination__control:hover,
  .pagination__control:focus {
    box-shadow: inset 0 0 0 2px #2451b2;
    background-color: #E9EDF7;
  }

  .pagination__control:hover :global(.icon) {
    fill: #15306a;
    transition: fill .25s cubic-bezier(.22,.61,.36,1);
  }

  @media (max-width:560px) {
    .pagination__control {
      height: 40px;
      width: 40px;
    }
  }
</style>