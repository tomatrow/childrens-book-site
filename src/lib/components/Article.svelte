<script lang="ts">
    import type { Image } from "$lib/types/models"
    import { renderMarkdown } from "$lib/functions/renderMarkdown"

    export let title: string
    export let image: Image = undefined
    export let body: string
</script>

<article class="container prose mx-auto p-4 sm:px-0">
    <h1>{title}</h1>
    {#if image}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="" {...image} />
    {/if}
    {@html renderMarkdown(body)}
</article> 
