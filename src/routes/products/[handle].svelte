<script lang="ts" context="module">
    import { serverRequest } from "optional-default-site-kit"
    import type { Load } from "@sveltejs/kit"
    import type { get } from "src/routes/api/products/[handle].json"

    export const load: Load = async ({ fetch, page }) => {
        const product = await serverRequest<typeof get>(`/api/products/${page.params.handle}.json`, { fetch })

        return {
            status: 200, 
            props: {
                product
            }
        }
    }
</script>

<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"

    export let product: MetaProduct
    
    $: console.log({ product })
</script>

<!-- {#await compile(product.cms.body) then result}
    {@html result.code}
{/await} -->