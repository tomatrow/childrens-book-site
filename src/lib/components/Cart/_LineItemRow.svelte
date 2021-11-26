<script lang="ts">
    import type { LineItem } from "$lib/common/cart"
    import { add, set, subtract } from "$lib/common/cart"
    import type { MetaProduct } from "$lib/types/models"
    import Button from "$lib/components/Button.svelte"
    
    let clazz = ""
    export { clazz as class }
    export let lineItem: LineItem
    export let metaProduct: MetaProduct
    export let value: number = lineItem.quantity
</script>


<section class="flex gap-4 {clazz}">
    <div class="w-32">
        {#if metaProduct.product.images.length > 0}
            <img  alt={metaProduct.product.name} src={metaProduct.product.images[0]} />
        {/if}
    </div>
    <div class="flex flex-col gap-4 w-full">
        <div class="font-thin ">{metaProduct.product.name}</div>
        <div class="flex justify-between items-center gap-4">
            <div class="flex justify-between items-center border">
                <Button class="p-2 hover:bg-black hover:text-white duration-[425ms]" on:click={() => value = subtract(lineItem.price).quantity}>-</Button>
                <input type="number" min="0" bind:value class="p-2 w-10 bg-transparent" on:blur={() => set(lineItem.price, value)} />
                <Button class="p-2 hover:bg-black hover:text-white duration-[425ms]" on:click={() => value = add(lineItem.price).quantity}>+</Button>
            </div>
            <span>${metaProduct.price.unit_amount/100}</span>
        </div>
    </div>
</section>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
    input[type=number] {
        -moz-appearance: textfield; /* Firefox */
    }
</style>