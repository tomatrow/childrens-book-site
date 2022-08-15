import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/types/kit"
import { getResources } from "../_utility"

export const GET: RequestHandler<Locals, unknown, any[]> = async ({ params }) => {
    return {
        status: 200,
        body: await getResources(params.resource)
    }
}
