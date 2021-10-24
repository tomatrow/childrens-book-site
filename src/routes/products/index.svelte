<script lang="ts" context="module">
    import { serverRequest } from "$lib/common/request"
    import type { Load } from "@sveltejs/kit"
    import type { get } from "src/routes/api/products/index.json"

    export const load: Load = async ({ fetch }) => {
        const products = await serverRequest<typeof get>("/api/products.json", { fetch })

        return {
            status: 200, 
            props: {
                products
            }
        }
    }
</script>

<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"

    export let products: MetaProduct[]
    
    $: console.log({ products })
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {#each products as { product, cms } (cms.id)}
        <div class="flex flex-col items-start bg-center bg-cover py-12" style={product.images.length > 0 ? `background-image: url(${product.images[0]})` : ''}>
            <span>{product.name}</span>
            <span>{product.description}</span>
        </div>
    {/each}
</section>
