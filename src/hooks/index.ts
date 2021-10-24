import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import type { Locals } from "./index.type"

const handleLogging: Handle<Locals> = async ({ request, resolve }) => {
    console.log(request.method, request.path, request.query)
    return await resolve(request)
}

export const handle: Handle<Locals> = sequence(handleLogging)
