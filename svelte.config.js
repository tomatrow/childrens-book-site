import netlify from "@sveltejs/adapter-netlify"
import preprocess from "svelte-preprocess"
import Icons from "unplugin-icons/vite"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [preprocess({ postcss: true })],
    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",
        adapter: netlify(),
        prerender: {
            crawl: true,
            enabled: true,
            onError: "continue"
        },
        vite: {
            plugins: [Icons({ compiler: "svelte", autoInstall: true })]
        }
    }
}

export default config
