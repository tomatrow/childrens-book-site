<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getCollections } from "$lib/common/api"

    export const load: Load = async () => {
        return {
            status: 200, 
            props: {
                collections: await getCollections()
            }
        }
    }
</script>

<script lang="ts">
    import type { Collection } from "$lib/types/models"

    export let collections: Collection[]
</script>

<section class="flex flex-col">
    <h1>All Collections</h1>
    
    {#each collections as {title, handle}}
        <a href="/pages/{handle}">{title}</a>
    {/each}
</section> 
