import { UPDATE_CARD_MUTATION } from '../../../graphql/card';
import { FAUNA_API, FAUNA_KEY } from './card';

export async function put(req) {
	let response;
	console.log('req.body');
	console.log(req.body);
	await fetch(FAUNA_API.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_KEY.toString()
		},
		body: req.body
	})
		.then((res) => res.json())
		.then((result) => {
			console.log('result');
			console.log(result);
			response = result.data;
		})
		.catch((e) => {
			console.log(e);
		});
	console.log(response);
	return {
		body: response
	};
}
