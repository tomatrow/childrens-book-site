<script lang="ts">    
    let clazz = ""
    export { clazz as class }
    export let flip = false
    export let open = false
</script>

<section class="jacket {clazz}">
    <div class="book" class:flip class:open>
    	<div class="spine">
            <slot name="spine" />
    	</div>
    	<div class="back">
            <div class="back-cover">
                <slot name="back-cover" />
            </div>
            <div class="back-endpaper">
                <slot name="back-endpaper" />
            </div>
    	</div>
        {#if $$slots.default}
            <div class="pages">
                <slot />
            </div>
        {/if}
        <div class="front">
            <div class="front-endpaper">
                <slot name="front-endpaper" />
            </div>
            <div class="front-cover">
                <slot name="front-cover" />
            </div>
        </div>
        <!-- <div class="head">
            <slot name="head" />
        </div>
        <div class="tail">
            <slot name="tail" />
        </div> -->
    </div>
</section>

<style global lang="postcss">
    .jacket {
        --default-perspective: 1800px;
        --resolved-perspective: var(--perspective, var(--default-perspective));
        perspective: var(--resolved-perspective);
        perspective-origin: bottom left;
    }

    .book {
    	--default-thickness: 2.5rem;
        --default-aspect: 1;

        --resolved-aspect-h: var(--aspect-h, var(--default-aspect));
        --resolved-aspect-w: var(--aspect-w, var(--default-aspect));
        --resolved-thickness: var(--thickness, var(--default-thickness));

        --aspect-ratio: var(--resolved-aspect-h)/var(--resolved-aspect-w);

        @apply relative;

        padding-bottom: calc(var(--aspect-ratio) * 100%);
    	transform-style: preserve-3d;
    	transition: transform .5s;


        & > * {
            @apply absolute inset-0 w-full h-full;
        }

        &.open {
            transform: translate3d(0,0,4rem);
            .front {
            	transform: translate3d(0,0,calc(var(--resolved-thickness) / 2)) rotate3d(0,1,0,-160deg);
            }
        }

        &:not(.open) {
            &:hover {
            	transform: rotate3d(0,1,0,35deg);
            }
            &.flip {
                transform: translate3d(0,0,0px) rotate3d(0,1,0,180deg);
            }
        }
    }
    
    .pages {
    	/* transform: translate3d(0,0,calc(var(--resolved-thickness)/2) - 1px); */
        backface-visibility: hidden;
        pointer-events: none;
        
        .page {
            @apply absolute inset-0;
            transform-style: preserve-3d;
        	transform-origin: 0% 50%;
        	transition: transform .5s;
        	transform: translate3d(0,0,calc(var(--resolved-thickness)/2));
            z-index: calc(var(--length) - var(--index));
            
            &.turned {
                transform: translate3d(0,0,calc(var(--resolved-thickness)/2)) rotate3d(0,1,0,calc(1deg * (-160 + var(--index))));
            }
            &-front, &-back {
                @apply absolute inset-0;
                backface-visibility: hidden;
                transform-style: preserve-3d;
                pointer-events: auto;
            }
            &-front {
                z-index: -1;
            }
            &-back {
                z-index: 1;
                transform: rotate3d(0,1,0,-180deg);
            }
        }
    }

    .front, .back {
        &-cover, &-endpaper {
            @apply absolute inset-0;
            backface-visibility: hidden;
        }
        &-cover {
            /* z-index: 10; */
        }
    }
    

    .front {
        transform-style: preserve-3d;
    	transform-origin: 0% 50%;
    	transition: transform .5s;
    	transform: translate3d(0,0,calc(var(--resolved-thickness)/2));
        z-index: 100;

        &-cover, &-endpaper {
            /* @apply z-0; */
        }

        &-endpaper {
            transform: rotate3d(0,1,0,-179deg);
        }
    }

    .back {
        /* z-index: 0; */
        .back-cover {
            transform: rotate3d(0,1,0,-180deg) translate3d(0,0,calc(var(--resolved-thickness)/2));
        }
    }

    .spine {
        @apply origin-top-left;
    	transform: rotate3d(0,1,0,-90deg);
        overflow: hidden;
        pointer-events: none;

        & > * {
            @apply inset-0 origin-top-left;
            width: calc(100% * var(--aspect-ratio));
            transform: rotate(90deg) translateY(calc(-1*var(--resolved-thickness)/2));
        }
    }
</style>