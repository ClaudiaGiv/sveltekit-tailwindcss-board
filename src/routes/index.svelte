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
	import Alert from '$lib/alert.svelte';
	import { auth } from '../../constants/go-true';
	import { goto } from '$app/navigation';
	let tokenConfirmationError;
	let successMessage;

	function getToken(separator) {
		return window.location.href.substring(1).split(separator)[1];
	}
	function recoverUserAccountAfterPasswordReset() {
		const recoveryToken = getToken('recovery_token=');
		if (recoveryToken !== undefined) {
			auth
				.recover(recoveryToken, true)
				.then((response) => {
					console.log('Logged in as %s', JSON.stringify({ response }));
					goto('/password-reset');
				})
				.catch((error) => {
					console.log('Failed to verify recover token: %o', error);
					tokenConfirmationError = 'The password recovery token was already used!';
				});
		}
	}
	function confirmUserAfterSignUp() {
		const confirmationToken = getToken('confirmation_token=');
		if (confirmationToken !== undefined) {
			auth
				.confirm(confirmationToken)
				.then((response) => {
					console.log('User has been confirmed ', response);
					successMessage = 'Your account has been confirmed!';
					// this.saveUser(response);
					goto('/login');
				})
				.catch((error) => {
					console.log('An error occurred trying to confirm the user ', error);
					tokenConfirmationError = 'The confirmation token for sign up was already used!';
				});
		}
	}

	onMount(() => {
		confirmUserAfterSignUp();
		recoverUserAccountAfterPasswordReset();
	});
</script>

<section>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read
		the documentation
	</p>
	<!--{#if successMessage}-->
	<Alert message={successMessage} />
	<!--{/if}-->
</section>
