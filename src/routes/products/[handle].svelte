<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getProduct } from "$lib/common/api"

    export const load: Load = async ({ page }) => {
        const metaProduct = await getProduct(page.params.handle)

        return {
            status: 200, 
            props: {
                metaProduct
            }
        }
    }
</script>

<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"
    import { add } from "$lib/common/cart"
    import { Button } from "$lib/components"
    import { renderMarkdown } from "$lib/functions/renderMarkdown"

    export let metaProduct: MetaProduct
</script>

<div class="prose container mx-auto">
    <Button on:click={() => add(metaProduct.price.id)}>Add to Cart</Button>
    <h1>{metaProduct.product.name}</h1>
    {#each metaProduct.product.images as src}
        <img alt="" {src} />
    {/each}
    {@html renderMarkdown(metaProduct.cms.body)}
</div>
