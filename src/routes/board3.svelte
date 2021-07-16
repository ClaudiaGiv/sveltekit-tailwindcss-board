<script>
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';

	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');
	import Card from '$lib/Card/index.svelte';
	import CardUpdateDialog from '$lib/card-update-dialog.svelte';
	import board from '../stores/board';
	let editableCard ={title: "", description: ""}

	let i = 1;
	let showModal1 = false;

	$: columnItems = $board.columns.data;
	const flipDurationMs = 200;

	function handleDndConsiderColumns(e) {
		columnItems = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		columnItems = e.detail.items;
	}

	function handleDndConsiderCards(cid, e) {
		console.log('handleDndConsiderCards');
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		const cardIdx = columnItems[colIdx].cards.data.findIndex(
			(c) => c._id === e.detail.items[0]._id
		);
	}

	function handleDndFinalizeCards(cid, e) {
		console.log('handleDndFinalizeCards');
		const colIdx = columnItems.findIndex((c) => c._id === cid);
		const cardIdx = columnItems[colIdx].cards.data.findIndex(
			(c) => c._id === e.detail.items[0]._id
		);
		columnItems[colIdx].cards.data = e.detail.items;
	}

	function handleClick(columnIndex, cid) {
		console.log('dragabble elements are still clickable :)');
		editableCard = columnItems[columnIndex].cards.data.find((c) => c._id === cid);
		console.log(editableCard);

		showModal1 = !showModal1;
		console.log(showModal1);

	}

	async function createCard() {
		console.log(columnItems[0].cards.data);
		console.log('create card');
		let card = {
			title: 'Card ' + i++,
			description: 'card1',
			weight: 1,
			columnId: '293327431558758913'
		};
		const res = await fetch('api/card', {
			method: 'POST',
			body: JSON.stringify(card)
		});
		if (res.ok) {
			const json = await res.json();
			board.addCard(json);
		} else {
			console.log(res.error());
		}
		// columnItems[0].cards.data.push(json.data.createCard)
		console.log(columnItems);
		columnItems[0].cards.data = [...columnItems[0].cards.data, card];
		console.log('$board.columns.data[0].cards.data');
		console.log($board.columns.data[0].cards.data);
		console.log(columnItems[0].cards.data);
	}

	async function removeCard(columnIndex, cid) {
		const res = await fetch('api/card', {
			method: 'DELETE',
			body: JSON.stringify({ id: cid })
		});
		if (res.ok) {
			const json = await res.json();
			const cardIndex = columnItems[columnIndex].cards.data.findIndex((c) => c._id === cid);
			board.removeCard(columnIndex, cardIndex);
		} else {
			console.log(res.error());
		}
		console.log($board.columns.data[0].cards.data);
	}
</script>

<CardUpdateDialog {showModal1} {editableCard}/>
<div
	class="flex justify-center p-1 board my-1"
	use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each columnItems as column, columnIndex}
		<div class="bg-gray-100 rounded-lg p-1 mx-1 rounded column">
			<p class="text-gray-700 font-semibold font-sans tracking-wide p-1 text-sm">
				{column.title}
			</p>
			<!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
			<div
				class="column-content py-1"
				use:dndzone={{ items: column.cards.data, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column._id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column._id, e)}
			>
				{#each column.cards.data as card (card._id)}
					<div class="card" animate:flip={{ duration: flipDurationMs }} on:click={() => handleClick(columnIndex,card._id)}>
						<Card {card} on:remove-card={() => removeCard(columnIndex, card._id)} />
					</div>
				{/each}
				{#if columnIndex === 0}
					<div class="flex justify-end">
						<button
							on:click={createCard}
							class="flex items-center mt-1 mx-1 px-4 py-2 font-medium text-sm text-white bg-gray-800 rounded-md hover:bg-gray-700"
						>
							<svg
								class="h-5 w-5"
								viewbox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 4v16m8-8H4"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span>Add card</span>
						</button>
					</div>
				{/if}
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
