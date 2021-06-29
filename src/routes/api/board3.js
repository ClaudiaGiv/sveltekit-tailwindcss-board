export async function get() {
	let response;
	await fetch('https://www.learnwithjason.dev/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: `
        query GetLearnWithJasonEpisodes($now: DateTime!) {
          allEpisode(limit: 10, sort: {date: ASC}, where: {date: {gte: $now}}) {
            date
            title
            guest {
              name
              twitter
            }
            description
          }
        }
      `,
			variables: {
				now: new Date().toISOString()
			}
		})
	})
		.then((res) => res.json())
		.then((result) => {
			response = result;
			console.log(result);
		});

	return {
		body: response
	};
}
