<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getCollection, getProducts } from "$lib/common/api"
    import type { MetaProduct } from "$lib/types/models"

    export const load: Load = async ({ page }) => {
        return {
            status: 200, 
            props: {
                collection: await getCollection(page.params.handle),
                products: await getProducts()
            }
        }
    }
</script>

<script lang="ts">
    import type { Collection } from "$lib/types/models"
    import { CollectionGrid, Hero, Typeset } from "$lib/components"

    export let collection: Collection
    export let products: MetaProduct[]
    
    function findProduct(handle: string) {
        return products.find(product => product.cms.handle === handle)
    }

    $: items = collection.products.map(handle => {
        const { product } = findProduct(handle)
        return {
            title: product.name,
            link: {
                href: "/products/" + handle
            },
            image: {
                src: product.images[0]
            }
        }
    })
</script>

<Hero class="auto-shine p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover-yasen-alt.jpg" }}>
    <Typeset heading={collection.title} class="mx-auto py-12 text-neutral-content" />
</Hero>

<CollectionGrid {items} />
