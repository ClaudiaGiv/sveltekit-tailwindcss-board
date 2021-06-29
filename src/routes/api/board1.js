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
	await fetch('https://graphql.fauna.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Basic Zm5BRHdGUEMtb0FDQUxlMmV2cUpMNUh1dGtJbU5kLW5oWlh0d1NoeTpQZXJzb25hbEthbmJhbjpzZXJ2ZXI='
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
