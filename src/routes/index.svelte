<script lang="ts" context="module">
    import { request } from "$lib/common/request"
    import type { Load } from "@sveltejs/kit"

    export const load: Load = async ({ fetch }) => {
        const products = await request("/api/products.json", { fetch })
        
        return {
            status: 200, 
            props: {
                products
            }
        }
    }
</script>

<script lang="ts">
    import type { Stripe } from "stripe"
    import { Button, Hero, Typeset, Link, Book } from "$lib/components"
    
    export let products: Stripe.Product[]
    let flip: boolean
</script>

<Button class="bg-red-500" on:click={() => flip = !flip}>Flip</Button>
<div class="p-16 flex flex-wrap gap-8">
    <div class="w-96">
        <Book --aspect-h={9} --aspect-w={16} bind:flip>
            <h2 slot="front" class="bg-blue-500  flex flex-col items-center justify-center absolute inset-0">
        		<span>Anthony Burghiss</span>
        		<span>A Catwork Orange</span>
        	</h2>
            <h2 slot="back" class="bg-green-500   flex flex-col items-center justify-center absolute inset-0">
        		<span>Anthony Burghiss</span>
        		<span>A Catwork Orange</span>
                <span>Much back cover text</span>
        	</h2>
        	<h2 slot="left" class="bg-red-500 text-center p-2">
        		<!-- <span>Anthony Burghiss</span> -->
        		<span>A Catwork Orange</span>
        	</h2>
        </Book>
    </div>
    <div class="w-96">
        <Book --aspect-h={2} --aspect-w={1} bind:flip>
            <h2 slot="front" class="bg-blue-500   flex flex-col items-center justify-center absolute inset-0">
        		<span>Anthony Burghiss</span>
        		<span>A Catwork Orange</span>
        	</h2>
        	<h2 slot="left" class="bg-red-500 text-center p-2">
        		<!-- <span>Anthony Burghiss</span> -->
        		<span>A Catwork Orange</span>
        	</h2>
        </Book>
    </div>
    <div class="w-96">
        <Book bind:flip>
            <h2 slot="front" class="bg-blue-500    flex flex-col items-center justify-center absolute inset-0">
        		<span>Anthony Burghiss</span>
        		<span>A Catwork Orange</span>
        	</h2>
        	<h2 slot="left" class="bg-red-500 text-center p-2">
        		<!-- <span>Anthony Burghiss</span> -->
        		<span>A Catwork Orange</span>
        	</h2>
        </Book>
    </div>
</div>

<Hero class="auto-shine h-screen flex justify-start items-end p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover-yasen-alt.jpg" }}>
    <Typeset
        class="text-neutral-content"
        heading="School's back."
        subheading="Get caught up on our classic look"
        >
        <svelte:fragment slot="links">
            <Link fill="primary" href="#">Shop the look</Link>
        </svelte:fragment>
    </Typeset>
</Hero>

<Hero class="auto-shine h-screen flex justify-end items-end p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover.jpg" }}>
    <Typeset 
        align="right"
        class="text-neutral-content"
        heading="Comfort wear"
        subheading="New For 2021" 
        flip>
        <svelte:fragment slot="links">
            <Link fill="secondary" href="#">Shop tops</Link>
            <Link fill="secondary" href="#">Shop all</Link>
        </svelte:fragment>
    </Typeset>
</Hero>
