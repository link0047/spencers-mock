<script>
	import { beforeUpdate } from "svelte";
	export let count = 0;
	export let limit = 5;
	export let index = 0;
	let activeDotPosition = 0;
	const realCount = count;
	let layoutState = 0;
	
	function positionDots(dotSizes) {

		const spacing = 8; // Spacing between dots
    const totalDotSizes = dotSizes.reduce((acc, size) => acc + size, 0); // Total size of all dots
    const totalSpacing = (count - 1) * spacing; // Total spacing between dots
    const totalWidth = totalDotSizes + totalSpacing; // Total width of all dots and spacing
    const startX = (132 - totalWidth) / 2; // Start X position to center dots
    let xPos = startX;

    return dotSizes.map((size, index) => {
      const dot = {
        type: `#circle${size}`, // Assuming your circle IDs are dynamic based on size
        x: xPos
      };
      xPos += size + spacing;
      return dot;
    });
  }

	function calculateLayout() {
		if (count <= limit) {
			const dotsArr = Array.from({ length: count }, (_, index) => 4);
			return positionDots(dotsArr);
		} else {
			return positionDots([4,4,4,2,1])
		}
	}

	function prev() {
		if (index > 0) {
			index -= 1;
		}	
		
		if (count > limit) {
			if (index === 1 && layoutState === 2) {
				dots = positionDots([2, 4, 4, 4, 2, 1]);
				layoutState = 1;
				activeDotPosition = 1;
				return;
			}
			
			if (layoutState === 2 && activeDotPosition === 2) {
				activeDotPosition = 2;
				return;
			}

			if (layoutState === 3 && activeDotPosition === 2)  {
				layoutState = 2;
				dots = positionDots([1, 2, 4, 4, 4, 2, 1]);
				return;
			}

			if (layoutState === 4 && activeDotPosition === 2)  {
				layoutState = 3;
				dots = positionDots([1, 2, 4, 4, 4, 2]);
				return;
			}
			
			if (index > 0) activeDotPosition -= 1;
			if (index === 0) {
				layoutState = 0;
			  dots = positionDots([4, 4, 4, 2, 1]);
				activeDotPosition = 0;
			}
		}
	}
	
	function next() {
		if (index < realCount) {
			index += 1;
		}
		
		if (count > limit) {
			activeDotPosition += 1;
			if (index === realCount) {
				layoutState = 4;
				dots = positionDots([1, 2, 4, 4, 4]);
				activeDotPosition = 4;
			} else if (index === realCount - 1) {
				layoutState = 3;
				dots = positionDots([1, 2, 4, 4, 4, 2]);
				activeDotPosition = 4;
			}else if (index > 4) {
				activeDotPosition = 4;
			} else if (index === 3) {
				layoutState = 1;
				dots = positionDots([2, 4, 4, 4, 2, 1]);
			} else if (index === 4) {
				layoutState = 2;
				dots = positionDots([1, 2, 4, 4, 4, 2, 1]);
			} 
		}
	}

	beforeUpdate(() => {
		activeDotPosition = index;
		dots = calculateLayout();
	});

	let dots = calculateLayout() || [];
</script>

<svg class="indicator" viewBox="0 0 132 16">
  <!-- Define circle sizes -->
  <defs>
		<circle id="circle0" cx="0" cy="0" r="0" />
    <circle id="circle1" cx="0" cy="0" r="1" />
    <circle id="circle2" cx="0" cy="0" r="2" />
    <circle id="circle4" cx="0" cy="0" r="2.5" />
  </defs>


	{#each dots as {x, type}, idx}
		<use class:active={idx === activeDotPosition} xlink:href={type} {x} y="8"/>
	{/each}
</svg>

<style>
	.indicator {
		width: 240px;
	}

	.indicator use:not(.active) {
		opacity: .2;
	}

	.active {
		fill: #0570de;
	}
</style>