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

<div>
	<div class="flex justify-center board">
		<div
			class="flex overflow-x-scroll py-12 px-6 board"
			use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
			on:consider={handleDndConsiderColumns}
			on:finalize={handleDndFinalizeColumns}
		>
			{#each columnItems as column (column._id)}
				<div
					class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
					animate:flip={{ duration: flipDurationMs }}
				>
					<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{column.name}</p>
					<!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
					<div
						use:dndzone={{ items: column.items.data, flipDurationMs }}
						on:consider={(e) => handleDndConsiderCards(column._id, e)}
						on:finalize={(e) => handleDndFinalizeCards(column._id, e)}
					>
						{#each column.items.data as item (item._id)}
							<Card card={item} class=/>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style scoped>
    .board {
        height: 90vh;
        width: 100%;
        padding: 0.5em;
        margin-bottom: 40px;
    }
    .column-width {
        min-width: 320px;
        width: 320px;
    }
    /* Unfortunately @apply cannot be setup in codesandbox,
		but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
    .ghost-card {
        opacity: 0.5;
        background: #F7FAFC;
        border: 1px solid #4299e1;
    }
</style>
