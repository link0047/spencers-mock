<script lang="ts">
	import generateId from "$lib/client/util/local-unique-id-generator";
	
	// Props
	export let rating: number = 0;
	export let maxRating: number = 5;

	// Constants
	const uid: number = generateId("star-rating");
	const id: string = `uikit-starrating-${uid}`;
	const titleId: string = `${id}-title`;
	const descId: string = `${id}-desc`;
	const createStarIndices = ((validatedRating: number, maxRating: number): number[] => 
	  Array.from({ length: maxRating }, (_, i) => i)
	);
	
	// Reactive declarations
	$: validatedRating = validateRating(rating, maxRating);
	$: integerPart = Math.floor(validatedRating);
	$: decimalPart = validatedRating - integerPart;
	// Calculate gradient percentage for partial stars:
	// Multiply by 10 and round to nearest 10 to simplify gradient steps
	// (e.g., 0.3 becomes 30%, 0.8 becomes 80%)
	$: gradient = Math.round(decimalPart * 10) * 10;
	$: starIndices = createStarIndices(validatedRating, maxRating);
	$: viewBoxWidth = 24 * maxRating;

	/**
	 * Validates and clamps the rating value between 0 and maxRating.
	 * @param {number} value - The rating value to validate.
	 * @param {number} max - The maximum allowed rating.
	 * @returns {number} - The validated rating value.
	 */
	function validateRating(value: number, max: number): number {
		const validatedValue: number = Math.max(0, Math.min(value, max));
		if (validatedValue !== value) {
			console.error(`Invalid rating. Value clamped to ${validatedValue}.`);
		}
		
		return validatedValue;
	}
	
	/**
	 * Determines the fill color or gradient for a star based on its index and the current rating.
	 * @param {number} index - The index of the star (0-based).
	 * @returns {string} - The fill value for the star's SVG path.
	 */
	function getStarFill(index: number): string {
		if (index + 1 === Math.ceil(validatedRating) && decimalPart > 0) {
			return `url("#${id}-star-${gradient}")`;
		}
		
		return validatedRating < index + 1 ? "transparent" : "currentColor";
	}

	/**
	 * Generates a description for the current rating.
	 * @returns {string} - A detailed description of the rating.
	 */
	function getRatingDescription(): string {
		const fullStars: number = Math.floor(validatedRating);
		const partialStar: boolean = validatedRating % 1 !== 0;
		const emptyStars: number = maxRating - Math.ceil(validatedRating);
		return `${fullStars} full star${fullStars !== 1 ? "s" : ""}${partialStar ? ", 1 partial star" : ""}${emptyStars > 0 ? `, ${emptyStars} empty star${emptyStars !== 1 ? "s" : ""}` : ""} out of ${maxRating} total stars.`;
	}
</script>

<svg 
	class="uikit-starrating"
	role="img" 
	viewBox="0 0 {viewBoxWidth} 24"
	aria-labelledby="{titleId} {descId}"
>
	<title id={titleId}>Rating: {validatedRating} out of {maxRating}</title>
	<desc id={descId}>{getRatingDescription()}</desc>
	<defs>
		<linearGradient id="{id}-star-{gradient}">
			<stop offset={`${gradient}%`} stop-color="currentColor" />
			<stop offset={`${gradient}%`} stop-color="transparent" />
			<stop offset={`${100 - gradient}%`} stop-color="transparent" />
		</linearGradient>
	</defs>
	{#each starIndices as index}
		<g>
			<path class="star-outline" d="M{12 + 24 * index},15.9l-3.8,2.3l1-4.3L{5.9 + 24 * index},11l4.4-0.4l1.7-4l1.7,4l4.4,0.4l-3.3,2.9l1,4.3 M{22 + 24 * index},9.7l-7.2-0.6L{12 + 24 * index},2.5L{9.2 + 24 * index},9.1L{2 + 24 * index},9.7l5.4,4.7l-1.6,7l6.2-3.7l6.2,3.7l-1.6-7L{22 + 24 * index},9.7z" />
			<path fill={getStarFill(index)} d="M{12 + 24 * index},17.8l6.2,3.7l-1.6-7L{22 + 24 * index},9.7l-7.2-0.6L{12 + 24 * index},2.5L{9.2 + 24 * index},9.1L{2 + 24 * index},9.7l5.4,4.7l-1.6,7L{12 + 24 * index},17.8z" />
		</g>
	{/each}
</svg>

<style>
	:root {
		--uikit-starrating-size: 1.5rem;
		--uikit-starrating-fill-color: #212121;
		--uikit-starrating-stroke-color: #888;
	}
	
	.uikit-starrating {
		height: var(--uikit-starrating-size, 1.5rem);
		color: var(--uikit-starrating-fill-color, gold);
	}
	
	.uikit-starrating .star-outline {
		fill: var(--uikit-starrating-stroke-color, #ccc);
	}
</style>