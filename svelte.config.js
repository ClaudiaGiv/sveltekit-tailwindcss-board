import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
// eslint-disble-next-line @typescript-eslint/no-var-requires
// import pkg  from './package.json';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		vite: {
			resolve: {
				dedupe: ['svelte', 'urql']
			},
			optimizeDeps: {
				exclude: ['@urql/svelte', '@urql/exchange-request-policy', '@urql/devtools'],
				// exclude: Object.keys(pkg.dependencies || {}).filter((d) => !['graphql'].includes(d)),
				include: ['graphql']
			},
			ssr: {
				// Until https://github.com/vitejs/vite/issues/2579
				// noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};

export default config;
