<script lang="ts">
  export let label = "";
  export let availability: number = 3;
  export let availabilityData = [
    { text: "In Stock", color: "#0a8a00" },
    { text: "Low Stock", color: "#ffa524" },
    { text: "Out of Stock", color: "#e00751" },
    { text: "Unavailable", color: "#8c8c8c" }
  ];

  $: status = availabilityData[availability];
</script>

<div class="status" role="status" aria-label="{label} {status.text}">
  <svg
    class="icon"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="4"
      fill={availability === 1 ? "url(#low-stock-gradient)" : status.color}
      stroke={status.color}
      stroke-width="2"
    />
		{#if availability == 1}
      <linearGradient id="low-stock-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="50%" stop-color="transparent" />
        <stop offset="50%" stop-color={status.color} />
      </linearGradient>
    {/if}
  </svg>
  <div class="status__label">
		{label}
	  <span class="status__availability-text">{status.text}</span>
	</div>
</div>

<style>
  .status {
    display: flex;
    font-size: 0.75rem;
    line-height: 1;
    align-items: center;
    gap: .25rem;
  }

  .status__label {
    font-weight: 500;
  }

  @media (prefers-reduced-motion: no-preference) {
    .icon circle {
      transition: fill 0.3s ease, stroke 0.3s ease;
    }
  }
</style>