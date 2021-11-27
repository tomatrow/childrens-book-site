<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getCollections } from "$lib/common/api"

    export const load: Load = async () => {
        return {
            status: 200, 
            props: {
                collections: await getCollections()
            }
        }
    }
</script>

<script lang="ts">
    import type { Collection } from "$lib/types/models"
    import { CollectionGrid, Hero, Typeset } from "$lib/components"

    export let collections: Collection[]

    $: items = collections.map(({ handle, image, title }) => ({
        title,
        link: {
            href: `/collections/${handle}`
        },
        image
    }))
</script>

<Hero class="auto-shine p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover-yasen-alt.jpg" }}>
    <Typeset heading="All Collections" subheading="What we have to offer." class="mx-auto py-12 text-neutral-content" />
</Hero>

<CollectionGrid {items} />
