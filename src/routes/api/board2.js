import { page } from '$app/stores';

export async function get() {
	let response1;
	fetch('https://www.learnwithjason.dev/graphql', {
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
		.then((res) => {
			console.log('res');
			console.log(res);

			console.log(res.json());
			return res.json();
		})
		.then((result) => {
			response1 = result.data
			console.log('result');
			console.log(result);
			// return {
			// 	result
			// };
		});

	return {
		body: response1
	};
}
