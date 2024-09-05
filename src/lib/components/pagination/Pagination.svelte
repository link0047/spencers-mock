<script lang="ts">
  import { createEventDispatcher } from "svelte";  
  import PaginationItem from "./PaginationItem.svelte";
  import PaginationControls from "./PaginationControls.svelte";

  // Props
  export let count: number = 1;
  export let displayCount: number = 7;
  export let page: number = 1;
  export let onPageChange: (page: number) => void;
  export let onNextClick: () => void = () => {};
  export let onPrevClick: () => void = () => {};
  export let onPageClick: (page: number) => void = () => {};

  // Local variables and types
  const dispatch = createEventDispatcher<{
    "uikit-pagination:pageClick": number;
    "uikit-pagination:nextClick": void;
    "uikit-pagination:prevClick": void;
  }>();

  const ELLIPSIS = "..." as const;
  type PaginationItem = number | typeof ELLIPSIS;

  const startEllipisBoundary = displayCount - 3;
  const endEllipisBoundary = count - 3;
  $: items = generateItems();

  // Event handlers
  function handleClick(clickedItem: PaginationItem) {
    if (typeof clickedItem === "number") {
      handleInternalChange(clickedItem);
      onPageClick(clickedItem);
      dispatch("uikit-pagination:pageClick", clickedItem);
    }
  }

  function next() {
    if (page >= count) return;
    updatePageAndDispatch(page + 1, "uikit-pagination:nextClick", onNextClick);
  }

  function prev() {
    if (page <= 1) return;
    updatePageAndDispatch(page - 1, "uikit-pagination:prevClick", onPrevClick);
  }

  // Helper functions
  function handleInternalChange(value: number) {
    page = value;
    onPageChange(value);
  }

  function updatePageAndDispatch(newPage: number, eventName: "uikit-pagination:nextClick" | "uikit-pagination:prevClick", callback: () => void) {
    page = newPage;
    onPageChange(page);
    callback();
    dispatch(eventName);
  }

  function generateItems(): PaginationItem[] {
    if (count <= displayCount) {
      return Array.from({length: count}, (_, i) => i + 1);
    }

    return Array.from({length: displayCount}, (_, i): PaginationItem => {
      if (i === 0) return 1;
      if (i === 1 && page > startEllipisBoundary) return ELLIPSIS;
      if (i === displayCount - 2 && page < endEllipisBoundary) return ELLIPSIS;
      if (i === displayCount - 1) return count;
      
      if (page > endEllipisBoundary) return endEllipisBoundary + (i - 3);
      if (page > startEllipisBoundary) return page + (i - 3);
      return i + 1;
    });
  }
</script>

<nav aria-labelledby="pagination-heading" class="pagination">
  <div aria-live="polite" role="status" class="pagination__status">
    <h2 class="a11y-hide" id="pagination-heading">Results Pagination - Page {page}</h2>
  </div>
  <PaginationControls variant="prev" on:click={prev} />
  <ol class="pagination__list">
    {#each items as item}
      <PaginationItem 
        on:click={() => handleClick(item)} 
        disabled={item == "..."} 
        current={item == page}
      >
        {item}
      </PaginationItem>
    {/each}
  </ol>
  <PaginationControls variant="next" on:click={next} />
</nav>

<style>
	.a11y-hide {
	  position: absolute !important;
	  width: 1px !important;
	  height: 1px !important;
	  padding: 0 !important;
	  margin: -1px !important;
	  overflow: hidden !important;
	  clip: rect(0, 0, 0, 0) !important;
	  border: 0 !important;
	}
	
  .pagination {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    grid-template-areas:
      "status status status"
      "prev list next";
    column-gap: 16px;
    line-height: 1;
    align-items: center;
    justify-content: center;
  }

  .pagination__status {
    grid-area: status;
  }

  .pagination__list {
    display: grid;
    grid-template-columns: repeat(7, minmax(40px, 1fr));
    grid-area: list;
		justify-content: center;
		list-style: none;
    padding: 0;
    margin: 0;
  }

  @media (max-width:560px) {
    .pagination {
      grid-template-columns: 40px 1fr 40px;
      gap: 8px;
    }

    .pagination__list {
      grid-template-columns: repeat(auto-fit, minmax(24px, 1fr));
    }
  }

</style>