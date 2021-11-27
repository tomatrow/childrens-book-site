<script lang="ts" context="module">
    export enum Size {
        small = "small",
        medium = "medium",
        large = "large"
    }
    export enum Alignment {
        left = "left",
        center = "center",
        right = 'right"'
    }
</script>

<script lang="ts">
    import type * as Models from "$lib/types/models"
    import Link from "$lib/components/Link.svelte"
    import { buildClasses } from "$lib/actions/classes"
    import { Heading } from "$lib/modules/auto-a11y-heading"
    import type { ColorKey } from "$lib/types/colors"
    import { Color } from "$lib/types/colors"
    import { fade, fly } from "svelte/transition"
    import IntersectionObserver from "svelte-intersection-observer"

    let element: HTMLElement

    let clazz = ""
    export { clazz as class }

    export let heading: string = undefined
    export let subheading: string = undefined
    export let links: Models.Link[] = []

    export let flip: Boolean = false
    
    export let color: ColorKey = Color.primary
    export let align: keyof typeof Alignment = Alignment.left
    export let size: keyof typeof Size = Size.medium
    
    $: classes = buildClasses(
        "flex flex-col gap-3 relative",
        clazz,
        align === "left" && "items-start", 
        align === "right" && "items-end", 
        align === "center" && "items-center"
    )
    
    const first = { y: 200, opacity: 0.25, duration: 500, delay: 100 }
    const second = { y: 200, opacity: 0.25, duration: 400, delay: first.duration + first.delay}
    const third = { duration: 425, delay: second.duration + second.delay }
</script>

<IntersectionObserver {element} once let:intersecting>
    <div bind:this={element} class={classes}>
        <div class="overflow-hidden">
            {#if intersecting}
                <div in:fly={flip ? second : first}>
                    <Heading class="text-7xl font-bold tracking-ultra py-4">
                        <slot name="heading" {heading}>
                            {heading}
                        </slot>
                    </Heading>
                </div>
            {/if}
        </div>
    
        <div class="overflow-hidden" class:order-first={flip}>
            {#if intersecting && ($$slots.subheading || subheading)}
                <div in:fly={flip ? first : second} class="text-lg {flip ? 'uppercase tracking-wide' :''}">
                    <slot name="subheading" {subheading}>
                        {subheading}
                    </slot>
                </div>
            {/if}
        </div>

        <slot />

        {#if intersecting && ($$slots.links || links.length > 0)}
            <div class="flex gap-4" in:fade={third}>
                <slot name="links" {links} {color}>
                    {#each links as link}
                        <Link fill={color} {...link}/>
                    {/each}
                </slot>
            </div>
        {/if}
    </div>
</IntersectionObserver>
