<script>
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');
	import board from '../stores/board';
	const flipDurationMs = 200;
	let columnItems = $board.columns.data;
	console.log(columnItems)
	function handleDndConsiderColumns(e) {
		columnItems = e.detail.items;
	}
	function handleDndFinalizeColumns(e) {
		columnItems = e.detail.items;
	}
	function handleDndConsiderCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		columnItems[colIdx].cards.data = e.detail.items;
		// columnItems = [...columnItems];
	}
	function handleDndFinalizeCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		columnItems[colIdx].cards.data = e.detail.items;
		console.log(columnItems[1].cards.data);
		// columnItems = [...columnItems];
	}
	function handleClick(e) {
		alert('dragabble elements are still clickable :)');
	}
</script>

<section
	class="board"
	use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each columnItems as column (column._id)}
		<div class="column" animate:flip={{ duration: flipDurationMs }}>
			<div class="column-title">{column.title}</div>
			<div
				class="column-content"
				use:dndzone={{ items: column.cards.data, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column._id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column._id, e)}
			>
				{#each column.cards.data as item (item._id)}
					<div class="card" animate:flip={{ duration: flipDurationMs }} on:click={handleClick}>
						{item.title}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.board {
		height: 90vh;
		width: 100%;
		padding: 0.5em;
		margin-bottom: 40px;
	}
	.column {
		height: 100%;
		width: 350px;
		padding: 0.5em;
		margin: 1em;
		float: left;
		border: 1px solid #333333;
		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
		overflow-y: hidden;
	}
	.column-content {
		height: 100%;
		/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
		overflow-y: scroll;
	}
	.column-title {
		margin-bottom: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		height: 15%;
		width: 90%;
		margin: 0.4em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dddddd;
		border: 1px solid #333333;
	}
</style>
