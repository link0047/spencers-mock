<script lang="ts">
	export let rating: number = 0;

	const integerPart = Math.floor(rating);
  const decimalPart = rating - integerPart;
	const gradient = Math.round(decimalPart * 10) * 10;
	
  /**
	 * Calculate star classes based on the rating.
	 * @param {number} rating - The rating value.
	 * @returns {(string | null)[]} - An array of CSS class names for stars.
	 */
	function calculateStarClasses(rating: number): (string | null)[] {
    return [1, 2, 3, 4, 5].map(index => {
      if (index === Math.ceil(rating) && decimalPart > 0) {
        return `star-${gradient}`;
      }
      return rating < index ? "star-empty" : null;
    });
	}
	
	let starClasses: (string | null)[] = calculateStarClasses(rating);
</script>
<svg class="ratings" focusable="false" role="presentation" viewBox="0 0 120 24">
	<defs>
		<linearGradient id={`star-gradient-${gradient}`}>
			<stop offset={`${gradient}%`} stop-color="#000" />
			<stop offset={`${gradient}%`} stop-color="transparent" />
			<stop offset={`${100 - gradient}%`} stop-color="transparent" />
		</linearGradient>
	</defs>
	{#each [0, 1, 2, 3, 4] as index}
    <g>
      <path d="M{12 + 24 * index},15.9l-3.8,2.3l1-4.3L{5.9 + 24 * index},11l4.4-0.4l1.7-4l1.7,4l4.4,0.4l-3.3,2.9l1,4.3 M{22 + 24 * index},9.7l-7.2-0.6L{12 + 24 * index},2.5L{9.2 + 24 * index},9.1L{2 + 24 * index},9.7l5.4,4.7l-1.6,7l6.2-3.7l6.2,3.7l-1.6-7L{22 + 24 * index},9.7z"/>
      <path class="{starClasses[index]}" d="M{12 + 24 * index},17.8l6.2,3.7l-1.6-7L{22 + 24 * index},9.7l-7.2-0.6L{12 + 24 * index},2.5L{9.2 + 24 * index},9.1L{2 + 24 * index},9.7l5.4,4.7l-1.6,7L{12 + 24 * index},17.8z"/>
    </g>
  {/each}
</svg>

<style>
	:root {
		--ratings-height: 24px;	
	}
	
	.ratings {
		height: var(--ratings-height, 24px);
	}

	.ratings :global(.star-empty) {
		fill: none;
	}

	.ratings :global(.star-10) {
	  fill: url("#star-gradient-10");
	}
	
	.ratings :global(.star-20) {
	  fill: url("#star-gradient-20");
	}
	
	.ratings :global(.star-30) {
	  fill: url("#star-gradient-30");
	}

	.ratings :global(.star-40) {
	  fill: url("#star-gradient-40");
	}
	
	.ratings :global(.star-50) {
	  fill: url("#star-gradient-50");
	}
	
	.ratings :global(.star-60) {
	  fill: url("#star-gradient-60");
	}
	
	.ratings :global(.star-70) {
	  fill: url("#star-gradient-70");
	}
	
	.ratings :global(.star-80) {
	  fill: url("#star-gradient-80");
	}
	
	.ratings :global(.star-90) {
	  fill: url("#star-gradient-90");
	}
</style>