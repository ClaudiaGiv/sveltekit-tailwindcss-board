exports.handler = async (event, context) => {
	// const fetch = require('node-fetch')
	require('isomorphic-unfetch');

	const { gql, createClient}  = require('@urql/core')
	const client = createClient({
		url: 'https://graphql.fauna.com/graphql',
		fetchOptions: () => {
			const token =
				'Zm5BRHdGUEMtb0FDQUxlMmV2cUpMNUh1dGtJbU5kLW5oWlh0d1NoeTpQZXJzb25hbEthbmJhbjpzZXJ2ZXI=';
			return {
				headers: { authorization: token ? `Basic ${token}` : '' }
			};
		}
	});

	const columns = gql`
      query getAllColumns {
          allColumns {
              data {
                  _id
                  title
                  cards {
                      data {
                          _id
                          title
                          description
                      }
                  }
              }
          }
      }
	`;
	console.log('-----------------');
	let response;
	await client
		.query(columns)
		.toPromise()
		.then(result => {
			console.log('result');
			console.log(result.data.allColumns);
			response = result.data.allColumns.data;
		});

	console.log("++++++++++++")
	console.log(response)

	/*let data
	try {
		data = await fetch(usersUrl, {
			method: 'GET',
			headers: { Authorization: adminAuthHeader },
		}).then((response) => {
			console.log('data', JSON.stringify(data))
			return response.json()
		})
	} catch (e) {
		console.log('error', JSON.stringify(e))
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: e.message,
			}),
		}
	}

	console.log('returned data', JSON.stringify(data))*/

	return {
		statusCode: 200,
		body: JSON.stringify(response)
	};
};
