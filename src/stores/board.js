import { writable } from 'svelte/store';

const BOARD = {};

const { subscribe, set, update } = writable(BOARD);

const updateCard = (colIdx, card) =>
	update((board) => {
		const cardIdx = board.columns.data[colIdx].cards.data.findIndex((c) => c._id === card._id);
		board.columns.data[colIdx].cards.data[cardIdx] = card;
		return board;
	});

const updateCardWeights = (fromColumnIndex, fromCardIndex, toColumnIndex, toCardIndex) =>
	update((board) => {

		return board;
	});

const addCard = (card) =>
	update((board) => {
		board.columns.data[0].cards.data.push(card);
		return board;
	});

const removeCard = (columnIndex, cardIndex) =>
	update((board) => {
		console.log('remove card');
		console.log(cardIndex);
		console.log(board.columns.data[columnIndex].cards.data);
		board.columns.data[columnIndex].cards.data.splice(cardIndex, 1);
		console.log(board.columns.data[columnIndex].cards.data);
		return board;
	});

const reset = () => {
	set(BOARD);
};

export default {
	subscribe,
	set,
	addCard,
	removeCard,
	updateCardWeights,
	updateCard,
	reset
};
