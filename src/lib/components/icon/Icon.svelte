<script>
  export let viewBox = "0 0 24 24";
	export let ariaLabel = null;
	export let role = "presentation";
  export let size = "";
  export let variant = "";
	export let use = "";

	const validRoles = new Set(["img", "presentation"]);

	// Check if the provided role is valid
	if (!validRoles.has(role)) {
		console.warn(`Invalid role "${role}" provided. Defaulting to "presentation".`);
		role = "presentation";
	}
</script>

<svg
	aria-label={ariaLabel} 
	class="icon"
  class:icon--logo={variant === "logo"}
  class:icon--sm={size === "sm"} 
	focusable="false" 
	{role}
	viewBox={viewBox}
	{...$$restProps}
>
	{#if use.length}
		<use href="#{use}"/>
	{/if}
	<slot/>
</svg>

<style>
  :root {
		--icon-width: 24px;
		--icon-height: 24px;
		--icon-fill: currentcolor;
	}
	
	.icon {
		width: var(--icon-width, 24px);
		height: var(--icon-height, 24px);
		fill: var(--icon-fill, currentcolor);
	}

  .icon--sm {
    --icon-width: 16px;
    --icon-height: 16px;
  }

  .icon--logo {
    --icon-width: 72px;
    --icon-height: 32px;
    --icon-fill: #212121;
  }
</style>
