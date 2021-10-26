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
    import { Carousel } from 'renderless-svelte'

    export let products: Stripe.Product[]
    let flip: boolean
    let open: boolean
    
    const items = [null, [11,12], null]
    
    
    function prev(index: number, { previous }) {
        console.log(`prev(${index})`)
        previous()
    }
    function next(index: number, { next }) {
        console.log(`next(${index})`)
        next()
    }
    
    function handleEndpaperClick(setIndex) {
        console.log({ setIndex })
        open = false
        flip = true
        setIndex(0)
    }
</script>

<Button class="bg-red-500" on:click={() => flip = !flip}>Flip</Button>
<Button class="bg-red-500" on:click={() => open = !open}>Open</Button>

<div class="p-16 flex flex-wrap gap-8">
    <div class="w-[40%] mx-auto transition duraton-425" style="{open ? 'transform: translate(50%, 0)' : ''}">
        <Carousel {items} let:controls let:currentIndex let:setIndex>
            <Book bind:flip bind:open  --aspect-h={1080} --aspect-w={1400}>
                <img class="h-full w-full object-contain" slot="front-cover" src="/images/the-first-noel/front-cover.webp" on:click={() => (open = true)} />
            	<div slot="spine" class="bg-[#142642] text-[#eea905] text-center w-full inset-0">
            		The First Noel
            	</div>
                <img slot="front-endpaper" class="absolute inset-0" src="/images/the-first-noel/0010.jpg" on:click={() => (open = false)} />
                <img slot="back-endpaper" class="absolute inset-0" src="/images/the-first-noel/0013.jpg" on:click={() => handleEndpaperClick(setIndex)}>
                <img slot="back-cover" class="h-full w-full object-contain" src="/images/the-first-noel/back-cover.jpg" on:click={() => (flip = false)} />
                {#each items as payload, index}
                    {#if payload}
                        <div class="page" style="--index: {index}; --length: {items.length}" class:turned={currentIndex >= index}>
                            <img class="page-back" src="/images/the-first-noel/00{payload[1]}.jpg" on:click={controls.previous} />
                            <img class="page-front" src="/images/the-first-noel/00{payload[0]}.jpg" on:click={controls.next} />
                        </div>
                    {/if}
                {/each}
            </Book>
        </Carousel>
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
