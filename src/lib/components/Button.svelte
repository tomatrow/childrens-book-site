<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    
    export let variant = "default";
  </script>
  
  <button 
    on:click={(e) => dispatch("click", e)}
    class="px-4 py-2 border-md rounded-md border-2
    {variant === "primary" && 'text-primary border-primary'}"
  >
    <slot></slot>
  </button>