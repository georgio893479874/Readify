<script lang="ts">
	import Authors from '$lib/components/home/Authors.svelte';
	import Categories from '$lib/components/home/Categories.svelte';
	import FeaturedBooks from '$lib/components/home/FeaturedBooks.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import ReadingEverywhere from '$lib/components/home/ReadingEverywhere.svelte';
	import Testimonials from '$lib/components/home/Testimonials.svelte';
	import TrendingBooks from '$lib/components/home/TrendingBooks.svelte';
</script>

<div>
	<Hero />
	<FeaturedBooks />
	<Categories />
	<TrendingBooks />
	<Authors />
	<ReadingEverywhere />
	<Testimonials />
</div>
