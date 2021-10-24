<script lang="ts">
    import type { Image } from "$lib/types/models"
    import Anchor from "$lib/components/Anchor.svelte"

    let clazz = ""
    export { clazz as class }
    export let image: Image = undefined
    export let id: string = undefined
</script>

<section class="relative {clazz}">
    <Anchor {id} />
    <slot />
    {#if image?.src}
        <div
            class="bg-fixed bg-cover bg-center z-[-1] absolute inset-0 w-full h-full"
            style="background-image: url({image.src})"
        />
    {/if}
</section>
