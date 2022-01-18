import type { Stripe } from "stripe"

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

export interface CollectionItem {
    title?: string
    image?: Image
    link: Link
}

export interface Route {
    handle: string
    body: string
}

export interface Product extends Route {
    id: string
    images: Image[]
}

export interface Page extends Route {
    title: string
    image: Image
}

export interface Post extends Route {
    title: string
    image: Image
}

export interface Collection extends Route {
    title: string
    image: Image
    products: string[]
}

export interface Policy extends Route {
    title: string
}
