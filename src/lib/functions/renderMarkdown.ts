import { unified } from "unified"
import remarkParse from "remark-parse"
import remark2rehype from "remark-rehype"
import stringify from "rehype-stringify"

const processor = unified()
    .use(remarkParse) // parse into markdown syntax tree
    .use(remark2rehype) // convert to html syntax tree
    .use(stringify) // turn html syntax tree to html

export function renderMarkdown(value: string) {
    return String(processor.processSync(value))
}
