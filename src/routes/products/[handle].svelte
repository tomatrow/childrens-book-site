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
    import { micromark } from 'micromark'
    import { add } from "$lib/common/cart"
    import { Button } from "$lib/components"

    export let metaProduct: MetaProduct
</script>

<Button on:click={() => add(metaProduct.price.id)}>Add to Cart</Button>
<h1>{metaProduct.product.name}</h1>
<div class="prose">
    {@html micromark(metaProduct.cms.body)}
</div>
