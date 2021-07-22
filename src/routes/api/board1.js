export const FAUNA_API = import.meta.env.VITE_FAUNA_API;
export const FAUNA_KEY = import.meta.env.VITE_FAUNA_KEY;
import { BOARD_BY_USER_QUERY, CREATE_DEFAULT_BOARD_MUTATION } from '../../../graphql/board';

//TODO: how can I have multiple get functions in the same endpoint? is it needed?
export async function get(req) {
	console.log("req")
	console.log(req.query)
	let query = BOARD_BY_USER_QUERY;
	const variables = { userId: '293327431033422337' };
	let response;
	await fetch(FAUNA_API.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_KEY.toString()
		},
		body: JSON.stringify({
			query,
			variables
		})
	})
		.then((res) => res.json())
		.then((result) => {
			response = result.data.boardByUserId.data[0];
			console.log('response');
			console.log(response);
		})
		.catch((e) => {
			console.log(e);
		});
	return {
		body: response
	};
}

export async function post(req) {
	let response;
	await fetch(FAUNA_API.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_KEY.toString()
		},
		body: JSON.stringify({
			query: CREATE_DEFAULT_BOARD_MUTATION,
			variables: JSON.parse(req.body)
		})
	})
		.then((res) => res.json())
		.then((result) => {
			response = result;
		})
		.catch((e) => {
			console.log(e);
		});
	return {
		body: response
	};
}
