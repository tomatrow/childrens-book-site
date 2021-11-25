<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getPosts } from "$lib/common/api"

    export const load: Load = async () => {
        return {
            status: 200, 
            props: {
                posts: await getPosts()
            }
        }
    }
</script>

<script lang="ts">
    import type { Post } from "$lib/types/models"

    export let posts: Post[]
</script>

<section class="flex flex-col">
    <h1>All Posts</h1>
    
    {#each posts as {title, handle}}
        <a href="/blog/{handle}">{title}</a>
    {/each}
</section> 
