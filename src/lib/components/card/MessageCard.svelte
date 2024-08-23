<div class="message-card">
	<header class="message-card__heading">
		<slot name="heading" />
	</header>
	<div class="message-card__message">
		<slot />
	</div>
	<div class="message-card__action">
		<slot name="action" />
	</div>
</div>

<style>
	.message-card {
		display: grid;
		grid-template-areas: 
			"heading action"
			"message action";
		grid-template-columns: 1fr fit-content(2.5rem);
	}
	
	.message-card__heading {
		grid-area: heading;
		display: flex;
		gap: .25rem;
		align-items: center;
    font-size: .875rem;
		font-weight: 700;
		color: #212121;
	}
	
	.message-card__message {
		grid-area: message;
		display: flex;
		align-items: center;
		flex-flow: row;
		font-size: .875rem;
		color: #555;
	}

	.message-card__action {
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: action;
	}
</style>