<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getProducts } from "$lib/common/api"

    export const load: Load = async () => {
        return {
            status: 200, 
            props: {
                metaProducts: await getProducts()
            }
        }
    }
</script>

<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"
    import { CollectionGrid, Hero, Typeset } from "$lib/components"

    export let metaProducts: MetaProduct[]
    
    $: items = metaProducts.map(({ product, cms }) => ({
        title: product.name,
        link: {
            href: `/products/${cms.handle}`
        },
        image: {
            src: product.images[0]
        }
    }))
</script>

<Hero class="auto-shine flex justify-start items-end p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover-yasen-alt.jpg" }}>
    <Typeset heading="All Products" subheading="What we have to offer." class="mx-auto py-12 text-neutral-content" />
</Hero>

<CollectionGrid {items} />
