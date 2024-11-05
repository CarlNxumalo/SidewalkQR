<script>
    import { Card, Button, Toggle } from 'flowbite-svelte';
    import {Section} from 'flowbite-svelte-blocks'
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>
  
<Section name="crudreadsection" class="flex justify-center items-center mt-16 pt-8"> <!-- Add mt-16 here -->
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-md mx-auto mx-auto mt-12">
        <Card img="SideWalkSpecial.jpg">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sidewalk Special For Today
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
          <Button>
            See More Speacials <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
          </Button>
        </Card>
    </div>
</Section>
