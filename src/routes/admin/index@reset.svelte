<script lang="ts" context="module">
    export const router = false
</script>

<script lang="ts">
    import { onMount } from "svelte"
    import { config } from "$lib/data/config"
    import { browser } from "$app/env"

    if (browser) {
        // @ts-ignore
        window.CMS_MANUAL_INIT = true
        onMount(async () => {
            const module = await import("netlify-cms")
            module.init({ config })
        })
    }
</script>

<div id="nc-root" />
    