<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPolicy } from "$lib/common/api"

    export const load: Load = async ({ page }) => {
        return {
            status: 200, 
            props: {
                policy: await getPolicy(page.params.handle)
            }
        }
    }
</script>

<script lang="ts">
    import type { Policy } from "$lib/types/models"
    import { Article } from "$lib/components"

    export let policy: Policy
</script>

<Article title={policy.title}  body={policy.body} />