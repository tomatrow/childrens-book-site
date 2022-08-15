import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"

// import {
//     formatRequest,
//     formatResponse
// } from "optional-default-site-kit/functions/formatRequestResponse"
import { installFetch } from "optional-default-site-kit/functions/request"

const handleLogging: Handle = async ({ event, resolve }) => {
    installFetch(fetch)
    // const start = performance.now()
    const response = await resolve(event)
    // const elapsed = performance.now() - start
    // const time = (elapsed < 0.001 ? 0 : elapsed).toPrecision(3)

    // const headers = ["content-type"]

    // console.log(
    //     `[log] ${formatRequest({ request, headers })} ${formatResponse({
    //         response,
    //         headers
    //     })} ${time}ms`
    // )

    return response
}

export const handle: Handle = sequence(handleLogging)
