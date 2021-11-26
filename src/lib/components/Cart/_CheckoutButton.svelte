<script lang="ts">
    import Link from "$lib/components/Link.svelte"
    import { getCheckoutSession } from "$lib/common/api"
    import { cart } from "$lib/common/cart"
    import _ from "lodash"
    import { build } from "optional-default-site-kit/functions/build"

    let href: string

    const fetchCheckoutSession = _.debounce(async () => {
        if ($cart.length === 0) return  
        const { link } = await getCheckoutSession($cart)
        href = link
    }, 1000)

    $: if ($cart) {
        href = ""
        fetchCheckoutSession()
    }
</script>

<Link fill="primary" {href} class={build("block text-white", !href && "pointer-events-none")}>Checkout</Link>