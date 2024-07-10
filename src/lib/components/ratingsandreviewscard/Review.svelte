<script>
	import Icon from "$lib/components/icon";
	import StarRating from "$lib/components/starrating";
	import Button from "$lib/components/button/Button-new.svelte";
	import { submitVote,formatTimeDifference } from "$lib/client/util/utilities";
	
  export let data;
	
	$: ({
		details: { 
			comments, 
			created_date, 
			headline, 
			nickname, 
			bottom_line 
		},
		badges: {
			is_verified_buyer,
		},
		metrics: {
			rating,
			helpful_votes,
			not_helpful_votes
		}, 
		ugc_id,
	} = data);

	$: votes = helpful_votes - not_helpful_votes;

	async function handleUpDownVote(event) {
		if (event.target.dataset.state === "selected") {
			votes += 1;
			const data = await submitVote(ugc_id, "helpful");
			if (data.status_code !== 200) {
				votes -= 1;
			}
		} else {
			votes -= 1;
			const data = await submitVote(ugc_id, "unhelpful");
		}
	}
</script>
<div class="review">
	<div class="review__rating">
		<StarRating {rating} />
	</div>
	<div class="review__verified-buyer">{is_verified_buyer ? "Verified Buyer" : ""}</div>
	<div class="review__timestamp">{formatTimeDifference(created_date)}</div>
	<h3 class="review__headline">{headline}</h3>
	<div class="review__comment">{comments}</div>
	<div class="review__recommendation-status">
		{#if bottom_line === "Yes"}
			<div class="review__recommended">
				<Icon>
					<use href="#recommended-check" />
				</Icon>
				Recommended
			</div>
		{/if}
	</div>
	<div class="review__nickname">
		<Icon style="fill:none;stroke-width:1.5;color:#000">
			<path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
			<path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
			<path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</Icon>
		{nickname}
	</div>
	<div class="review__actions">
		<Button variant="outlined" style="gap:8px" on:click={handleUpDownVote} canBeSelected>
			<Icon style="fill:none;stroke-width:1.5">
				<path d="M16.4724 20H4.1C3.76863 20 3.5 19.7314 3.5 19.4V9.6C3.5 9.26863 3.76863 9 4.1 9H6.86762C7.57015 9 8.22116 8.6314 8.5826 8.02899L11.293 3.51161C11.8779 2.53688 13.2554 2.44422 13.9655 3.33186C14.3002 3.75025 14.4081 4.30635 14.2541 4.81956L13.2317 8.22759C13.1162 8.61256 13.4045 9 13.8064 9H18.3815C19.7002 9 20.658 10.254 20.311 11.5262L18.4019 18.5262C18.1646 19.3964 17.3743 20 16.4724 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				<path d="M7 20L7 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</Icon>
			Helpful <span>{votes}</span>
		</Button>
	</div>
</div>

<style>
	.review {
		border-bottom: 1px solid #ccc;
		padding: 1.5rem 0;
		display: grid;
		grid-template-columns: 192px 1fr minmax(240px, auto);
		grid-template-areas: 
			"rating headline ."
			"verifiedBuyer comment actions"
			"timestamp comment actions"
			"recommendationStatus comment ."
			"nickname . .";
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	.review:last-of-type {
		border: none;
	}

	.review__headline {
		line-height: 1;
		margin: 0;
		font-size: 1rem;
		font-weight: 500;
		grid-area: headline;
		align-self: center;
	}

	.review__comment {
		grid-area: comment;
		font-size: .875rem;
		line-height: 1.7;
	}

	.review__rating {
		--ratings-height: 20px;
		grid-area: rating;
		align-self: center;
	}
	
	.review__verified-buyer {
		color: #2E7D32;
		font-size: .875rem;
		grid-area: verifiedBuyer;
	}

	.review__timestamp {
		font-size: .875rem;
		grid-area: timestamp;
	}

	.review__nickname {
		display: flex;
		font-size: .875rem;
		align-items: center;
		gap: 4px;
		padding-top: 1rem;
		grid-area: nickname;
	}

	.review__recommendation-status {
		display: flex;
		gap: .25rem;
		font-size: .875rem;
		grid-area: recommendationStatus;
	}

	.review__recommended {
		display: inline-flex;
		align-items: center;
		gap: .25rem;
		--icon-width: 14px;
		--icon-height: 14px;
		--icon-fill: #2E7D32;
	}

	.review__actions {
		grid-area: actions;
		justify-self: end;
	}

	@media (max-width: 800px) {
		.review {
			grid-template-columns: minmax(auto, 100px) minmax(80px, auto) 1fr;
			grid-template-areas:
				"rating verifiedBuyer timestamp"
				"headline headline headline"
				"comment comment comment"
				"recommendationStatus . ."
				"nickname nickname actions";
			column-gap: 8px;
		}
	}
	
	@media (max-width: 560px) {
		.review__nickname {
			padding-top: .5rem;
			--icon-width: 20px;
			--icon-height: 20px;
		}

		.review__headline {
			padding-top: .5rem;
			padding-bottom: .15rem;
		}

		.review__comment {
			padding-bottom: .5rem;
		}
		
		.review__timestamp {
			justify-self: end;
		}
	}
</style>