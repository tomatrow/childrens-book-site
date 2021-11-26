<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getProducts } from "$lib/common/api"

    export const load: Load = async () => {
        return {
            status: 200, 
            props: {
                products: await getProducts()
            }
        }
    }
</script>

<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"

    export let products: MetaProduct[]
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {#each products as { product, cms } (cms.id)}
        <a href="/products/{cms.handle}" class="flex flex-col items-start bg-center bg-cover py-12" style={product.images.length > 0 ? `background-image: url(${product.images[0]})` : ''}>
            <span>{product.name}</span>
            <span>{product.description}</span>
        </a>
    {/each}
</section>
