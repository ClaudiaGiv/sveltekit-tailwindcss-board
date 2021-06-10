<script context="module">
	import { createClient } from '@urql/svelte';

	export async function load() {
		const client = createClient({
			// Pass in the fetch from sveltekit to have access to serialized requests during hydration
			url: 'https://graphql.fauna.com/graphql',
			fetchOptions: () => {
				const token =
					'Zm5BRHdGUEMtb0FDQUxlMmV2cUpMNUh1dGtJbU5kLW5oWlh0d1NoeTpQZXJzb25hbEthbmJhbjpzZXJ2ZXI=';
				return {
					headers: { authorization: token ? `Basic ${token}` : '' }
				};
			}
		});
		return {
			props: { client }
		};
	}
</script>

<script>
	import '../app.postcss';
	import '../app.css';
	import Header from '$lib/Header/index.svelte';
	import { setClient } from '@urql/svelte';
	export let client;
	setClient(client)
</script>

<Header />
<main>
	<div class="h-full bg-indigo-100">
		<div class="container px-4 mx-auto">
			<slot />
		</div>
	</div>
</main>
<footer>
	<div class="font-black">Woof!!</div>
	<p class="font bold">
		visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>
