<script lang="ts">
    import type { MetaProduct } from "$lib/types/models"

    let clazz = ""
    export { clazz as class }
    export let metaProduct: MetaProduct
</script>

<section class="flex flex-col {clazz}" {...$$restProps}>
    <span>{metaProduct.product.name}</span>
    {#if metaProduct.product.images.length > 0}
        <img alt={metaProduct.product.name} src={metaProduct.product.images[0]} />
    {/if}
</section>