/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				lofi: {
					...require('daisyui/src/theming/themes')['lofi'],
					accent: '#675d50',
					success: '#10b981'
				}
			}
		]
	}
};
