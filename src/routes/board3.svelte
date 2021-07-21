<script>
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	import combineQuery from 'graphql-combine-query';
	import { print } from 'graphql/language/printer';

	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');
	import Card from '$lib/Card/index.svelte';
	import CardDialog from '$lib/card-dialog.svelte';
	import board from '../stores/board';
	import {
		UPDATE_CARD_WEIGHT_AND_COLUMN_MUTATION,
		UPDATE_CARD_WEIGHT_MUTATION
	} from '../../graphql/card';

	let editableCard = { title: '', description: '', weight: 1 };
	let actionType = 'save';
	let editableCardColIdx = -1;
	let showModal1 = false;
	const flipDurationMs = 200;
	let cardsForUpdateByWeight = [];
	let fromColIdx = -1;
	let fromCardIdx = -1;
	let toColIdx = -1;
	let toCardIdx = -1;
	let finalized = 0;

	function handleDndConsiderColumns(e) {
		$board.columns.data = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		$board.columns.data = e.detail.items;
	}

	function handleDndConsiderCards(cid, e) {
		console.log('+++++++handleDndConsiderCards+++++++++');
		// console.log(e.detail);
		const colIdx = $board.columns.data.findIndex((c) => c._id === cid);
		const cardIdx = $board.columns.data[colIdx].cards.data.findIndex(
			(c) => c._id === e.detail.info.id
		);
		$board.columns.data[colIdx].cards.data = e.detail.items;

		fromColIdx = fromColIdx === -1 ? colIdx : fromColIdx;
		fromCardIdx = fromCardIdx === -1 ? cardIdx : fromCardIdx;

		console.log(fromColIdx);
		console.log(fromCardIdx);
	}

	function handleDndFinalizeCards(cid, e) {
		console.log('----------handleDndFinalizeCards---------------');
		console.log($board.columns.data[1].cards.data);
		// console.log('e.detail');
		// console.log(e.detail.info);
		const colIdx = $board.columns.data.findIndex((c) => c._id === cid);
		$board.columns.data[colIdx].cards.data = e.detail.items;
		const cardIdx = $board.columns.data[colIdx].cards.data.findIndex(
			(c) => c._id === e.detail.info.id
		);
		console.log('finalized');
		console.log(finalized);
		console.log('colIdx');
		console.log(colIdx);
		console.log('cardIdx');
		console.log(cardIdx);
		if (finalized === 0 && fromColIdx === colIdx && fromCardIdx !== cardIdx) {
			//same column
			console.log('same column');
			const minCardIdx = fromCardIdx < cardIdx ? fromCardIdx : cardIdx;
			updateCardsWeight($board.columns.data[colIdx].cards.data, minCardIdx);

			const { document, variables } = combineQuery('UpdateCardsWeight').addN(
				UPDATE_CARD_WEIGHT_MUTATION,
				cardsForUpdateByWeight
			);

			updateCards({ document, variables });
			fromColIdx = -1;
			fromCardIdx = -1;
			return;
		}
		if (finalized === 0 && fromColIdx !== colIdx) {
			//different columns
			toColIdx = colIdx;
			toCardIdx = cardIdx;
			console.log('different columns');
			finalized = 1;
			updateCardsWeight($board.columns.data[fromColIdx].cards.data, fromCardIdx);
			updateCardsWeight($board.columns.data[toColIdx].cards.data, toCardIdx);
			let cardForupdateByColumn = {
				id: $board.columns.data[colIdx].cards.data[cardIdx]._id,
				weight: $board.columns.data[colIdx].cards.data[cardIdx].weight,
				columnId: colIdx
			};

			const { document, variables } = combineQuery('UpdateCardsWeight')
				.addN(UPDATE_CARD_WEIGHT_MUTATION, cardsForUpdateByWeight)
				.add(UPDATE_CARD_WEIGHT_AND_COLUMN_MUTATION, cardForupdateByColumn);
			updateCards({ document, variables });
		}
		if (finalized === 2) {
			finalized = 0;
			fromColIdx = -1;
			fromCardIdx = -1;
		}
		if (finalized === 1) {
			finalized = 2;
		}
		console.log('fromColIdx');
		console.log(fromColIdx);
		console.log('fromCardIdx');
		console.log(fromCardIdx);
		console.log('toColIdx');
		console.log(toColIdx);
		console.log('toCardIdx');
		console.log(toCardIdx);
	}
	async function updateCards({ document, variables }) {
		console.log('update cardsssss');

		const mutationString = print(document);
		console.log('mutationString');
		console.log(mutationString);
		const res = await fetch('api/cards', {
			method: 'PUT',
			body: JSON.stringify({
				query: mutationString,
				variables
			})
		});
		console.log(res);
		if (res.ok) {
			const json = await res.json();
			console.log(json);
			// board.updateCard(editableCardColIdx, json);
		} else {
			console.log(res.error());
		}
		showModal1 = false;
	}

	function updateCardsWeight(cards, index) {
		console.log('-------------------------');
		console.log('cards');
		console.log(cards);
		console.log(index);
		if (cards === [] || cards === undefined) {
			return;
		}
		if (index === undefined) {
			index = 0;
		}
		for (let i = index; i < cards.length; i++) {
			cards[i].weight = i;
			cardsForUpdateByWeight.push({
				id: cards[i]._id,
				weight: cards[i].weight
			});
		}
		console.log('++++++++++++++++++++++++++++++++');
		console.log($board.columns.data[1].cards.data);
		console.log('cards');
		console.log(cards);
	}

	function handleClick(columnIndex, cid) {
		editableCard = $board.columns.data[columnIndex].cards.data.find((c) => c._id === cid);
		console.log(editableCard);
		editableCardColIdx = columnIndex;
		actionType = 'update';
		showModal1 = true;

		console.log(showModal1);
	}

	function addCard() {
		editableCard = { title: '', description: '', weight: 1, columnId: $board.columns.data[0]._id };
		showModal1 = true;
		actionType = 'save';
		console.log(showModal1);
	}

	async function updateCard(e) {
		console.log('update card');
		console.log(e.detail);
		console.log('$board.columns.data[0].cards.data');
		console.log($board.columns.data[0].cards.data);
		const res = await fetch('api/card', {
			method: 'PUT',
			body: JSON.stringify(e.detail)
		});
		console.log(res);
		if (res.ok) {
			const json = await res.json();
			board.updateCard(editableCardColIdx, json);
		} else {
			console.log(res.error());
		}
		showModal1 = false;
		// $board.columns.data[0].cards.data.push(json.data.createCard)
		// $board.columns.data[0].cards.data = [...$board.columns.data[0].cards.data, card];
		console.log('$board.columns.data[0].cards.data');
		console.log($board.columns.data[0].cards.data);
	}

	async function createCard(e) {
		const res = await fetch('api/card', {
			method: 'POST',
			body: JSON.stringify(e.detail)
		});
		if (res.ok) {
			const json = await res.json();
			$board.columns.data[0].cards.data = [...$board.columns.data[0].cards.data, json];
		} else {
			console.log(res.error());
		}
		showModal1 = false;
	}

	async function removeCard(columnIndex, cid) {
		const res = await fetch('api/card', {
			method: 'DELETE',
			body: JSON.stringify({ id: cid })
		});
		if (res.ok) {
			const json = await res.json();
			const cardIndex = $board.columns.data[columnIndex].cards.data.findIndex((c) => c._id === cid);
			// $board.columns.data[columnIndex].cards.data.splice(cardIndex, 1);
			board.removeCard(columnIndex, cardIndex);
		} else {
			console.log(res.error());
		}
		console.log($board.columns.data[0].cards.data);
	}
</script>

{#if showModal1}
	<CardDialog
		{editableCard}
		{actionType}
		on:close={() => (showModal1 = false)}
		on:save={(e) => createCard(e)}
		on:update={(e) => updateCard(e)}
	/>
{/if}
<div
	class="flex justify-center p-1 board my-1"
	use:dndzone={{ items: $board.columns.data, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each $board.columns.data as column, columnIndex}
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
					<div class="card" animate:flip={{ duration: flipDurationMs }}>
						<Card
							{card}
							on:remove={() => removeCard(columnIndex, card._id)}
							on:edit={() => handleClick(columnIndex, card._id)}
						/>
					</div>
				{/each}
				{#if columnIndex === 0}
					<div class="flex justify-end">
						<button
							on:click={addCard}
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
