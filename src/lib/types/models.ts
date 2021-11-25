import type { Stripe } from "stripe"

export interface Route {
    handle: string
    body: string
}

export interface Product extends Route {
    id: string
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

export interface Page extends Route {
    title: string
}

export interface Post extends Route {
    title: string
}

export interface Collection extends Route {
    title: string
    products: Pick<Product, "handle">[]
}

export interface Policy extends Route {
    title: string
}
