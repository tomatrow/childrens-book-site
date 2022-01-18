import { persist, localStorage } from "@macfja/svelte-persistent-store"
import type { Stripe } from "stripe"
import { writable, derived, get } from "svelte/store"

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem

export const cart = persist(writable<LineItem[]>([]), localStorage(), "book-site-cart")

export const size = derived(cart, $cart =>
    $cart.map(item => item.quantity).reduce((a, b) => a + b, 0)
)

function getItem(price: string) {
    return get(cart).find(item => item.price === price)
}

export function add(price: string, quantity = 1) {
    return set(price, (getItem(price)?.quantity ?? 0) + quantity)
}

export function subtract(price: string, quantity = 1) {
    return set(price, (getItem(price)?.quantity ?? 0) - quantity)
}

export function set(price: string, quantity: number) {
    let modifiedItem: LineItem

    const $cart = get(cart).map(item => {
        if (item.price === price) {
            item.quantity = quantity
            modifiedItem = item
        }
        return item
    })

    if (!modifiedItem) {
        modifiedItem = { price, quantity }
        $cart.push(modifiedItem)
    }

    cart.set($cart.filter(item => item.quantity > 0))

    return modifiedItem
}

export function remove(price: string) {
    return set(price, 0)
}

export function clear() {
    cart.set([])
}
