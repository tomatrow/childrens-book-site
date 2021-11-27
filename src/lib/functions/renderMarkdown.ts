import { micromark } from 'micromark'
import { gfm, gfmHtml }from 'micromark-extension-gfm'

export function renderMarkdown(value: string) {
    return micromark(value, { 
        allowDangerousHtml: true,  
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()]
    })
}
