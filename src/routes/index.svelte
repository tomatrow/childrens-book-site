<script lang="ts" context="module">
    import { getProducts } from "$lib/common/api"
    import type { Load } from "@sveltejs/kit"

    export const load: Load = async () => {
        let products = []

        try {
            products = await getProducts()
        } catch (error) {
            console.error(error)
        }

        return {
            status: 200, 
            props: {
                products
            }
        }
    }
</script>

<script lang="ts">
    import { Button, Hero, Typeset, Link } from "$lib/components"
    // import { Book, Page } from "3d-book-svelte"

    let flip: boolean
    let open: boolean
</script>


<Hero class="auto-shine flex justify-start items-end p-8" image={{ src: "/images/stormlight/rhythm-of-war-cover-yasen-alt.jpg" }}>
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

<div class="p-16 flex flex-wrap gap-8">
    <div class="w-[40%] mx-auto transition duration-425" style={open ? 'transform: translate(50%, 0)' : ''}>
        <!-- <Book class="relative" bind:flip bind:open --aspect-h={1080} --aspect-w={1400} --thickness="3rem">
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
        	<div slot="spine" class="bg-[#142642] text-[#eea905] flex items-center justify-center ">
        		The First Noel
        	</div>
        </Book> -->
    </div>
</div>
