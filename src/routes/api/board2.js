import { getStores, navigating, page, session } from '$app/stores';
export async function get() {
	console.log(page);
	// This will display the current host
	const hostname = 'https://sveltekit-board.netlify.app';
	const uri = hostname + '/.netlify/functions/board2';
	let response = await fetch(uri,
		{ method: 'GET' }
	);
	let data = await response.json();
	return data;
}
