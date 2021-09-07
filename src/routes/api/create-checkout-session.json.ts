import type { RequestHandler } from "@sveltejs/kit"
import Stripe from "stripe"

const apiKey = process.env["STRIPE_SECRET_KEY"]
const stripeClient = new Stripe(apiKey, { apiVersion: "2020-08-27" })

async function createSessionLink() {
    const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            // {
            //     price: "<price_id>",
            //     quantity: 1
            // }
        ],
        mode: "subscription",
        success_url: import.meta.env.FRONTEND_URL + "/success",
        cancel_url: import.meta.env.FRONTEND_URL + "/cancel"
    })

    return session.url
}

export const get: RequestHandler = async () => {
    try {
        return {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: {
                url: await createSessionLink()
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
