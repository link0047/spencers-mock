<script lang="ts">
	export let href: string | null = null;
	export let current: boolean = false;

	let tag = current ? "div" : "a";
	if (current) {
    console.warn("Breadcrumb item marked as current. Using <div> instead of <a>.");
    href = null;
  }
</script>

<li class="breadcrumbs__crumb">
	<svelte:element 
		this={tag}
		class="breadcrumbs__link"
		href={current ? null : href}
		aria-current={current ? "page" : null}
		role={null}
		tabindex={null}
		on:focus
		on:blur
		on:click
		{...$$restProps}
	>
		<slot />
	</svelte:element>
</li>

<style>
	:root {
		--uikit-breadcrumb-text-color: #212121;
		--uikit-breadcrumb-link-color: #6f6f6f;
    --uikit-breadcrumb-hover-color: #285bc7;
    --uikit-breadcrumb-separator-color: #6f6f6f;
    --uikit-breadcrumb-font-size: .875rem;
	}
	
	.breadcrumbs__crumb {
		display: flex;
		flex-flow: row nowrap;
    font-size: var(--uikit-breadcrumb-font-size);
    color: var(--uikit-breadcrumb-text-color);
    text-transform: capitalize;
		text-wrap: nowrap;
		white-space: nowrap;
	}

	.breadcrumbs__crumb:not(:last-child):after {
    content: "/";
    margin: 0 8px;
		color: var(--uikit-breadcrumb-separator-color);
	}

	.breadcrumbs__link {
		border-radius: 4px;
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}

	.breadcrumbs__link, .breadcrumbs__link:visited {
		color: var(--uikit-breadcrumb-link-color);
	}

	.breadcrumbs__link:not([aria-current=page]):hover {
    color: var(--uikit-breadcrumb-hover-color);
    text-decoration: underline;
	}

	.breadcrumbs__link:not([aria-current=page]):focus-visible {
    outline: 2px solid var(--uikit-breadcrumb-hover-color);
    outline-offset: 2px;
  }

	[aria-current=page].breadcrumbs__link {
    color: var(--uikit-breadcrumb-text-color);
    cursor: default;
	}
</style>