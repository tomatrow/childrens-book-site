<script lang="ts" context="module">
    import "optional-default-floaty-sveltekit-theme/styles.css"
    import "../app.postcss"    
    import { installFetch } from "optional-default-site-kit/functions/request"
    import type { Load } from "@sveltejs/kit"
    import { getProducts } from "$lib/common/api"

    export const load: Load = async ({ fetch }) => {
        installFetch(fetch)
        
        const [metaProducts] = await Promise.all([getProducts()])
        
        return { 
            status: 200,
            props: {
                metaProducts 
            }
        }
    }
</script>

<script lang="ts">
    import { build } from "optional-default-site-kit/functions/build"
    import { Cart, Button } from "$lib/components"
    import type { MetaProduct } from "$lib/types/models"
    import { Main, Primary, PrimaryCompact, Secondary, Navbar } from "optional-default-floaty-sveltekit-theme"
    import { items as primaryMenu } from "$lib/data/primaryMenu.json"
    import { items as secondaryMenu } from "$lib/data/secondaryMenu.json"
    
    export let metaProducts: MetaProduct[]

    let visible: boolean
    let open = false
</script>

<Cart bind:visible {metaProducts} />

<Navbar class="gap-4 p-4 bg-white z-[200] shadow-lg">
    <a href="/" class="p-4">LOGO</a>

    <Primary class="mx-auto gap-4 " menu={primaryMenu} megaClass="bg-white shadow-xl gap-4 p-4">
        <svelte:fragment slot="link" let:href let:label let:level let:compact>
            <a
                {href}
                class={build(
                    "bg-white",
                    level === 0 && "p-4",
                    level === 1 &&
                        (compact
                            ? "p-4 duration-200 bg-white hover:bg-gray-100 whitespace-nowrap"
                            : "font-black"),
                    level === 2 && compact && "hover:bg-gray-100 duration-200 p-4 whitespace-nowrap"
                )}>{label}</a
            >
        </svelte:fragment>
    </Primary>
    <Button on:click={() => visible = true}>
        Cart
    </Button>
    <button class="hide-if-desktop ml-auto text-black" type="button" on:click={() => (open = !open)}>
        Menu
    </button>
</Navbar>

<Main class="flex flex-col">
    <slot />
    <footer
        class="mt-auto flex flex-col sm:flex-row items-center sm:justify-around gap-4 sm:gap-8 p-4"
    >
        <a href="/" class="p-8">LOGO</a>
        <Secondary menu={secondaryMenu} class="self-stretch sm:mx-auto sm:max-w-lg sm:w-full">
            <svelte:fragment slot="link" let:href let:label let:level let:compact>
                <a
                    {href}
                    class={build(
                        compact && (level === 0 ? "py-2" : "block p-1"),
                        !compact && (level === 0 ? "font-bold p-2" : "px-2 py-1")
                    )}>{label}</a
                >
            </svelte:fragment>
        </Secondary>
        <span class="whitespace-pre">
            {@html "This is a spot\nfor some address\ninfo type stuff."}
        </span>
    </footer>
</Main>

{#if open}
    <PrimaryCompact
        menu={primaryMenu}
        bind:open
        class="p-4"
        rootClass="bg-white bg-opacity-90 z-[300]"
    >
        <svelte:fragment slot="link" let:level let:label let:href>
            <a {href} class="hover:underline">{label}</a>
        </svelte:fragment>
    </PrimaryCompact>
{/if}

<style global lang="postcss">
    :root {
        --floaty-nav-h: 6rem;
        --floaty-control-color: black;
        --floaty-line-color: black;
    }

    .hide-if-mobile {
        display: none;
    }

    @screen sm {
        .hide-if-desktop {
            display: none;
        }
        .hide-if-mobile {
            display: contents;
        }
    }
</style>
