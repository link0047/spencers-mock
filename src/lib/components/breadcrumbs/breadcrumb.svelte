<script lang="ts">
	export let label: string = "Breadcrumbs";
	export let scrollable: boolean = false;
</script>

<nav 
	aria-label={label} 
	class="breadcrumbs"
	class:breadcrumbs--scrollable={scrollable}
>
	<ol class="breadcrumbs__list">
		<slot />
	</ol>
</nav>

<style>
	.breadcrumbs {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-weight: 400;
    line-height: 1.4rem;
    direction: ltr;
    background-color: transparent;
    unicode-bidi: embed;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-synthesis: none;
    font-feature-settings: "liga", "kern";
	}

	.breadcrumbs--scrollable {
		overflow-x: scroll;
		overflow-y: hidden;
	}

	.breadcrumbs__list {
		list-style: none;
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    padding: 0;
	}

	.breadcrumbs--scrollable .breadcrumbs__list {
		flex-flow: row nowrap;
	}
</style>