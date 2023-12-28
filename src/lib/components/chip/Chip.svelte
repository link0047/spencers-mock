<script>
  export let variant = 'filled';
  export let size = 'medium';
  export let onDelete = null;
  export let rounded = false;
  export let label = ''; 

  const btnLabel = `Remove${(label) ? ` ${label}` : ''}`;
</script>
<div 
  class="chip"
  class:chip--hasRemoveBtn={ onDelete }
  class:chip--sizeSmall={ size == 'small' }
  class:chip--outlined={ variant == 'outlined' }
  class:chip--rounded={ rounded }
  role="row"
  {...$$restProps}
>
  {#if $$slots.avatar}
    <div role="gridcell">
      <slot name="avatar"></slot>
    </div>
  {/if}
  <div role="gridcell">
    <slot />
  </div>
  {#if onDelete}
    <div role="gridcell">
      <button class="chip__close" type="button" tabindex="-1" aria-label={btnLabel} on:click={onDelete}>
        <svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
        </svg>
      </button>
    </div>
  {/if}
</div>
<style>
.chip {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 0.8125rem;
  color: #000000de;
  font-weight: 500;
  letter-spacing: .0178571429em;
  height: 32px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  outline: none;
  padding: 4px;
  border-radius: 4px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  appearance: none;
  cursor: pointer;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip:focus,
.chip:hover {
  border-color: #000;
  box-shadow: inset 0 0 0 1px #000;
}

[role="gridcell"] {
  display: flex;
}

.chip--outlined {
  border: 1px solid #ccc;
}

.chip--sizeSmall {
  height: 24px;
  font-size: 12px;
}

.chip--rounded {
  padding: 0 16px;
  border-radius: 16px;
}

.chip--sizeSmall.chip--rounded {
  padding: 0 8px;
  border-radius: 12px;
}

.chip.chip--hasRemoveBtn {
  padding: 0 24px 0 8px
}

.chip__close {
  position: absolute;
  right: 0;
  top: 0;
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  outline: 0;
  background-color: transparent;
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
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon {
  width: 24px;
  height: 24px;
  fill: #212121;
}

.chip--sizeSmall .chip__close {
  width: 24px;
  height: 24px;
}

.chip--sizeSmall .icon {
  width: 18px;
}
</style>