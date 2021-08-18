<script>
	import { auth } from '../../constants/go-true';
	import { goto } from '$app/navigation';

	let username = '';
	let usernameError = false;

	async function recoverPassword() {
		if (username === '') {
			usernameError = true;
			return;
		}
		usernameError = false;
		auth
			.requestPasswordRecovery(username)
			.then((response) => {
				console.log('Password recovery email sent', response);
				goto('/');
			})
			.catch((error) => console.log("It's an error", error));
	}
	$: console.log(username);
</script>

<h1>Password recovery</h1>
<div className='w-full max-w-xs mx-auto mt-4'>
	<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
		<div className='mb-4'>
			<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'> Username </label>
			<input
				class:border-red-500={usernameError && username === ''}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				id='username'
				type='text'
				placeholder='Username'
				bind:value={username}
			/>
			{#if usernameError && username === ''}
				<p className='text-red-500 text-xs italic'>Please provide a valid username.</p>
			{/if}
		</div>
		<div class='flex items-center justify-between'>
			<button
				class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline'
				type='button'
				on:click={recoverPassword}
			>
				Recover password
			</button>
		</div>
	</form>
</div>
