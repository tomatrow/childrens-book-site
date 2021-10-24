import type { RequestHandler } from "@sveltejs/kit"
import { createSessionLink } from "$lib/common/stripe"

export const get: RequestHandler = async () => {
    try {
        return {
            status: 200,
            body: {
                url: await createSessionLink([])
            }
        }
    } catch (error) {
        console.error("checkout error", error)
        return {
            status: 500,
            body: {
                message: "An error occoured"
            }
        }
    }
}
