<script context="module" lang="ts">
    import { buildClasses } from "$lib/actions/classes"
    import Colors from "$lib/data/colors.json"

    export interface ClassesConfig {
        hollow?: ColorKey
        fill?: ColorKey
        line?: ColorKey
        active?: boolean
    }

    export function createClasses({
        hollow,
        fill,
        active,
        line
    }: ClassesConfig) {
        return buildClasses(
            (hollow || fill || line) && "text-sm uppercase tracking-ultra text-center py-3 px-5",
            active && "ease-in-out duration-[425ms]",
            hollow && `border-${hollow} border border-opacity-50` + (active ? " hover:border-opacity-100" : ""),
            fill && `bg-${fill} shine shine-repeat` + (active ? ` hover:brightness-110` : "")
        )
    }
</script>

<script lang="ts">
    import { line as lineAction } from "$lib/actions/line"
    import type { LineActionConfig } from "$lib/actions/line"
    import type { ColorKey } from "$lib/types/colors"
    
    let clazz = ""
    export { clazz as class }

    export let fill: ColorKey = undefined
    export let hollow: ColorKey = undefined
    export let line: ColorKey = undefined
    export let active: boolean = true
    
    export let href: string
    export let label: string = undefined
    
    $: classes = createClasses({
        hollow,
        fill,
        line,
        active
    })

    let lineConfig: LineActionConfig
    $: lineConfig = line ? { color: Colors[line], track: active } : false
</script>

<a {href} class="{clazz} {classes}" use:lineAction={lineConfig} on:click {...$$restProps}>
    {#if $$slots.default}
        <slot {label} />
    {:else if label}
        {label}
    {/if}
</a>
