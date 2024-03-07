<script>
let message = "";
function handlePointerUp(event) {
  message = `Up ${JSON.stringify(event)}`
}

function handlePointerMove(event) {
  message = `Move ${JSON.stringify(event)}`
}

function handlePointerDown(event) {
  message = `Down ${JSON.stringify(event)}`
}

const slides = [1,2,3,4,5,6,7,8,9,10]
</script>
{message}
<div
  class="carousel"
  on:pointerup={handlePointerUp}
  on:pointermove={handlePointerMove}
  on:pointerdown={handlePointerDown}
>
  <div class="carousel__viewport">
    <div class="carousel__track">
      {#each slides as slide}
        <div class="box"></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .carousel {
		position: relative;
	}
	
	.carousel__viewport {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.carousel__track {
		display: flex;
    gap: 8px;
		transition: transform .3s;
	}

  .box {
    width: 400px;
    height: 400px;
    border: 2px solid;
    border-radius: 8px;
  }
</style>