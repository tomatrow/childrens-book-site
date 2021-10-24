<script lang="ts">
    // should have a w/h ratio 
    // width is 100%
    // thickness of side is by content 
    let clazz = ""
    export { clazz as class }
    
    export let flip = false
</script>

<section class="book" class:flip>
    <div class="front">
        <slot name="front" />
    </div>
	<div class="left">
        <slot name="left" />
	</div>
	<div class="back">
        <slot name="back" />
	</div>
    
    
    
	<!-- <div class="bk-page">
        <slot name="page" />
	</div> -->
	<!-- <div class="bk-right"/> -->
	<!-- <div class="bk-top"/> -->
	<!-- <div class="bk-bottom"><slot name="bottom" /></div> -->

</section>

<style global lang="postcss">
    .book {
    	--default-thickness: 2.5rem;
        --default-aspect: 1;

        --resolved-aspect-h: var(--aspect-h, var(--default-aspect));
        --resolved-aspect-w: var(--aspect-w, var(--default-aspect));
        --resolved-thickness: var(--thickness, var(--default-thickness));
        
        --aspect-ratio: var(--resolved-aspect-h)/var(--resolved-aspect-w);
        
        position: relative;
        padding-bottom: calc(var(--aspect-ratio) * 100%);
    	transform-style: preserve-3d;
    	transition: transform .5s;
        &:hover {
        	transform: rotate3d(0,1,0,35deg);
        }
        
        &.flip {
            transform: translate3d(0,0,0px) rotate3d(0,1,0,180deg);
        }
    }
    
    .front {
        @apply absolute inset-0 w-full h-full;
        transform-style: preserve-3d;
    	transform-origin: 0% 50%;
    	transition: transform .5s;
    	transform: translate3d(0,0,calc(var(--resolved-thickness) / 2));
    	z-index: 10;
    }

    .back {
        @apply absolute inset-0 w-full h-full;
    	transform: rotate3d(0,1,0,-180deg) translate3d(0,0,20px);
    }

    .left {
        @apply absolute inset-0 origin-top-left;
    	transform: rotate3d(0,1,0,-90deg);
        
        & > * {
            @apply inset-0 origin-top-left;
            width: calc(100% * var(--aspect-ratio));
            transform: rotate(90deg) translateY(calc((-1/2)*var(--resolved-thickness)));
        }
    }
    
    
    /* .bk-cover-back {
    	transform: rotate3d(0,1,0,-179deg);
    } */

    /* .bk-page {
    	transform: translate3d(0,0,19px);
    	display: none;
    	width: 295px;
    	height: 390px;
    	top: 5px;
    	backface-visibility: hidden;
    	z-index: 9;
    } */
    
    /* .bk-front,
    .bk-back,
    .bk-front > div {
    	width: 300px;
    	height: 400px;
    } */
    
    /* .bk-left,
    .bk-right {
    	width: 40px;
    	left: -20px;
    } */
    
    /* .bk-top,
    .bk-bottom {
    	width: 100%;
    	height: 40px;
    	top: -15px;
    	backface-visibility: hidden;
    } */
    
    /* .bk-back {
    	transform: rotate3d(0,1,0,-180deg) translate3d(0,0,20px);
    	box-shadow: 10px 10px 30px rgba(0,0,0,0.3);
    	border-radius: 3px 0 0 3px;
    } */
    

    /* .bk-right {
    	height: 390px;
    	top: 5px;
    	transform: rotate3d(0,1,0,90deg) translate3d(0,0,295px);
    	backface-visibility: hidden;
    } */
    

    
    /* .bk-top {
    	transform: rotate3d(1,0,0,90deg);
    } */
    
    /* .bk-bottom {
    	transform: rotate3d(1,0,0,-90deg) translate3d(0,0,390px);
    } */
</style>