import { error } from '@sveltejs/kit';
export function load({ params }) {

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

      return {
         todayImage, 
      }
}