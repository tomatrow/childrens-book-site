<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button"

    let clazz = undefined
    export { clazz as class }
</script>

<button class={clazz} {type} on:click {...$$restProps}>
    <slot />
</button>
