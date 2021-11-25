<script context="module">
	export const load = async({ fetch }) => {
		const query = `
			query Doubled($x: Int) {
				double(number: $x)
			}
		`;
		const variables = {
			x: 19,
		};
		const response = await fetch("/graphql", {
			body: JSON.stringify({ query, variables }),
			headers: {
				"Authorization": "Token ABC123",
				"Content-Type": "application/json",
			},
			method: "POST"
		});
		
        const { data, errors } = await response.json();
        
        console.log({ data, errors })
		if (errors) return {
			error: new Error(errors.map(({ message }) => message).join("\\n")),
			status: 500,
		};
		return {
            status: 200,
			props: {
				double: data.double,
			},
		};
	}
</script>

<script lang="ts">
    import { request } from "optional-default-site-kit/functions/request"
    import { Button } from "$lib/components"
    
    export let double
    
    console.log({ double })
    
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