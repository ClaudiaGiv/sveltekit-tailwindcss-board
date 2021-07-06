import { writable } from 'svelte/store';

const BOARD = {};

const { subscribe, set, update } = writable(BOARD);

const addCard = (card) =>
	update((board) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		board.columns.data[0].cards.data.push(card);
		console.log('inside store');
		console.log(board);
		// console.log(card);
		console.log('------after  store');

		return board;
	});

const reset = () => {
	set(BOARD);
};

export default {
	subscribe,
	set,
	addCard,
	reset
};
