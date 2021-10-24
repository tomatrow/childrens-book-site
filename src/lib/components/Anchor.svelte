<script lang="ts">
    export let id: string
</script>

{#if id}
    <div {id} class="relative" />
{/if}

<style lang="postcss">
    div {
        top: calc(-1 * (var(--anchor-offset, 0rem)));
    }
    @screen desktop {
        div {
            top: calc(-1 * (var(--anchor-base-offset, 0rem) + var(--anchor-offset, 0rem)));
        }
    }
</style>
