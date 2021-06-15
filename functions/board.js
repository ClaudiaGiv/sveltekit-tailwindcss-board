exports.handler = async (event, context) => {
	const { identity } = context.clientContext
	console.log(identity)
	// const usersUrl = `${identity.url}/admin/users`
	const adminAuthHeader = 'Bearer ' + identity.token
	// const fetch = require('node-fetch')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-var-requires
	const urql = require('@urql/core')
	// import { operationStore, query } from '@urql/core';
	console.log(urql)
	const columns = urql.operationStore(`
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
  `);
	console.log(columns)


	console.log('event', JSON.stringify(event))
	console.log('context', JSON.stringify(context))

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
		body: { },
	}
}
