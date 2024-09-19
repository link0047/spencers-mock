<script lang="ts">
	export let gap: number = 0;
	export let color: string = "#a8a8ae";
	export let width: string = "100%";
	export let orientation: "horizontal" | "vertical" = "horizontal";

	function getInlineStyles(): string | null {
    const styles: string[] = [];

    if (gap !== 0) styles.push(`--uikit-separator-gap:${gap / 16}rem;`);
    if (color !== "#a8a8ae") styles.push(`--uikit-separator-color:${color};`);
    if (width !== "100%") styles.push(`--uikit-separator-width:${width};`);

    return styles.length > 0 ? styles.join('') : null;
  }

  const inlineStyles = getInlineStyles();
</script>

<hr 
	aria-orientation={orientation} 
	class="separator"
	class:separator--vertical={orientation === "vertical"}
	style={inlineStyles} 
/>

<style>
	:root {
		--uikit-separator-width: 100%;
		--uikit-separator-color: #a8a8ae;
		--uikit-separator-gap: 0;
		--uikit-separator-thickness: .0625rem;
	}

	.separator {
		border: none;
		margin: var(--uikit-separator-gap, 0) 0;
		height: var(--uikit-separator-thickness);
		background-color: var(--uikit-separator-color);
		width: var(--uikit-separator-width);
	}

	.separator--vertical {
		height: 100%;
		width: var(--uikit-separator-thickness);
		margin: 0 var(--uikit-separator-gap);
	}
</style>