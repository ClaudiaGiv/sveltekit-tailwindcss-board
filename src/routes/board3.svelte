<script>
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');

	let columnItems = [
		{
			_id: 1,
			name: 'TODO',
			items: {
				data: [
					{ _id: 44, name: 'item44' },
					{ _id: 45, name: 'item45' },
					{ _id: 46, name: 'item46' },
					{ _id: 47, name: 'item47' },
					{ _id: 48, name: 'item48' },
					{ _id: 49, name: 'item49' }
				]
			}
		},
		{
			_id: 2,
			name: 'DOING',
			items: {
				data: [
					{ _id: 41, name: 'item41' },
					{ _id: 42, name: 'item42' }
				]
			}
		},
		{
			_id: 3,
			name: 'DONE',
			items: {
				data: [{ _id: 43, name: 'item43' }]
			}
		}
	];
	console.log('column.items.data');
	console.log(columnItems[1].items.data);
	console.log(JSON.stringify(columnItems[0].items));
	const flipDurationMs = 200;

	function handleDndConsiderColumns(e) {
		console.log('handleDndConsiderCards');
		// console.log(e);
		columnItems = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		console.log('handleDndFinalizeColumns');
		// console.log(e);
		columnItems = e.detail.items;
	}

	function handleDndConsiderCards(cid, e) {
		console.log('handleDndConsiderCards');
		// console.log(e);
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		columnItems[colIdx].items.data = e.detail.items;
		// columnItems = [...columnItems];
	}

	function handleDndFinalizeCards(cid, e) {
		console.log('handleDndFinalizeCards');
		// console.log(e);
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		columnItems[colIdx].items.data = e.detail.items;
		console.log(columnItems[0].items);
		console.log(columnItems[1].items);
		console.log(columnItems[1].items);
		// columnItems = [...columnItems];
	}

	function handleClick(e) {
		console.log('dragabble elements are still clickable :)');
		console.log(columnItems[0].items);
		console.log(columnItems[1].items);
		console.log(columnItems[1].items.data);
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
			<div class="column-title">{column.name}</div>
			<div
				class="column-content"
				use:dndzone={{ items: column.items.data, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column._id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column._id, e)}
			>
				{#each column.items.data as item (item._id)}
					<div class="card" animate:flip={{ duration: flipDurationMs }} on:click={handleClick}>
						{item.name}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style scoped>
	.board {
		height: 90vh;
		width: 100%;
		padding: 0.5em;
		margin-bottom: 40px;
	}

	.column {
		height: 100%;
		width: 250px;
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
		width: 100%;
		margin: 0.4em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dddddd;
		border: 1px solid #333333;
	}
</style>
