import { serverRequest } from "optional-default-site-kit/functions/request"
import type * as Product from "src/routes/api/products/[handle].json"
import type * as Products from "src/routes/api/products/index.json"
import type * as Resource from "src/routes/api/[resource]/[handle].json"
import type * as Resources from "src/routes/api/[resource]/index.json"
import type { Page, Post, Collection, Policy } from "$lib/types/models"

export const getBase = () => {
    return import.meta.env.VITE_BASE_URL
}

const getResource = async (resource: string, handle: string) => {
    return await serverRequest<typeof Resource.get>(getBase() + `/api/${resource}/${handle}.json`)
}

const getResources = async (resource: string) => {
    return await serverRequest<typeof Resources.get>(getBase() + `/api/${resource}.json`)
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
    return await serverRequest<typeof Products.get>(getBase() + "/api/products.json")
}

export const getProduct = async (handle: string) => {
    return await serverRequest<typeof Product.get>(getBase() + `/api/products/${handle}.json`)
}
