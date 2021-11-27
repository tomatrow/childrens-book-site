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
    import { Article } from "$lib/components"

    export let page: Page
</script>

<Article title={page.title} image={page.image} body={page.body} />