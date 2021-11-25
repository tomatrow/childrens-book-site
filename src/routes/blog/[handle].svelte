<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPost } from "$lib/common/api"

    export const load: Load = async ({ page }) => {
        return {
            status: 200, 
            props: {
                post: await getPost(page.params.handle)
            }
        }
    }
</script>

<script lang="ts">
    import type { Post } from "$lib/types/models"

    export let post: Post
</script>

<section class="flex flex-col">
    <h1>{post.title}</h1>
    <div>
        {@html post.body}
    </div>
</section> 
