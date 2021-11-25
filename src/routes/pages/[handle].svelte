<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPage } from "$lib/common/api"

    export const load: Load = async ({ page }) => {
        return {
            status: 200, 
            props: {
                page: await getPage(page.params.handle)
            }
        }
    }
</script>

<script lang="ts">
    import type { Page } from "$lib/types/models"

    export let page: Page
</script>

<section class="flex flex-col">
    <h1>{page.title}</h1>
    <div>
        {@html page.body}
    </div>
</section> 
