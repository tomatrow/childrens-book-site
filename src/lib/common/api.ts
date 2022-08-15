import { request } from "optional-default-site-kit/functions/request"
import type * as Product from "src/routes/api/products/[handle].json"
import type * as Products from "src/routes/api/products/index.json"
import type * as Resource from "src/routes/api/[resource]/[handle].json"
import type * as Resources from "src/routes/api/[resource]/index.json"
import type * as Session from "src/routes/api/checkout/session.json"
import type { Page, Post, Collection, Policy } from "$lib/types/models"
import type { Stripe } from "stripe"

export const getBase = () => {
    return import.meta.env.VITE_BASE_URL
}

const getResource = async (resource: string, handle: string) => {
    return await request<typeof Resource.get>(getBase() + `/api/${resource}/${handle}.json`)
}

const getResources = async (resource: string) => {
    return await request<typeof Resources.get>(getBase() + `/api/${resource}.json`)
}

export const getPage = async (handle: string) => {
    return (await getResource("pages", handle)) as Page
}

export const getPages = async () => {
    return (await getResources("pages")) as Page[]
}

export const getPost = async (handle: string) => {
    return (await getResource("posts", handle)) as Post
}

export const getPosts = async () => {
    return (await getResources("posts")) as Post[]
}

export const getCollection = async (handle: string) => {
    return (await getResource("collections", handle)) as Collection
}

export const getCollections = async () => {
    return (await getResources("collections")) as Collection[]
}

export const getPolicy = async (handle: string) => {
    return (await getResource("policies", handle)) as Policy
}

export const getPolicies = async () => {
    return (await getResources("policies")) as Policy[]
}

export const getProducts = async () => {
	try {
    	return await request<typeof Products.get>(getBase() + "/api/products.json")
	} catch (error) {
		console.error(error)
	}
}

export const getProduct = async (handle: string) => {
    return await request<typeof Product.get>(getBase() + `/api/products/${handle}.json`)
}

export const getCheckoutSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
) => {
    return await request<typeof Session.post>(getBase() + `/api/checkout/session.json`, {
        body: {
            lineItems
        }
    })
}
