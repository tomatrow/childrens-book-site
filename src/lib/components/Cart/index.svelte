<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"
    import type { LineItem } from "$lib/common/cart"
    import { cart } from "$lib/common/cart"
    import Button from "$lib/components/Button.svelte"
    import { fly, fade} from "svelte/transition"
    import { build } from "optional-default-site-kit/functions/build"
    import LineItemRow from "./_LineItemRow.svelte"
    import CheckoutButton from "./_CheckoutButton.svelte"
    import { formatMoney } from "optional-default-site-kit/functions/formatMoney"

    export let metaProducts: MetaProduct[]
    export let visible = false

    function cost({ quantity, price }: LineItem) {
        return metaProducts.find(item => item.price.id === price).price.unit_amount * quantity
    }

    $: subtotal = $cart.map(cost).reduce((a,b) => a + b, 0)
</script>

{#if visible}
    <div on:click={() => (visible = false)} transition:fade class="fixed z-[225] inset-0 bg-white bg-opacity-70" />
    <section transition:fly={{ x: 400 }} class="fixed bg-white z-[250] flex flex-col max-w-md w-full top-0 right-0 bottom-0 divide-y p-8 border">
        <div class="flex justify-between py-4">
            <span class="font-semibold text-4xl">Cart</span>
            <Button on:click={() => (visible = false)}>X</Button>
        </div>
        {#if $cart.length > 0}
            <div transition:fade class="overflow-y-scroll">
                {#each $cart as lineItem, index (lineItem.price)}
                    <LineItemRow class={build("w-full p-4", (index % 2 === 0) && "bg-gray-50")} {lineItem} metaProduct={metaProducts.find(item => item.price.id === lineItem.price)} />
                {/each}
            </div>
            <div class="self-end mt-auto w-full">
                <div class="flex justify-between p-4">
                    <span class="uppercase font-thin">Subtotal</span>
                    <span>{formatMoney(subtotal)}</span>
                </div>
                <CheckoutButton />
            </div>
        {:else}
            <div class="flex flex-col gap-4 py-8">
                <span>No items in cart.</span>
            </div>
        {/if}
    </section>
{/if}