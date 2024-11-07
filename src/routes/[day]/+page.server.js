import { error } from '@sveltejs/kit';
export function load({ params }) {
      console.log(params.day)
      return {
         dayImage:  params.day+"Special.jpg",
         day: params.day + " Special!"
      }
}