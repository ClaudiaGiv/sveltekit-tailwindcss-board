<script>
	import { auth } from '../../constants/go-true';
	import { goto } from '$app/navigation';
	let currentUser = auth.currentUser();
	console.log(currentUser)
	let username = currentUser.email;
	let password1 = '';
	let password2 = '';
	let passwordError = false;
	async function resetPassword() {
		console.log(currentUser)
		if (password1 === '' || password2 === '' || password1 !== password2) {
			passwordError = true;
			return;
		}
		passwordError = false;
		this.errorMessage = '';
		currentUser
			.update({ password: password1 })
			.then(() => {
				console.log('The password was changed successfully!');
				goto('/')
			})
			.catch((error) => {
				console.log('Failed to update user: %o', error);
				this.errorMessage = 'Error resetting the password. Please try again!';
			});
	}
	$: console.log(username);
	$: console.log(password1);
	$: console.log(password2);
</script>

<div class="w-full max-w-xs mx-auto mt-4">
	<h1>Password reset</h1>
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="username"
				type="text"
				placeholder="Username"
				disabled
				bind:value={username}
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password1"> Password </label>
			<input
				class:border-red-500={passwordError && password1 === ''}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id="password1"
				type="password"
				placeholder="******************"
				bind:value={password1}
			/>
			{#if passwordError && password1 === ''}
				<p class="text-red-500 text-xs italic">Please provide a valid password.</p>
			{/if}
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password2">
				Confirm password
			</label>
			<input
				class:border-red-500={passwordError && password2 === ''}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id="password2"
				type="password"
				placeholder="******************"
				bind:value={password2}
			/>
			{#if passwordError && password2 === ''}
				<p class="text-red-500 text-xs italic">Please provide a valid password.</p>
			{/if}
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={resetPassword}
			>
				Reset password
			</button>
			<a
				class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				href="/login"
			>
				Already have an account?
			</a>
		</div>
	</form>
</div>
