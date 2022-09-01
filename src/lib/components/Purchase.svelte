<script>
  import Button from "./Button.svelte"
  import AddToCart from "./AddToCart.svelte"

  let editions = [
    {
      id: 1,
      type: "Hardcover",
      price: 2599,
      readingAge: "4 - 12 years",
      dimensions: "11 x 0.25 x 8.5 inches",
      ISBN: "978-0578757018"
    }, 
    {
      id: 2,
      type: "Paperback (Large)",
      price: 1599,
      readingAge: "4 - 12 years",
      dimensions: "11 x 0.1 x 8.5 inches",
      ISBN: "978-0578797298"
    },
     {
      id: 3,
      type: "Paperback (Small)",
      price: 1388,readingAge: "4 - 12 years",
      dimensions: "8.25 x 0.09 x 6 inches",
      ISBN: "978-0578757605"
     }
  ];
  let selectedEdition = 0;
</script>

<div class="p-2 bg-gray-100 rounded-md">
  <div class="lg:flex">
    <div class="lg:w-6/12">
      <img 
        class="bg-gray-300 w-full rounded-md" 
        src="https://images-na.ssl-images-amazon.com/images/I/71-LvCL2sxL.jpg" 
        alt="The First Noel A Tale of Friendship Book Cover" />
    </div>
    <div class="lg:w-6/12 p-5">
      <h1 class="text-xl font-bold">
        The First Noel A Tale of Friendship
      </h1>

      <ul class="flex flex-wrap my-3">
        {#each editions as edition, i}
          <li class="p-1">
            <Button 
              on:click={() => selectedEdition = i}
              variant={selectedEdition === i ? 'primary' : 'default'}
            >
              <div class="text-left">
                <div>
                  { edition.type }
                </div>
                <div class="opacity-75">
                  { `$${edition.price / 100}` }
                </div>
              </div>
            </Button>
          </li>
        {/each}
      </ul>

      <!-- Content -->
      <div class="mb-5 font-bold opacity-75">
        <p class="mb-4">What happens when a friendship develops between the daughter of a rich Wiseman and a common shepherd girl? </p>
        
        <p class="my-4">This Christmas poem weaves the heartwarming fictional journey of an unlikely friendship into the traditional Biblical account of Jesus' birth and tells how the arrival of the Savior challenges the heart of one girl to choose love over the acceptable social norm of her day, in a culture marked by rigid distinctions between social classes. Through this story children will learn to value diversity, acceptance, and love for others regardless of their social status.</p> 
        
        <p class="my-4">Based on a ballet production, whimsical drawings will captivate readers and bring a charming twist to a classic Christmas story. Parents and children alike will love the lessons on friendship received through this delightful tale.</p>

      </div>
      
      <div class="flex justify-center">
        <div class="text-center p-2">
          <i class="fa-solid fa-baby text-2xl"></i>
          <h3 class="font-bold">Reading Age</h3>
          <p class="text-sm">{editions[selectedEdition].readingAge}</p>
        </div>
        <div class="text-center p-2">
          <i class="fa-solid fa-ruler text-2xl"></i>
          <h3 class="font-bold">Dimensions</h3>
          <p class="text-sm">{editions[selectedEdition].dimensions}</p>
        </div>
        <div class="text-center p-2">
          <i class="fa-solid fa-barcode text-2xl"></i>
          <h3 class="font-bold">ISBN</h3>
          <p class="text-sm">{editions[selectedEdition].ISBN}</p>
        </div>
      </div>


      <div class="flex justify-center class mt-6">
        <AddToCart />
      </div>
    </div>
  </div>
</div>