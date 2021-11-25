<script lang="ts" context="module">
    import { installFetch } from "optional-default-site-kit/functions/request"
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ fetch }) => {
        installFetch(fetch)
        return { status: 200 }
    }
</script>

<script lang="ts">
    import "../app.postcss"    
</script>

<slot></slot>