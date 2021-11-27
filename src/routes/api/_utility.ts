import { promises as fs } from "fs"
import glob from "tiny-glob"

export async function readJson(filepath: string) {
    return await fs.readFile(filepath, "utf-8").then(JSON.parse)
}

export async function getResource(resource: string, handle: string) {
    return await readJson(`src/lib/data/${resource}/${handle}.json`)
}

export async function getResources(resource: string) {
    const files = await glob(`src/lib/data/${resource}/*.json`)
    return await Promise.all(files.map(readJson))
}
