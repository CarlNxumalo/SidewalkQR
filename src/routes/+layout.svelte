
<script>
	import '../app.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte';
</script>
  
<div class="relative px-8" >
	<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b h-16 " >
	  <NavBrand href="/">
		<!--=<img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sidewalk Chalk</span>
	  </NavBrand>
	  <NavHamburger />
	  <NavUl >
		<NavLi href="/Monday">Monday</NavLi>
		<NavLi href="/Tuesday">Tuesday</NavLi>
		<NavLi href="/Wednesday">Wednesday</NavLi>
		<NavLi href="/Thursday">Thursday</NavLi>
		<NavLi href="/Friday">Friday</NavLi>
		<NavLi href="/Saturday">Saturday</NavLi>
		<NavLi href="/Sunday">Sunday</NavLi>
	  </NavUl>
	</Navbar>
</div>
<slot>

</slot>


