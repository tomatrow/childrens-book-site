// import type { RequestHandler } from "@sveltejs/kit"
import type { Typify } from "$lib/types/utility"
import type { MetaProduct, Product } from "$lib/types/models"
import { stripe } from "$lib/common/stripe"
import { mapExpandedPrice } from "$lib/common/utility"
import { getResource } from "../_utility"
import type { RequestHandler } from "./__types/[handle]"

export const GET: RequestHandler = async ({ params }) => {
    const cmsProduct = (await getResource("products", params.handle)) as Product

    const { data } = await stripe.prices.list({
        expand: ["data.product"],
        product: cmsProduct.id,
        limit: 1
    })

    return {
        status: 200,
        body: mapExpandedPrice(data[0], [cmsProduct])
    }
}
