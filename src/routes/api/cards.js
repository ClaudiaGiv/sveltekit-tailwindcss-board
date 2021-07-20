import { UPDATE_CARD_MUTATION } from '../../../graphql/card';
import { FAUNA_API, FAUNA_KEY } from './card';

export async function put(req) {
	let response;
	console.log("req.body")
	console.log(req.body)
	// await fetch(FAUNA_API.toString(), {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Authorization: FAUNA_KEY.toString()
	// 	},
	// 	body: JSON.stringify({
	// 		query: UPDATE_CARD_MUTATION,
	// 		variables: JSON.parse(req.body)
	// 	})
	// })
	// 	.then((res) => res.json())
	// 	.then((result) => {
	// 		response = result.data.updateCard;
	// 	})
	// 	.catch((e) => {
	// 		console.log(e);
	// 	});
	//
	return {
		body: { status: "ok" }
	};
}
