<script lang="ts">
    export let contentHtml: string = undefined
</script>

{#if $$slots.default || contentHtml}
SLLOOOT
    <div class="prose">
        <slot>
            {@html contentHtml}
        </slot>
    </div>
{/if}