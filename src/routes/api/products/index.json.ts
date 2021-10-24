import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/types/kit"
import type { Typify } from "$lib/types/utility"
import type { MetaProduct } from "$lib/types/models"
import { stripe } from "$lib/common/stripe"
import { mapExpandedPrice } from "$lib/common/utility"

export const get: RequestHandler<Locals, unknown, Typify<MetaProduct[]>> = async () => {
    const { data } = await stripe.prices.list({
        expand: ["data.product"],
        limit: 100
    })

    return {
        status: 200,
        body: data.map(mapExpandedPrice)
    }
}
