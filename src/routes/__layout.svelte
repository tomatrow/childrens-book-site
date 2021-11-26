<script lang="ts" context="module">
    import "../app.postcss"    
    import { installFetch } from "optional-default-site-kit/functions/request"
    import type { Load } from "@sveltejs/kit"
    import { getProducts } from "$lib/common/api"

    export const load: Load = async ({ fetch }) => {
        installFetch(fetch)
        return { 
            status: 200,
            props: {
                metaProducts: await getProducts()
            }
        }
    }
</script>

<script lang="ts">
    import { Cart } from "$lib/components"
    import type { MetaProduct } from "$lib/types/models"

    export let metaProducts: MetaProduct[]
    let visible: boolean
</script>

<Cart bind:visible {metaProducts} />

<slot />
