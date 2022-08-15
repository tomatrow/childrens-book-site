import type { RequestHandler } from "@sveltejs/kit"
import type { Typify } from "$lib/types/utility"
import type { MetaProduct } from "$lib/types/models"
import { stripe } from "$lib/common/stripe"
import { mapExpandedPrice } from "$lib/common/utility"
import { getResources } from "../_utility"

export const GET: RequestHandler<{}, Typify<MetaProduct[]>> = async () => {
    const { data } = await stripe.prices.list({
        expand: ["data.product"],
        limit: 100
    })

    const cmsProducts = await getResources("products")

    let items: MetaProduct[] = []
    try {
        items = data.map(price => mapExpandedPrice(price, cmsProducts))
    } catch (error) {
        console.error(error)
    }

    return {
        status: 200,
        body: items
    }
}
