import Drift from "drift-zoom"
import type { Action } from "optional-default-site-kit/types/action"
import "drift-zoom/dist/drift-basic.css"

export const drift: Action<Drift.Options> = (node, options) => {
    let instance: Drift
    let destroy: Drift["destroy"]

    function update(options: Drift.Options) {
        destroy?.()
        instance = new Drift(node, options)
        destroy = instance.destroy
    }
    
    update(options)
    
    return {
        update,
        destroy
    }
}