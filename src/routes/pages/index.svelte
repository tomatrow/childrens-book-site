<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPages } from "$lib/common/api"
	import { delay } from "optional-default-site-kit/functions/delay"

    export const load: Load = async () => {
		console.log("pre pages")
		await delay(500)
		console.log("after delay")
		const pages = await getPages()

		console.log({
			pages 
		})

        return {
            status: 200, 
            props: {
                pages
            }
        }
    }
</script>

<script lang="ts">
    import { CollectionGrid, Typeset, Hero } from "$lib/components"
    import type { Page } from "$lib/types/models"

    export let pages: Page[]
    
    $: items = pages.map(page => ({
        title: page.title,
        link: {
            href: `/pages/${page.handle}`
        },
        image: page.image
    }))
</script>

<Hero class="auto-shine flex justify-start items-end p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover-yasen-alt.jpg" }}>
    <Typeset heading="All Pages" subheading="See what we're about." class="mx-auto py-12 text-neutral-content" />
</Hero>

<CollectionGrid {items} />
