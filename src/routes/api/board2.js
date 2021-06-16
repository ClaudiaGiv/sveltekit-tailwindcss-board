export async function fetchBoard() {
	const uri = '/.netlify/functions/board2'
	let response = await fetch(uri,
		{method : 'GET' }
	);
	let data = await response.json();
	return data;
}
