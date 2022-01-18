<script lang="ts">
    import { line as lineAction } from "$lib/actions/line"
    import type { LineActionConfig } from "$lib/actions/line"
    import type { ColorKey } from "$lib/types/colors"
    import { createClasses } from "$lib/components/Link.svelte"
    import Colors from "$lib/data/colors.json"

    export let type: "button" | "submit" | "reset" = "button"

    let clazz = undefined
    export { clazz as class }
    export let label: string = undefined
    export let fill: ColorKey = undefined
    export let hollow: ColorKey = undefined
    export let line: ColorKey = undefined
    export let active: boolean = true
    
    $: classes = createClasses({
        hollow,
        fill,
        line,
        active
    })

    let lineConfig: LineActionConfig
    $: lineConfig = line ? { color: Colors[line], track: active } : false
</script>

<button class="{clazz} {classes}" use:lineAction={lineConfig} {type} on:click {...$$restProps}>
    {#if $$slots.default}
        <slot {label} />
    {:else if label}
        {label}
    {/if}
</button>

