<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let object;
	export let actionType;
	let isError = false;
	let isEmptyTitle;
	$: isEmptyTitle = object.title === '';

	function close() {
		dispatch('close');
	}

	function save() {
		console.log(object.title);
		if (object.title === '') {
			isError = true;
			return;
		}
		dispatch(actionType + '-' + object.type, object);
	}
</script>

<div
	class="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto"
	x-transition:enter="transition duration-300"
	x-transition:enter-start="opacity-0"
	x-transition:enter-end="opacity-100"
	x-transition:leave="transition duration-300"
	x-transition:leave-start="opacity-100"
	x-transition:leave-end="opacity-0"
>
	<div class="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100">
		<div
			class="relative bg-white shadow-lg rounded-md text-gray-900 z-20"
			x-transition:enter="transition transform duration-300"
			x-transition:enter-start="scale-0"
			x-transition:enter-end="scale-100"
			x-transition:leave="transition transform duration-300"
			x-transition:leave-start="scale-100"
			x-transition:leave-end="scale-0"
		>
			<header class="flex items-center justify-between p-2">
				<h2 class="font-semibold">Edit {object.type} details</h2>
				<button class="focus:outline-none p-2" on:click={close}>
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 18 18"
					>
						<path
							d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
						/>
					</svg>
				</button>
			</header>
			<main class="p-2 text-center">
				<div class="mb-2 pt-0">
					<input
						bind:value={object.title}
						type="text"
						placeholder="Title"
						class:border-red-500={isError && isEmptyTitle}
						class:border={isError && isEmptyTitle}
						class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow
						outline-none focus:outline-none focus:ring w-full border"
					/>
				</div>
				{#if isError && isEmptyTitle}
					<span
						class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 mb-2"
					>
						Title is required!
					</span>
				{/if}
				<div class="mb-3 pt-0">
					<textarea
						bind:value={object.description}
						placeholder="Description"
						class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
					/>
				</div>
			</main>
			<footer class="flex justify-center p-2">
				<button
					class="bg-gray-600 mx-1 font-semibold text-white p-2 w-32 rounded-full hover:bg-red-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
					on:click={close}
				>
					Cancel
				</button>
				<button
					class="bg-indigo-600 mx-1 font-semibold text-white p-2 w-32 rounded-full hover:bg-red-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
					on:click={save}
				>
					Save
				</button>
			</footer>
		</div>
	</div>
</div>
