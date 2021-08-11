<script context="module">
	import board from '../stores/board';

	console.log('before load');

	function sortBoardElements(board) {
		board.columns.data.sort((x, y) => {
			return x.weight - y.weight;
		});
		board.columns.data.forEach((el) =>
			el.cards.data.sort((x, y) => {
				return x.weight - y.weight;
			})
		);
		return board;
	}

	export async function load({ page, fetch }) {
		const res = await fetch('/api/board1?userId=293327431033422337');

		if (res.ok) {
			const json = await res.json();
			const board1 = await json;
			console.log(board1);
			board.set(sortBoardElements(board1));
			return {};
		}
		return {
			status: res.status,
			error: new Error()
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { auth } from '../../constants/go-true';
	let confirmationToken;
	console.log("start confirm")
	onMount( () => {
		confirmationToken = window.location.href.substring(1)
			.split("confirmation_token=")[1]

		// confirmationToken = decodeURIComponent(window.location.search)
		// 	.substring(1)
		// 	.split("confirmation_token=")[1];
		console.log(confirmationToken)
		if (confirmationToken !== undefined) {
			auth
				.confirm(confirmationToken)
				.then(response => {
					console.log("User has been confirmed ", response);
					// this.saveUser(response);
					// this.goToPage("login", {
					// 	successfulConfirmation: "Registration confirmed!"
					// });
				})
				.catch(error => {
					console.log("An error occurred trying to confirm the user ", error);
					this.tokenConfirmationError =
						"The confirmation token for sign up was already used!";
				});
		}
	});

</script>

<section>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read
		the documentation
	</p>
</section>
