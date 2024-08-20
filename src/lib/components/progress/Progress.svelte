<script>
	export let value = 0;
	export let min = 0;
	export let max = 100;
	export let rounded = true;
	export let color = "currentColor";

	$: scaleXValue = value / max;
</script>

<div 
	class="progress"
	class:progress--rounded={rounded}
	aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
	role="meter"
	aria-valuetext={`Progress: ${value} out of ${max}`}
	aria-live="polite"
	{...$$restProps}
>
	<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="progress__bar" width="100%" height="100%">
		<rect style="transform:scaleX({scaleXValue})" x="0" y="0" width="100%" height="100%" fill={color} />
	</svg>
</div>

<style>
	:root {
		--progress-height: .5rem;
		--progress-bg-color: #0003;
		--progress-max-width: 22.5rem;
		--progress-transition-duration: 0.25s;
		--progress-transition-timing: cubic-bezier(.65, 0, .35, 1);
	}

	.progress {
		position: relative;
		height: var(--progress-height);
		overflow: hidden;
		width: 100%;
		min-width: 16rem;
		max-width: var(--progress-max-width);
		background-color: var(--progress-bg-color);
	}

	.progress--rounded {
		border-radius: 99999px;
	}

	.progress__bar {
		position: absolute;
	}

	.progress__bar rect {
		transform-origin: 0 0;
		transition-duration: var(--progress-transition-duration);
		transition-timing-function: var(--progress-transition-timing);
	}
</style>