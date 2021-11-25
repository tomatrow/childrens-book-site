<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPages } from "$lib/common/api"

    export const load: Load = async () => {
        return {
            status: 200, 
            props: {
                pages: await getPages()
            }
        }
    }
</script>

<script lang="ts">
    import type { Page } from "$lib/types/models"

    export let pages: Page[]
</script>

<section class="flex flex-col">
    <h1>All Pages</h1>
    
    {#each pages as {title, handle}}
        <a href="/pages/{handle}">{title}</a>
    {/each}
</section> 
