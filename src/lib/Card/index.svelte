<script>
	export let card;
</script>

<div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white my-2">
	<div class="flex justify-between">
		<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{card.name}</p>

		<img
			class="w-6 h-6 rounded-full ml-3"
			src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
			alt="Avatar"
		>
	</div>
	<div class="flex mt-4 justify-between items-center">
		<span class="text-sm text-gray-600">03.09.1994</span>
		<badge class="px-2 rounded bg-red-300">bug</badge>
	</div>
</div>
