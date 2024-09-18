<script lang="ts">
	import { getIntersectionBoundingRects } from "$lib/client/util/utilities";
	import type { ActionReturn } from "svelte/action";

	// Types
	type RectMap = Map<HTMLElement, DOMRect>;

	// Props
	export let label: string = "Breadcrumbs";
	export let scrollable: boolean = false;
	export let checkToEllipse: boolean = false;
	export let lengthToEllipse: number = 420;

	// State
	let displayEllipse: boolean = false;
	let hiddenCrumbs: HTMLElement[] = [];
	let liveRegion: HTMLElement | null = null;

	// Constants
	const hasLiveRegion = checkToEllipse;
	const useEllipse = checkToEllipse ? ellipse : () => ({});
	const HIDDEN_CRUMBS_MESSAGE = "Some breadcrumbs are hidden. Use the ellipsis button to show them.";
  const SHOWN_CRUMBS_MESSAGE = "Hidden breadcrumbs are now visible";

	/**
   * Announces a change to screen readers using the live region
   * @param {string} message - The message to announce
   */
	 function announceChange(message: string): void {
		if (liveRegion) {
			liveRegion.textContent = message;
		}
	}

	/**
   * Shows previously hidden crumbs, focuses on the first one, and announces the change
   */
	function showEllipsedCrumbs(): void {
		displayEllipse = false;
		for (const crumb of hiddenCrumbs) {
			crumb.classList.remove("hide");
			crumb.removeAttribute("aria-hidden");
		}
		// Focus on the first previously hidden crumb for keyboard navigation
		hiddenCrumbs[0]?.focus();
		announceChange(SHOWN_CRUMBS_MESSAGE);
	}

	/**
   * Determines if ellipsis should be displayed based on cumulative width of crumbs
   * @param {Map<HTMLElement, DOMRect>} rects - Map of elements to their bounding rectangles
   * @returns {boolean} Whether to display ellipsis
   */
	function shouldDisplayEllipse(rects: RectMap): boolean {
		let crumbsTotalLength = 0;

		for (const [crumb, rect] of rects.entries()) {
		  crumbsTotalLength += rect.width;
			hiddenCrumbs.push(crumb);
			if (crumbsTotalLength >= lengthToEllipse) {
				// Keep the last two crumbs visible always
				// This ensures the user can always see their current location
				hiddenCrumbs.splice(-2);
				return true;
			}
		}

		// If we've gone through all crumbs and haven't exceeded the length,
		// no ellipsis is needed
		return false;
	}

	/**
	 * Custom error for breadcrumb-related issues
	 */
	class BreadcrumbError extends Error {
	  constructor(message: string) {
	    super(message);
	    this.name = "BreadcrumbError";
	  }
	}

	/**
   * Calculates and applies ellipsis to breadcrumbs if necessary
   * @param {HTMLElement} node - The breadcrumbs container node
   * @returns {Object} Svelte action object
   */
	async function ellipse(node: HTMLElement): Promise<ActionReturn> {
		try {
			// Get bounding rectangles for all child elements (breadcrumbs)
			const rects = await getIntersectionBoundingRects(node.children);

			if (!rects || rects.size === 0) {
	      throw new BreadcrumbError('Failed to get bounding rectangles for breadcrumbs');
	    }

			// Determine if ellipsis should be displayed
			displayEllipse = shouldDisplayEllipse(rects);
			
			if (displayEllipse) {
				if (hiddenCrumbs.length === 0) {
	        console.warn('No crumbs to hide despite ellipsis being necessary');
	      }
				// Hide necessary crumbs and set ARIA attributes
				for (const crumb of hiddenCrumbs) {
					crumb.classList.add("hide");
					crumb.setAttribute("aria-hidden", "true");
				}
				announceChange(HIDDEN_CRUMBS_MESSAGE);
			} 
		} catch (error) {
			if (error instanceof BreadcrumbError) {
	      console.error(`Breadcrumb error: ${error.message}`);
	    } else {
	      console.error('Unexpected error in ellipse calculation:', error);
	    }

			// Graceful degradation: show all crumbs if ellipsis calculation fails
			displayEllipse = false;
			for (const crumb of hiddenCrumbs) {
				crumb.classList.remove("hide");
				crumb.removeAttribute("aria-hidden");
			}
		} finally {
			// Reset the check flag regardless of the outcome to remove opacity
			checkToEllipse = false;
		}
		
		return {
			destroy() {}
		}
	}
</script>

<nav 
	aria-label={label} 
	class="breadcrumbs"
	class:breadcrumbs--scrollable={scrollable}
	class:breadcrumbs--checkToEllipse={checkToEllipse}
>
	<ol class="breadcrumbs__list" use:useEllipse>
		{#if displayEllipse}
			<li class="breadcrumbs__ellipse-crumb">
				<button 
					type="button" 
					class="breadcrumbs__action"
					aria-expanded={!displayEllipse}
					aria-label="Show hidden breadcrumbs"
					on:click={showEllipsedCrumbs}
				>
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<title>Ellipsis</title>
						<path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
					</svg>
				</button>
			</li>
		{/if}
		<slot />
	</ol>
</nav>
{#if hasLiveRegion}
	<div aria-live="polite" class="sr-only" bind:this={liveRegion}></div>
{/if}

<style>
	:root {
		--uikit-breadcrumbs-padding: 0;
		--uikit-breadcrumbs-margin: 0;
		--uikit-breadcrumbs-direction: ltr;
		--uikit-breadcrumb-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
		--uikit-breadcrumb-font-weight: 400;
    --uikit-breadcrumb-font-size: .875rem;
		--uikit-breadcrumb-line-height: 1.4;
		--uikit-breadcrumb-text-color: #212121;
		--uikit-breadcrumb-link-color: #6f6f6f;
		--uikit-breadcrumb-link-border-radius: .25rem;
    --uikit-breadcrumb-link-hover-color: #285bc7;
    --uikit-breadcrumb-separator-color: #6f6f6f;
		--uikit-breadcrumb-separator-margin: 0 0.5rem;
		--uikit-breadcrumb-ellipsis-size: 1.5rem;
		--uikit-breadcrumb-ellipsis-color: #38393b;
		--uikit-breadcrumb-ellipsis-background: transparent;
		--uikit-breadcrumb-ellipsis-border-radius:.25rem;
		--uikit-breadcrumb-focus-outline-width: .125rem;
	  --uikit-breadcrumb-focus-outline-offset: .125rem;
	}

	.sr-only {
	  position: absolute;
	  width: .0625rem;
	  height: .0625rem;
	  padding: 0;
	  margin: -.0625rem;
	  overflow: hidden;
	  clip: rect(0, 0, 0, 0);
	  white-space: nowrap;
	  border-width: 0;
	}

	.breadcrumbs__list :global(.hide) {
		display: none;
	}
	
	.breadcrumbs__ellipse-crumb {
		display: flex;
		flex-flow: row nowrap;
    font-size: var(--uikit-breadcrumb-font-size);
    color: var(--uikit-breadcrumb-text-color);
    text-transform: capitalize;
		text-wrap: nowrap;
		white-space: nowrap;
	}

	.breadcrumbs__ellipse-crumb:not(:last-child):after {
    content: "/";
    margin: var(--uikit-breadcrumb-separator-margin);
		color: var(--uikit-breadcrumb-separator-color);
	}
	
	.breadcrumbs__action {
		margin: 0;
		padding: 0;
		border: 0;
		color: var(--uikit-breadcrumb-ellipsis-color);
		width: var(--uikit-breadcrumb-ellipsis-size);
		height: var(--uikit-breadcrumb-ellipsis-size);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--uikit-breadcrumb-ellipsis-background);
		border-radius: var(--uikit-breadcrumb-ellipsis-border-radius);
		position: relative;
		touch-action: manipulation;
		user-select: none;
		appearance: none;
		cursor: pointer;
	}

	.breadcrumbs__action:focus-visible {
    outline: var(--uikit-breadcrumb-focus-outline-width) solid var(--uikit-breadcrumb-link-hover-color);
    outline-offset: var(--uikit-breadcrumb-focus-outline-offset);
  }

	.breadcrumbs__action .icon {
		fill: currentcolor;
		width: 1rem;
		height: 1rem;
	}
	
	.breadcrumbs {
    direction: var(--uikit-breadcrumbs-direction);
    background-color: transparent;
    unicode-bidi: embed;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-synthesis: none;
    font-feature-settings: "liga", "kern";
		padding: var(--uikit-breadcrumbs-padding);
		margin: var(--uikit-breadcrumbs-margin);
	}

	.breadcrumbs--checkToEllipse {
		opacity: 0;
	}

	.breadcrumbs--scrollable {
		overflow-x: auto;
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