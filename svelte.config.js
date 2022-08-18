import netlify from "@sveltejs/adapter-netlify"
import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
		preprocess({ postcss: true })
	],
    kit: {
        adapter: netlify(),
        prerender: {
            enabled: false,
            onError: "continue"
        }
    }
}

export default config
