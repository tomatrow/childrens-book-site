<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getCollection } from "$lib/common/api"

    export const load: Load = async ({ page }) => {
        return {
            status: 200, 
            props: {
                collection: await getCollection(page.params.handle)
            }
        }
    }
</script>

<script lang="ts">
    import type { Collection } from "$lib/types/models"

    export let collection: Collection
</script>

<section class="flex flex-col">
    <h1>{collection.title}</h1>
    <div class="prose">
        {@html collection.body}
    </div>
    <div>
        
    </div>
</section> 
