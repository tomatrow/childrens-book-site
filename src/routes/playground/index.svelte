<script lang="ts">
    import { request } from "optional-default-site-kit/functions/request"
    import { Button } from "$lib/components"
    
    async function run() {
        console.log("running...")
        const response = await request("/graphql", {
            body: {
                query: `
                    {
                        hello
                    }
                `
            }
        })
        console.log("ran...")
        
        console.log({ response })
    }
</script>

<Button on:click={run}>
    Run
</Button>