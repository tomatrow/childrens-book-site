import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/types/kit"
import { readJson } from "./index.json"

export const get: RequestHandler<Locals, unknown, any> = async ({ params }) => {
    return {
        status: 200,
        body: await readJson(`src/lib/data/${params.resource}/${params.handle}.json`)
    }
}
