import Icons from "unplugin-icons/vite"
import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		Icons({ compiler: "svelte", autoInstall: true }),
		sveltekit()
	]
}

export default config
