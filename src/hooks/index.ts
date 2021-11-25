import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import type { Locals } from "./index.type"
import { installFetch } from "optional-default-site-kit/functions/request"

installFetch(fetch)

const handleLogging: Handle<Locals> = async ({ request, resolve }) => {
    console.log(request.method, request.path, request.query)
    return await resolve(request)
}

export const handle: Handle<Locals> = sequence(handleLogging)
