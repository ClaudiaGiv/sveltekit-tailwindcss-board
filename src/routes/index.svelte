<script context="module">

	console.log('before load');
	export async function load({ fetch }) {
		const res = await fetch('/api/board1?userId=293327431033422337');
		console.log('inside load');

		if (res.ok) {
			const json = await res.json();
			return {
				props: { board1: await json.data.boardByUserId.data[0]  }
			};
		}
		return {
			status: res.status,
			error: new Error()
		};
	}
</script>

<script>
	import board from '../stores/board';
	export let board1;
	console.log("index")
	console.log(board1)
	board.set(board1)

</script>

<section>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read
		the documentation
	</p>
</section>

