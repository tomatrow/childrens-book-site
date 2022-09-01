<script>
  import Button from "$lib/components/Button.svelte";

  export const min = 1;
  export let max = 10;

  let quantity = 1;

  const setQuantity = (value) => {
    quantity = Math.max(min, Math.min(value, max))
  }
</script>

<div class="flex items-center border-2 border-primary rounded-xl bg-white w-[fit-content]">
  <button 
    on:click={() => setQuantity(quantity - 1)}
    class="h-12 w-12 text-lg font-bold bg-gray-100 rounded-lg"
    disabled={quantity === min}
  >
    -
  </button>
  <input 
    type="number"
    bind:value={quantity}
    on:input={(e) => setQuantity(+e.currentTarget.value)}
    class="w-12 text-center" 
  />
  <button 
    on:click={() => setQuantity(quantity + 1)}
    class="h-12 w-12 text-lg font-bold bg-gray-100 rounded-tl-md rounded-bl-md"
    disabled={quantity === max}
  >
    +
  </button>
  <button 
    class="text-lg bg-primary text-white font-bold h-12 px-4 rounded-tr-md rounded-br-md"
  >
    Add to Cart
  </button>
</div>
