<script>
  import ImageViewer from "$lib/components/imageviewer";
</script>

<div role="dialog" class="lightbox" aria-modal="true">
	<ImageViewer 
		src="//spencers.scene7.com/is/image/Spencers/04425385-a?wid=640&hei=640&fmt=webp"
		detailedSrc="//spencers.scene7.com/is/image/Spencers/04425385-a?wid=2000&hei=2000&fmt=webp"
		enableDoubleTapZoom={false}
	/>
</div>

<style>
  .imageviewer {
		position: relative;
		min-width: 320px;
		width: fit-content;
		box-sizing: border-box;
		border: 1px solid #000;
		border-radius: 4px;
		overflow: hidden;
		touch-action: none;
		user-select: none;
	}

  .imageviewer__image {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1 / 1;
		cursor: zoom-in;
	}

	.lightbox {
		position: fixed;
    top: auto;
    left: 50%;
    bottom: 10vh;
    display: flex;
    flex-flow: column nowrap;
    height: fit-content;
    max-height: 80vh;
    transform: translate3d(-50%, 0, 0);
    width: calc(100vw - 1rem);
    max-width: 1400px;
    background-color: #fff;
    box-shadow: 0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3);
    overflow: hidden;
    transition: opacity .15s ease-in;
    z-index: 519;
    border-radius: 8px;
	}

	@media(max-width: 1024px) {
    .lightbox {
      width: 100vw;
      bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      max-height: 90vh;
      height: 90vh;
    }
  }
</style>