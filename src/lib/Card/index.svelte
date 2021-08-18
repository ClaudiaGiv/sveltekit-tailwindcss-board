<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let card;
</script>

<div
	class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white my-2 hover:border-indigo-600"
>
	<div class="flex justify-between" on:click={() => dispatch('edit')}>
		<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm cursor-pointer">
			{card.title} - {card.weight}
		</p>

		<img
			class="w-6 h-6 rounded-full ml-3"
			src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
			alt="Avatar"
		/>
	</div>
	<div class="flex mt-4 justify-between items-center">
		<button
			class="h-8 m-2 text-sm text-red-700 transition-colors rounded-lg hover:bg-red-100 hover:"
			on:click={() => dispatch('remove')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
		<span class="text-sm text-gray-600">03.09.1994</span>
		<badge class="px-2 rounded bg-red-300">bug</badge>
	</div>
</div>
