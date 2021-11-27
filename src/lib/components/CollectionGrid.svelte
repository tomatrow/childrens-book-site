<script lang="ts">
    import { build } from "optional-default-site-kit/functions/build"
    import type { CollectionItem } from "$lib/types/models"
    import Link from "$lib/components/Link.svelte"

    export let items: CollectionItem[] = []
</script>

<section class={build("container mx-auto", items.length && "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4")}>
    {#each items as { title, image, link } (link.href)}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a sveltekit:prefetch class="overflow-hidden relative block aspect-w-1 aspect-h-1" {...link}>
            <div class="duration-[425ms] z-[-1] absolute inset-0 gradient-overlay" style={build(image?.src && `--gradient-background: url(${image.src})`)}/>
            {#if title}
                <div class="flex justify-center items-center h-full text-white">
                    {title}
                </div>
            {/if}
        </a>
    {:else}
        <slot name="empty">
            <div class="p-32 gap-16 flex flex-col justify-center mx-auto items-center">
                <div>Nothing here...</div>
                <Link href="/" hollow="primary">
                    Home
                </Link>
            </div>
        </slot>
    {/each}
</section>

<style lang="postcss">
    a:hover .gradient-overlay {
        @apply scale-110;
    }
</style>
