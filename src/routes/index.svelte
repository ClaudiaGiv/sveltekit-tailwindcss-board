<script context="module">
	import board from '../stores/board';

	console.log('before load');

	function sortBoardElements(board){
		board.columns.data.forEach(el =>
			el.cards.data.sort((x, y) => {
				return x.weight - y.weight;
			})
		);
		return board;
	}

	export async function load({ fetch }) {
		const res = await fetch('/api/board1?userId=293327431033422337');
		console.log('inside load');

		if (res.ok) {
			const json = await res.json();
			const board1 = await json
			console.log(board1)
			board.set(sortBoardElements(board1));
			return {};
		}
		return {
			status: res.status,
			error: new Error()
		};
	}
</script>


<section>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read
		the documentation
	</p>
</section>
