<script lang="ts">
	import Button from "$lib/components/button/Button-new.svelte";	
	import Icon from "$lib/components/icon";
	import { Collapsible } from "$lib/components/collapsible";
	import { AvailabilityStatus } from "$lib/components/availabilityStatus";
	import type { DayHours, Store } from "$lib/types/store";

	type SortWeekdaysOptions = {
		weekdaysArray: DayHours[];
		startDay?: string | number | null;
		dayKey?: keyof DayHours;
	};

	export let data: Store;
	
	const { storeName , addressLine2, city, state, zipcode, storeHours, activeFlag, latitude, longitude } = data;
	let storeHoursExpanded: boolean = false;
	let collapsibleId: string;

	/**
	 * Toggles the expansion of store hours
	 */
	function expandStoreHours(): void {
		storeHoursExpanded = !storeHoursExpanded;
	}

	/**
   * Parses a time string into a Date object
   * @param {string} timeStr - The time string to parse
   * @returns {Date} A Date object representing the parsed time
   */
	function parseTime(timeStr: string): Date {
    // Define regex patterns for different time formats
    const timePattern24 = /^(\d{2}):(\d{2}):(\d{2})$/;  // e.g., "10:00:00"
    const timePattern12 = /^(\d{1,2}):(\d{2})(am|pm)$/i;  // e.g., "10:10am"

    let match;

    // Get today's date
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if the time string matches 24-hour format
    if (match = timeStr.match(timePattern24)) {
			// Extract hours, minutes, and seconds
			const [, hours, minutes, seconds] = match;
			return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, seconds);
    }
    
    // Check if the time string matches 12-hour format
    if (match = timeStr.match(timePattern12)) {
			// Extract hours, minutes, and period (AM/PM)
			let [, hour, minute, period] = match;
			hour = parseInt(hour, 10);
			if (period.toLowerCase() === 'pm' && hour < 12) {
				hour += 12;
			}
			if (period.toLowerCase() === 'am' && hour === 12) {
				hour = 0;
			}
			if (period.toLowerCase() === 'pm' && hour === 12) {
				hour = 12;
			}
			return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
    }

    throw new Error(`Time string '${timeStr}' does not match any known format`);
	}

	/**
	 * Determines the current status of the store
	 * @param {DayHours} hours - The store hours for the current day
	 * @param {Date} [currentTime] - The current time (defaults to now)
	 * @returns {string} The status of the store (e.g., "Open until 9:00pm")
	 */
	function getStoreStatus(hours: DayHours, currentTime: Date = new Date()): string {
    const openTime = parseTime(hours.openTime);
    const closeTime = parseTime(hours.closeTime);
    // Adjust close time if it's on the next day
    if (closeTime <= openTime) {
			closeTime.setDate(closeTime.getDate() + 1);
    }

    if (currentTime < openTime) {
			return `Opens at ${convertToStandardTime(hours.openTime, false)}`;
    } else if (currentTime >= openTime && currentTime < closeTime) {
			return `Open until ${convertToStandardTime(hours.closeTime, false)}`;
    } else {
			return "Closed";
    }
	}

	function sortWeekdays({ weekdaysArray = [], startDay = null, dayKey = "dayName" }: SortWeekdaysOptions): DayHours[]  {
		if (weekdaysArray.length === 0) return [];
		
    if (!Array.isArray(weekdaysArray) || weekdaysArray.length !== 7) {
      throw new Error("Invalid weekdays array: must be an array of 7 elements");
    }

    let startIndex;
    
    if (startDay === null) {
      // If no start day is provided, use the current day
      startIndex = new Date().getDay();
    } else if (typeof startDay === "number") {
      // If a number is provided, use it as the index (with wrapping)
      startIndex = startDay % 7;
    } else if (typeof startDay === "string") {
      // If a string is provided, find its index in the weekdays array
      startIndex = weekdaysArray.findIndex(dayObj => dayObj[dayKey].toLowerCase() === startDay.toLowerCase());
      if (startIndex === -1) {
        throw new Error(`Invalid day: ${startDay}`);
      }
    } else {
      throw new Error("Invalid input: Please provide a day name, a number, or null for the current day");
    }

    // Create a new array starting from the determined index
    return [...weekdaysArray.slice(startIndex), ...weekdaysArray.slice(0, startIndex)];
	}

	/**
	 * Converts military time to standard time
	 * @param {string} militaryTime - The time in military format (HH:MM or HH:MM:SS)
	 * @param {boolean} [includeSeconds=true] - Whether to include seconds in the output
	 * @returns {string} The time in standard format (e.g., "9:00pm")
	 */
	function convertToStandardTime(militaryTime: string, includeSeconds: boolean = true): string {
    // Check if the input is in the correct format (HH:MM or HH:MM:SS)
    if (!/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/.test(militaryTime)) {
      throw new Error("Invalid time format. Please use HH:MM or HH:MM:SS format.");
    }

    const [hours, minutes, seconds] = militaryTime.split(":").map(Number);
    let period = "am";
    let standardHours = hours;

    if (hours === 0) {
			standardHours = 12;
    } else if (hours === 12) {
			period = "pm";
    } else if (hours > 12) {
			standardHours = hours - 12;
			period = "pm";
    }

    let timeString = `${standardHours}:${minutes.toString().padStart(2, "0")}`;
    if (includeSeconds && seconds !== undefined) {
			timeString += `:${seconds.toString().padStart(2, "0")}`;
    }
    
    return `${timeString}${period}`;
	}

	/**
	 * Converts degrees to radians
	 * @param {number} degrees - Angle in degrees
	 * @returns {number} Angle in radians
	 */
	function toRadians(degrees: number): number {
		return degrees * (Math.PI / 180);
	}
	
	/**
	 * Calculates the distance between two points on Earth
	 * @param {number} lat1 - Latitude of the first point
	 * @param {number} lon1 - Longitude of the first point
	 * @param {number} lat2 - Latitude of the second point
	 * @param {number} lon2 - Longitude of the second point
	 * @param {"km" | "mi"} [unit="km"] - The unit of distance (kilometers or miles)
	 * @returns {number} The distance between the two points
	 */
	function getDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: "km" | "mi" = "km"): number {
    const R = unit === 'mi' ? 3959 : 6371; // Earth's radius in miles or kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Number(distance.toFixed(2)); // Round to 2 decimal places
	}

	const latlng = {
		lat: 39.38696, 
		lng: -74.62402
	};

	const distance = getDistance(latlng.lat, latlng.lng, parseFloat(latitude), parseFloat(longitude), "mi");
	const hoursData = storeHours?.length ? sortWeekdays({ weekdaysArray: storeHours }) : [];
	const storeStatus = hoursData.length ? getStoreStatus(hoursData[0]) : "Store Closed";
</script>

<div class="store-card">
	<header class="store-card__heading">
		<div class="store-card__info">
			<h3 class="store-card__name">{storeName}</h3>
			<div class="store-card__distance"><slot name="store-distance" />{distance} miles</div>
		</div>
	</header>
	<div class="store-card__actions">
		{#if activeFlag === "Y"}
			<Button color="primary" size="sm" rounded>Pick up here</Button>
			<Button variant="ghost" size="sm" underline>Directions</Button>
		{/if}
	</div>
	<address class="store-card__address">
		<div class="store-card__address-line1">
			{addressLine2}
		</div>
		<div class="store-card__address-line2">{city}, {state} {zipcode}</div>
	</address>
	<AvailabilityStatus availability={activeFlag === "Y" ? 0 : 3} label="Pickup - " />
	<div class="store-card__hours-information">
		{#if activeFlag === "Y"}
			<Button 
				aria-controls={collapsibleId}
				aria-expanded={storeHoursExpanded}
				variant="ghost" 
				size="sm" 
				underline 
				on:click={expandStoreHours}
			>
				{storeStatus}
				<Icon>
					<title>chevron-down</title>
					<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
				</Icon>
			</Button>
			<Collapsible bind:id={collapsibleId} bind:open={storeHoursExpanded} hasExpandButton={false}>
				{#each hoursData as {dayName, openTime, closeTime}}
					<div class="store-hours">
						<div class="store-hours__weekday">{dayName}</div>
						<div class="store-hours__hours">{convertToStandardTime(openTime, false)} - {convertToStandardTime(closeTime, false)}</div>
					</div>
				{/each}
			</Collapsible>
		{:else}
			<span class="store-closed-text">Store Closed</span>
		{/if}
	</div>
</div>

<style>
	.store-closed-text {
		font-weight: 700;
		font-size: .75rem;
	}

	.store-hours {
		display: flex;
		flex-flow: row nowrap;
		font-size: .75rem;
		justify-content: space-between
	}

	.store-hours:first-child {
		font-weight: 700;
	}

	.store-hours__hours {
		font-variant-numeric: tabular-nums;
	}
	
	.store-card {
		display: grid;
		grid-template-columns: 1fr minmax(0, auto);
		grid-template-areas: 
			"header actions"
			"address actions"
			"status ."
			"hours .";
		gap: .25rem;
		color: #484848;
		--uikit-btn-font-size: .75rem;
	}
	
	.store-card__heading {
		display: grid;
		grid-template-columns: 1fr minmax(0, auto);
		justify-content: center;
		grid-area: header;
	}

	.store-card__actions {
		display: flex;
		flex-flow: column;
		gap: .5rem;
		grid-area: actions;
		align-self: start;
		--uikit-btn-padding-inline: .75rem;
	}
	
	.store-card__name {
		color: #212121;
		margin: 0;
		line-height: 1.2;
		font-size: 1rem;
	}

	.store-card__address {
		grid-area: address;
	}

	.store-card__address,
	.store-card__distance {
		font-size: .75rem;
		font-style: normal;
	}

	.store-card :global(.status) {
		grid-area: status;
	}
	
	.store-card__hours-information {
		grid-area: hours;
		--uikit-btn-padding-inline: 0;
		--uikit-btn-font-weight: 700;
	}
	.store-card__hours-information :global(.btn--round) {
		padding: 0 .75rem;
	}
</style>