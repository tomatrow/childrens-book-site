<script lang="ts" context="module">
    import { getProducts } from "$lib/common/api"
    import type { Load } from "@sveltejs/kit"
    import Purchase from "$lib/components/Purchase.svelte"

    export const load: Load = async () => {
        let products = []

        try {
            products = await getProducts()
        } catch (error) {
            console.error(error)
        }

        return {
            status: 200, 
            props: {
                products
            }
        }
    }
</script>

<script lang="ts">
    import { Button, Hero, Typeset, Link } from "$lib/components"
    // import { Book, Page } from "3d-book-svelte"

    let flip: boolean
    let open: boolean
</script>


<div>
    <section class="text-center image-background">
      <div class="py-24">
        <div class="title text-primary">
          <h1 class="text-4xl md:text-8xl">The First Noel</h1>
          <h2 class="text-3xl md:text-6xl">A Tale Of Friendship</h2>
        </div>
        <div class="mt-8">
          <button
            class="px-6 py-3 border-md rounded-md bg-primary text-gray-100 font-bold "
          >
            Purchase
          </button>
        </div>
      </div>
    </section>
  
    <section class="bg-white">
      <div class="m-auto text-center w-full max-w-4xl p-4">
        <div class="embed-container">
          <iframe
            src="https://player.vimeo.com/video/644665038?h=ebe93eb2fc?autoplay=1"
            title="The First Noel A Tale of Friendship Book Trailer"
            width="1920"
            height="1080"
            frameborder="0"
            allow="autoplay;"
            allowfullscreen
            class="w-full"
          />
        </div>
      </div>
  
      <div
        class="relative flex items-center justify-center p-4 max-w-6xl my-32 md:my-64 m-auto"
      >
        <div class="bg-white shadow-2xl p-8" style="z-index:1">
          <div
            class="text-xl md:text-2xl lg:text-4xl font-bold pb-4 text-primary mb-3 sm:mb-0"
          >
            <span>"This deserves a spot on your</span>
            <span class="sm:block sm:ml-16"
              >bookshelf and to be read annually"</span
            >
          </div>
          <div class="font-bold text-sm text-right md:mr-16">
            <p>Brae Wychoff</p>
            <p class="font-thin text-sm">
              Director of Kingdom Writers Association
            </p>
            <p class="font-thin text-sm">
              Award-winning Amazon bestselling author
            </p>
          </div>
        </div>
        <img
          src="/uploads/mug-lifestyle.webp"
          class="max-w-xs md:max-w-lg absolute bottom-1/4 sm:bottom-auto right-[63%]"
          style="z-index:0"
          alt=""
        />
        <img
          src="/uploads/book-collection.webp"
          class="max-w-xs md:max-w-lg absolute lifestyle-img2 left-[45%] top-[50%]"
          style="z-index:0"
          alt=""
        />
        <img
          src="/uploads/cards.webp"
          class="max-w-xs md:max-w-lg absolute lifestyle-img3 left-[40%] bottom-2/3"
          style="z-index:0"
          alt=""
        />
      </div>
  
      <div class="max-w-6xl w-full m-auto">
        <Purchase />
      </div>
    </section>
  </div>

  <style>
    .image-background:before {
      background-image: url("/uploads/book-collection.webp");
      content: "";
      position: fixed;
      left: 0;
      right: 0;
      z-index: -1;
  
      display: block;
      height: 50vh;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
  
      -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -o-filter: blur(3px);
      -ms-filter: blur(3px);
      filter: blur(3px);
    }
  
    .title {
      font-family: "roundhand-bt-regular";
      text-shadow: 1px 1px 1px #000;
    }
  
    .embed-container {
      --video--width: 1296;
      --video--height: 540;
  
      position: relative;
      padding-bottom: calc(
        var(--video--height) / var(--video--width) * 100%
      ); /* 41.66666667% */
      overflow: hidden;
      max-width: 100%;
    }
  
    .embed-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  