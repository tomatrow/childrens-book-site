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
    import { Button, Hero, Typeset, Link } from "$lib/components"
    import { Book, Page } from "3d-book-svelte"
    
    export let products: Stripe.Product[]
    let flip: boolean
    let open: boolean
</script>

<Button class="bg-red-500" on:click={() => flip = !flip}>Flip</Button>
<Button class="bg-red-500" on:click={() => open = !open}>Open</Button>

<div class="p-16 flex flex-wrap gap-8">
    <div class="w-[40%] mx-auto transition duraton-425" style={open ? 'transform: translate(50%, 0)' : ''}>
        <Book bind:flip bind:open --aspect-h={1080} --aspect-w={1400} --thickness="3rem">
            <img alt="" slot="front-cover" src="/images/the-first-noel/front-cover.webp" />
            <img alt="" slot="front-endpaper" src="/images/the-first-noel/0010.jpg" />
            {#each [[11,12], [13,14], [15,16], [17,18]] as [front, back]}
                <Page>
                    <img class="" alt="" slot="page-front" src="/images/the-first-noel/00{front}.jpg" />
                    <img class="" alt="" slot="page-back" src="/images/the-first-noel/00{back}.jpg" />
                </Page>
            {/each}
            <img alt="" slot="back-endpaper" src="/images/the-first-noel/0019.jpg" />
            <img alt="" slot="back-cover" src="/images/the-first-noel/back-cover.jpg" />
        	<div slot="spine" class="bg-[#142642] text-[#eea905] flex items-center justify-center w-full inset-0">
        		The First Noel
        	</div>
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
