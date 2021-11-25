import type { RequestHandler } from "@sveltejs/kit"
import type { Locals } from "$lib/types/kit"
import { promises as fs } from "fs"
import glob from "tiny-glob"

export async function readJson(filepath: string) {
    return await fs.readFile(filepath, "utf-8").then(JSON.parse)
}

export const get: RequestHandler<Locals, unknown, any[]> = async ({ params }) => {
    const files = await glob(`src/lib/data/${params.resource}/*.json`)
    return {
        status: 200,
        body: await Promise.all(files.map(readJson))
    }
}
