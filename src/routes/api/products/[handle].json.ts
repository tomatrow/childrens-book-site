import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/types/kit"
import type { Typify } from "$lib/types/utility"
import type { MetaProduct } from "$lib/types/models"
import { stripe } from "$lib/common/stripe"
import { mapExpandedPrice } from "$lib/common/utility"

export const get: RequestHandler<Locals, unknown, Typify<MetaProduct>> = async ({ params }) => {
    try {
        //         const { id } = store.products.find(({ handle }) => handle === params.handle)
        //
        //         const { data } = await stripe.prices.list({
        //             expand: ["data.product"],
        //             product: id,
        //             limit: 1
        //         })
        //
        //         return {
        //             status: 200,
        //             body: mapExpandedPrice(data[0])
        //         }
    } catch (error) {
        console.error(error)
    }
}
