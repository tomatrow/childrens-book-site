import type { Stripe } from "stripe"
import type { MetaProduct } from "$lib/types/models"

export function mapExpandedPrice(price: Stripe.Price) {
    const product = price.product as Stripe.Product
    price.product = product.id

    // const products = import.meta.globEager("/src/lib/data/products/*.json")

    // const cms = store.products.find(({ id }) => id === product.id)
    const cms = {}

    if (!cms) throw new Error(`Product id (${product.id}) not found in cms`)

    return {
        price,
        product,
        cms
    } as MetaProduct
}
