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

    export let collection: Collection
    export let products: MetaProduct[]
    
    console.log({ collection, products })
    
    function findProduct(handle: string) {
        return products.find(product => product.cms.handle === handle)
    }
</script>

<section class="flex flex-col">
    <h1>{collection.title}</h1>
    <div class="prose">
        {@html collection.body}
    </div>
    <div>
        {#each collection.products.map(x => x.handle).map(findProduct) as { product, cms }}
            <a href="/products/{cms.handle}">{product.name}</a>
        {/each}
    </div>
</section> 
