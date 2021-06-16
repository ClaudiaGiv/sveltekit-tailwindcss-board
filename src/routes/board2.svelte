<script context='module'>
	export async function load({ fetch }) {
		const res = await fetch('/api/board2');
		console.log("----res---");
		console.log(res);

		if (res.ok)
			return {
				props: { board2: await res.json() }
			};
		return {
			status: res.status,
			error: new Error()
		};
	}
	//2. fetch netlify
	/*export async function load({ fetch }) {
		let data;
		const uri = '/.netlify/functions/board2';
		let response = await fetch(uri,
			{
				method: 'GET'
			}
		);
		console.log('response+++++')
		console.log(await response)
		// data = await response.json();
		// console.log('data')
		// console.log(data)
	}*/
</script>

<script>
	//1. from load function - fetch endpoint
	// export let board2;
	// console.log('board2');
	// console.log(board2);

	//2. fetch netlify
/*	let data;
	const uri = '/.netlify/functions/board2';

	async function getData() {
		let response = await fetch(uri,
			{
				method: 'GET'
			}
		);
		data = await response.json();
		console.log('data')
		console.log(data)
	}*/

	//3. direct graphql query to fauna
	import { operationStore, query } from '@urql/svelte';

	const columns = operationStore(`
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
	query(columns);

</script>

{#if $columns.fetching}
	<p>Loading...</p>
{:else if $columns.error}
	<p>Oh no... {$columns.error.message}</p>
{:else}
	<ul>
		{#each $columns.data.allColumns.data as column}
			<li>{column.title}</li>
		{/each}
	</ul>
{/if}
