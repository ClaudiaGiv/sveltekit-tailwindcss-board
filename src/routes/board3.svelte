<script>
	import { flip } from 'svelte/animate';
	import { dndzone, overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	import combineQuery from 'graphql-combine-query';
	import { print } from 'graphql/language/printer';
	import Card from '$lib/Card/index.svelte';
	import CardDialog from '$lib/card-dialog.svelte';
	import board from '../stores/board';

	console.log('board');
	console.log($board.columns.data);
	console.log($board.columns.data[0].cards.data);
	console.log($board.columns.data[1].cards.data);
	console.log($board.columns.data[2].cards.data);
	import {
		UPDATE_CARD_WEIGHT_AND_COLUMN_MUTATION,
		UPDATE_CARD_WEIGHT_MUTATION
	} from '../../graphql/card';

	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');

	const flipDurationMs = 200;

	let editableCard;
	let editableColumn;
	let actionType = 'save';
	let editableCardColIdx = -1;
	let showModal1 = false;
	let fromColIdx = -1;
	let fromCardIdx = -1;
	let toCardIdx = -1;
	let finalized = 0;

	//--- DND Functions ---

	function handleDndConsiderColumns(e) {
		$board.columns.data = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		$board.columns.data = e.detail.items;
	}

	function handleDndConsiderCards(cid, e) {
		const colIdx = $board.columns.data.findIndex((c) => c._id === cid);
		const cardIdx = $board.columns.data[colIdx].cards.data.findIndex(
			(c) => c._id === e.detail.info.id
		);
		$board.columns.data[colIdx].cards.data = e.detail.items;

		fromColIdx = fromColIdx === -1 ? colIdx : fromColIdx;
		fromCardIdx = fromCardIdx === -1 ? cardIdx : fromCardIdx;
	}

	function handleDndFinalizeCards(cid, e) {
		const colIdx = $board.columns.data.findIndex((c) => c._id === cid);
		$board.columns.data[colIdx].cards.data = e.detail.items;
		const cardIdx = $board.columns.data[colIdx].cards.data.findIndex(
			(c) => c._id === e.detail.info.id
		);
		if (finalized === 0 && fromColIdx === colIdx && fromCardIdx !== cardIdx) {
			//same column
			console.log('same column');
			const minCardIdx = fromCardIdx < cardIdx ? fromCardIdx : cardIdx;
			const cardsForUpdateByWeight = updateCardsWeight(
				$board.columns.data[colIdx].cards.data,
				minCardIdx
			);
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
			console.log('different columns');
			finalized = 1;
			let cardsForUpdateByWeight = updateCardsWeight(
				$board.columns.data[fromColIdx].cards.data,
				fromCardIdx
			);
			cardsForUpdateByWeight.push(
				...updateCardsWeight($board.columns.data[colIdx].cards.data, cardIdx)
			);
			let cardForupdateByColumn = {
				id: $board.columns.data[colIdx].cards.data[cardIdx]._id,
				weight: $board.columns.data[colIdx].cards.data[cardIdx].weight,
				columnId: $board.columns.data[colIdx]._id
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
	}

	//--- DND Functions ---

	//--- Card updates Functions ---

	function updateCardsWeight(cards, index) {
		let cardsForUpdateByWeight = [];
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
		return cardsForUpdateByWeight;
	}

	function editCard(colId, cardId) {
		const colIdx = $board.columns.data.findIndex(c => c._id === colId);
		editableCard = $board.columns.data[colIdx].cards.data.find((c) => c._id === cardId);
		editableCardColIdx = colIdx;
		actionType = 'update';
		showModal1 = true;
	}

	function addCard() {
		const editableCardWeight = $board.columns.data[0].cards.data.length;
		const editableCardColumnId = $board.columns.data[0]._id;
		editableCard = {
			title: '',
			description: '',
			weight: editableCardWeight,
			columnId: editableCardColumnId
		};
		actionType = 'save';
		showModal1 = true;
	}

	//--- Card updates Functions ---

	//--- Column updates Functions ---

	function addColumn() {
		const newColumn = {
			title: '',
			description: '',
			weight: $board.columns.data.length
		};
	}

	function editColumn(colId) {
		// editableColumn = $board.columns.data[columnIndex].cards.data.find((c) => c._id === cid);
		// editableCardColIdx = columnIndex;
		// actionType = 'update';
		// showModal1 = true;
	}

	function isFirstColumn(colId) {
		return $board.columns.data.findIndex(c => c._id === colId) === 0;
	}

	//--- Column updates Functions ---

	//--- Async Functions - Endpoints Requests ---

	async function updateCards({ document, variables }) {
		console.log('update cards');
		const mutationString = print(document);
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
		} else {
			console.log(res.error());
		}
	}

	async function updateCard(e) {
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

	async function removeCard(colId, cardId) {
		const res = await fetch('api/card', {
			method: 'DELETE',
			body: JSON.stringify({ id: cardId })
		});
		if (res.ok) {
			const json = await res.json();
			const colIdx = $board.columns.data.findIndex(c => c._id === colId);
			const cardIdx = $board.columns.data[colIdx].cards.data.findIndex((c) => c._id === cardId);
			board.removeCard(colIdx, cardIdx);
		} else {
			console.log(res.error());
		}
	}

	//--- Async Functions - Endpoints Requests ---
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
	{#each $board.columns.data as column (column._id)}
		<div class="bg-gray-100 rounded-lg p-1 mx-1 rounded column" animate:flip={{ duration: flipDurationMs }}>
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
							on:remove={() => removeCard(column._id, card._id)}
							on:edit={() => editCard(column._id, card._id)}
						/>
					</div>
				{/each}
				{#if isFirstColumn(column._id)}
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
	<div class="rounded column">
		<div class="flex justify-start">
			<button
				on:click={addColumn}
				class="flex items-center mt-1 mx-1 px-4 py-2 font-medium text-sm text-white bg-gray-800 rounded-md hover:bg-gray-700"
			>
				<svg class="h-5 w-5" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 4v16m8-8H4"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span>Add column</span>
			</button>
		</div>
	</div>
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
