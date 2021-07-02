export const FAUNA_API = import.meta.env.VITE_FAUNA_API;
export const FAUNA_KEY = import.meta.env.VITE_FAUNA_KEY;
import { CREATE_CARD_MUTATION, UPDATE_CARD_MUTATION } from '../../../graphql/card';

export async function post(req) {
	let variables = JSON.parse(req.body);
	console.log(variables);
	const query = CREATE_CARD_MUTATION;
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
			response = result;
			console.log('result');
			console.log(result);
		})
		.catch((e) => {
			console.log(e);
		});

	console.log('response');
	console.log(response);
	return {
		body: response
	};
}

export async function put(req) {
	let response;
	await fetch(FAUNA_API.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_KEY.toString()
		},
		body: JSON.stringify({
			query: UPDATE_CARD_MUTATION,
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
