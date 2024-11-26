<script>
  import { Card, Button } from 'flowbite-svelte';
  import {Section} from 'flowbite-svelte-blocks';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
  let { data } = $props();
</script>


<Section name="crudreadsection" class="flex justify-center items-center">
  <div class="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-md mx-auto mt-16">
    <Card img={data.todayImage} alt="Daily Special" >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Todays Special
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Don't miss out on our limited-time special at Sidewalk! Enjoy exclusive deals on your favorite drinks and bites, crafted just for you.
      </p>
    </Card>
  </div>
</Section>
