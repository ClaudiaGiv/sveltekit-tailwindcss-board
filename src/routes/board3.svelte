<script>
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');
	import Card from '$lib/Card/index.svelte';
	let card = {
		title: 'card1',
		date: '12.1.1'
	};
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

	const flipDurationMs = 200;

	function handleDndConsiderColumns(e) {
		columnItems = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		columnItems = e.detail.items;
	}

	function handleDndConsiderCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		columnItems[colIdx].items.data = e.detail.items;
		// columnItems = [...columnItems];
	}

	function handleDndFinalizeCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		columnItems[colIdx].items.data = e.detail.items;
		// columnItems = [...columnItems];
	}

	function handleClick(e) {
		console.log('dragabble elements are still clickable :)');
		console.log(columnItems[0].items);
		console.log(columnItems[1].items);
		console.log(columnItems[1].items.data);
	}
</script>

<div
	class="flex justify-center p-1 board my-1"
	use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each columnItems as column (column._id)}
		<div
			class="bg-gray-100 rounded-lg p-1 mx-1 rounded column"
			animate:flip={{ duration: flipDurationMs }}
		>
			<p class="text-gray-700 font-semibold font-sans tracking-wide p-1 text-sm">{column.name}</p>
			<!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
			<div
				class="column-content py-1"
				use:dndzone={{ items: column.items.data, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column._id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column._id, e)}
			>
				{#each column.items.data as item (item._id)}
					<Card card={item} class="" />
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	html,
	body,
	div {
		overflow-y: hidden;
	}
	.board {
		height: 85vh;
		width: 100%;
		overflow-y: hidden;
	}
	.column {
		height: 100%;
		width: 350px;
		float: left;
		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
		overflow-y: hidden;
	}
	.column-content {
		height: 100%;
		/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
		overflow-y: auto;
	}
</style>
