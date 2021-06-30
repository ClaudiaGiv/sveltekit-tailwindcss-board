export const FAUNA_API = import.meta.env.VITE_FAUNA_API;
export const FAUNA_KEY = import.meta.env.VITE_FAUNA_KEY;
export async function get() {
	let query = `
    	query boardByUserId($userId: String!) {
				boardByUserId(userId: $userId) {
					data {
						_id
						title
						description
						locked
						columns {
							data {
								_id
								title
								description
								weight
								cards {
									data {
										_id
										title
										description
										weight
									}
								}
							}
						}
					}
				}
			}`;
	const variables = { userId: '293327431033422337' };
	let response;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	await fetch(FAUNA_API, {
		method: 'POST',
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		headers: {
			'Content-Type': 'application/json',
			'Authorization':
			FAUNA_KEY
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
