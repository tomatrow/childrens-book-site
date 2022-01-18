<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { getProduct } from "$lib/common/api"

    export const load: Load = async ({ page }) => {
        const metaProduct = await getProduct(page.params.handle)

        return {
            status: 200, 
            props: {
                metaProduct
            }
        }
    }
</script>

<script lang="ts">
    import '@splidejs/splide/dist/css/splide.min.css';
    import type { MetaProduct } from "$lib/types/models"
    import { add } from "$lib/common/cart"
    import { Button } from "$lib/components"
    import { renderMarkdown } from "$lib/functions/renderMarkdown"
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import type { Options } from '@splidejs/splide';
    import { onMount } from 'svelte';
    import { drift } from "$lib/actions/drift"

    export let metaProduct: MetaProduct
    
    let main: Splide
    let thumbs: SplideSlide

    const mainOptions: Options = {
        type      : 'loop',
        perPage   : 1,
        perMove   : 1,
        pagination: false,
        arrows: false
    }

    const thumbsOptions: Options = {
        type        : 'slide',
        rewind      : true,
        gap         : '1rem',
        pagination  : false,
        fixedWidth  : 75,
        fixedHeight : 75,
        cover       : true,
        focus       : 'center',
        isNavigation: true,
        updateOnMove: true,
        arrows: false
    }
    
    let productCopy: HTMLElement

    onMount( () => {
        if (main && thumbs) 
            main.sync(thumbs.splide)
    })
</script>

<div class="container mx-auto grid grid-cols-1 md:grid-cols-2 place-items-center gap-8 px-4 py-8">
    <div class="max-w-[24rem]   space-y-4">
        <Splide options={ mainOptions } bind:this={ main }>
            {#each metaProduct.cms.images as image}
                <SplideSlide>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img use:drift={{
                        sourceAttribute: "src",
                        paneContainer: productCopy
                    }} class="pointer-events-none sm:pointer-events-auto" {...image} />
                </SplideSlide>
            {/each}
        </Splide>
        
        <Splide options={ thumbsOptions } bind:this={ thumbs }>
            {#each metaProduct.cms.images as image}
                <SplideSlide>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img {...image} />
                </SplideSlide>
            {/each}
        </Splide>
    </div>

    <section class="relative w-full py-32" bind:this={productCopy}>
        <h1>{metaProduct.product.name}</h1>
        <div class="prose">
            {@html renderMarkdown(metaProduct.cms.body)}
        </div>
        <Button class="text-white" fill="primary" on:click={() => add(metaProduct.price.id)}>Add to Cart</Button>
    </section>
</div>
