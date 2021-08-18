import { FAUNA_API, FAUNA_KEY } from './card';
import { CREATE_COLUMN_MUTATION, UPDATE_COLUMN_MUTATION } from '../../../graphql/column';
import { DELETE_COLUMN_MUTATION } from '../../../graphql/column';

export async function post(req) {
	console.log('req.body');
	console.log(req.body);
	let variables = JSON.parse(req.body);
	const query = CREATE_COLUMN_MUTATION;
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
			console.log(result);
			response = result.data.createColumn;
		})
		.catch((e) => {
			console.log(e);
		});
	return {
		body: response
	};
}

export async function put(req) {
	console.log('req.body');
	console.log(req.body);
	let response;
	await fetch(FAUNA_API.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_KEY.toString()
		},
		body: JSON.stringify({
			query: UPDATE_COLUMN_MUTATION,
			variables: JSON.parse(req.body)
		})
	})
		.then((res) => res.json())
		.then((result) => {
			console.log(result);
			response = result.data.updateColumn;
		})
		.catch((e) => {
			console.log(e);
		});

	return {
		body: response
	};
}

export async function del(req) {
	console.log('req.body');
	console.log(req.body);
	let response;
	await fetch(FAUNA_API.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_KEY.toString()
		},
		body: JSON.stringify({
			query: DELETE_COLUMN_MUTATION,
			variables: JSON.parse(req.body)
		})
	})
		.then((res) => res.json())
		.then((result) => {
			console.log(result);
			response = result.data.deleteColumn;
		})
		.catch((e) => {
			console.log(e);
		});

	return {
		body: response
	};
}
