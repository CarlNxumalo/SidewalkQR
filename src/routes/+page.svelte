<script>
  import { Card, Button } from 'flowbite-svelte';
  import {Section} from 'flowbite-svelte-blocks';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';

  // Image map for each day of the week
  const dailyImages = {
    0: "SundaySpecial.jpg",    // Sunday
    1: "MondaySpecial.jpg",    // Monday
    2: "TuesdaySpecial.jpg",   // Tuesday
    3: "WednesdaySpecial.jpg", // Wednesday
    4: "ThursdaySpecial.jpg",  // Thursday
    5: "FridaySpecial.jpg",    // Friday
    6: "SaturdaySpecial.jpg"   // Saturday
  };

  // Get the current day of the week (0 = Sunday, 6 = Saturday)
  const today = new Date().getDay();
  const todayImage = dailyImages[today];
</script>

<Section name="crudreadsection" class="flex justify-center items-center">
  <div class="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-md mx-auto">
    <Card img={todayImage} alt="Daily Special" >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
      <Button>
        Read more <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
      </Button>
    </Card>
  </div>
</Section>
