import type { Stripe } from "stripe"
import type { MetaProduct, Product } from "$lib/types/models"

export function mapExpandedPrice(price: Stripe.Price, cmsProducts: Product[]) {
    const stripeProduct = price.product as Stripe.Product
    price.product = stripeProduct.id

    const cms = cmsProducts.find(product => product.id === stripeProduct.id)

    if (!cms) throw new Error(`Product id (${stripeProduct.id}) not found in cms`)

    return {
        price,
        product: stripeProduct,
        cms
    } as MetaProduct
}
