<script lang="ts">
	export let variant: string = "";
  export let tableData: string[][] = [];

	if (!Array.isArray(tableData) || tableData.length === 0 || !tableData.every(Array.isArray)) {
		throw new Error("Table data must be a non-empty array of arrays.");
	}
</script>
<table 
	class="table"
	class:table--bordered={variant === "bordered"}
>
	<thead class="table__header">
		<tr class="align-center">
			{#each tableData[0] as column}
				<th>{column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each tableData.slice(1) as row}
			<tr class="align-center">
				{#each row as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table {
		box-sizing: border-box;
		width: 100%;
		max-width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
		background-color: transparent;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	
	.table > tbody > tr > td,
	.table > thead > tr > th {
		padding: 2px;
		line-height: 1.4;
		vertical-align: top;
		border-top: 1px solid #ddd
	}
	
	.table > tbody > tr:nth-of-type(odd) {
		background-color: #f9f9f9
	}
	
	.table--bordered,
	.table--bordered > tbody > tr > td {
		box-sizing: border-box;
		border: 1px solid #ddd
	}
	
	.table__header {
		font-weight: 500;
		background-color: #e9e9e9
	}
	
	.align-center {
		text-align: center!important
	}
</style>