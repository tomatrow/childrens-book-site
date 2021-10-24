import type { RequestHandler } from "@sveltejs/kit"
import { browser } from "$app/env"

export type Method = "get" | "put" | "post" | "patch" | "delete"

export type UnpackHandler<Handler> = Handler extends RequestHandler<
    infer Locals,
    infer Input,
    infer Output
>
    ? { locals: Locals; input: Input; output: Output }
    : unknown

export interface RequestConfig {
    method?: Method
    body?: any
    headers?: HeadersInit
    fetch?: typeof fetch
}

export interface ServerRequestConfig<Handler extends RequestHandler = RequestHandler>
    extends RequestConfig {
    body?: UnpackHandler<Handler>["input"]
}

export async function serverRequest<Handler extends RequestHandler = RequestHandler>(
    url: string,
    config: ServerRequestConfig = {}
): Promise<UnpackHandler<Handler>["output"]> {
    return await request(url, config)
}

export async function request(url: string, config: RequestConfig = {}) {
    const { body } = config
    const headers = new Headers(config.headers ?? {})

    const init: RequestInit = {
        method: config.method ?? (body ? "post" : "get"),
        headers
    }

    if (body) {
        init.body = typeof body === "string" ? body : JSON.stringify(body)
        if (!headers.has("content-type"))
            headers.set("content-type", "application/json; charset=UTF-8")
    }

    const fetch = config.fetch ?? (browser ? window.fetch : globalThis.fetch)
    const response = await fetch(url, init)

    if (response.status < 200 || response.status >= 300)
        return Promise.reject({
            status: response.status,
            error: response.statusText
        })

    if (response.headers.get("content-type").match(/application\/json/))
        return await response.json()
    else if (response.headers.get("content-type").match(/text\/plain/)) return await response.text()
    else if (response.headers.get("content-type").match(/multipart\/form-data/))
        return await response.formData()
    else return await response.blob()
}
