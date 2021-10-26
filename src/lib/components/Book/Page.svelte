<div class="page" style="--index: {index}; --length: {items.length}" class:turned={currentIndex >= index}>
    <div class="page-front">
        <slot name="page-front" />
    </div>
    <div class="page-back">
        <slot name="page-back" />
    </div>    
</div>