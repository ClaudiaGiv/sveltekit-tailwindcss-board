<script>
	import { auth } from '../../constants/go-true';
	import { goto } from '$app/navigation';

	let username;
	let password;
	let usernameError = false;
	let passwordError = false;

	async function signIn() {
		if (username === '') {
			usernameError = true;
			return;
		}
		if (password === '') {
			passwordError = true;
			return;
		}
		usernameError = false;
		passwordError = false;
		auth
			.login(username, password)
			.then((response) => {
				console.log('Success! Response:', JSON.stringify({ response }));
				goto('/');
			})
			.catch((error) => console.log("It's an error", error));
	}
</script>

<h1>Login</h1>
<div class="w-full max-w-xs mx-auto mt-4">
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
			<input
				class:border-red-500={usernameError && username === ''}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="username"
				type="text"
				placeholder="Username"
				bind:value={username}
			/>
			{#if usernameError && username === ''}
				<p class="text-red-500 text-xs italic">Please provide a valid username.</p>
			{/if}
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
			<input
				class:border-red-500={passwordError && password === ''}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id="password"
				type="password"
				placeholder="******************"
				bind:value={password}
			/>
			{#if passwordError && password === ''}
				<p class="text-red-500 text-xs italic">Please provide a valid password.</p>
			{/if}
			<a
				class="inline-block font-bold text-sm text-blue-500 hover:text-blue-800 ml-auto"
				href="/password-recovery"
			>
				Forgot password
			</a>
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={signIn}
			>
				Sign In
			</button>
			<a
				class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pr-4 mr-4"
				href="/register"
			>
				Sign up
			</a>
		</div>
	</form>
</div>
