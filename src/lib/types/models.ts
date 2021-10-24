import type { Stripe } from "stripe"

export interface Product {
    id: string
    handle: string
    body: string
}

export interface MetaProduct {
    product: Stripe.Product
    price: Stripe.Price
    cms: Product
}

export interface Link {
    href: string
    target?: string
    label?: string
}

export interface Image {
    src: string
    alt?: string
}
