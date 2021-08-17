module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				teal: '#009688',
				'teal-500': '#009688',
				'teal-100': '#b2dfdb'
			}
		}
	},
	plugins: []
};
