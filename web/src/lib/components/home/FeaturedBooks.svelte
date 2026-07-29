<script lang="ts">
	import BookCard from '$lib/components/cards/BookCard.svelte';

	const images = import.meta.glob<string>('$lib/assets/books/*.webp', {
		eager: true,
		query: '?url',
		import: 'default'
	});

	const allBooksData = [
		{ id: 1, title: 'Shatter Me', author: 'Tahereh Mafi', category: 'Dystopian', rating: 4.4, pages: 352 },
		{ id: 2, title: 'Red Queen', author: 'Victoria Aveyard', category: 'Fantasy', rating: 4.3, pages: 400 },
		{ id: 3, title: 'The Selection', author: 'Kiera Cass', category: 'Romance', rating: 4.2, pages: 336 },
		{ id: 4, title: 'The Fact of a Body', author: 'Alexandria Marzano-Lesnevich', category: 'True Crime', rating: 4.2, pages: 336 },
		{ id: 5, title: 'Amid Clouds and Bones', author: 'Ella Fields', category: 'Fantasy Romance', rating: 4.4, pages: 512 },
		{ id: 6, title: 'Does It Hurt?', author: 'H. D. Carlton', category: 'Dark Romance', rating: 4.3, pages: 432 },
		{ id: 8, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', category: 'Historical Fiction', rating: 4.7, pages: 400 },
		{ id: 9, title: 'Haunting Adeline', author: 'H. D. Carlton', category: 'Dark Romance', rating: 4.2, pages: 624 },
		{ id: 11, title: 'To Have and to Loathe', author: 'Martha Waters', category: 'Historical Romance', rating: 4.0, pages: 368 },
		{ id: 12, title: 'Beneath the Lavender', author: 'Claude Girard', category: 'Romance', rating: 4.0, pages: 290 },
		{ id: 13, title: 'Hearts of Flames', author: 'Avery Clarke', category: 'Fantasy Romance', rating: 4.3, pages: 420 },
		{ id: 14, title: 'Move to Memphis', author: 'Alexa Hacrourt', category: 'Contemporary Romance', rating: 4.1, pages: 350 }
	];

	const books = $derived(
		allBooksData
			.filter((book) => book.id >= 1 && book.id <= 14)
			.map((book) => ({
				...book,
				image: images[`/src/lib/assets/books/book${book.id}.webp`] || ''
			}))
	);

	let active = $state('Popular');
	const filters = ['Popular', 'Trending', 'New', 'Recommended'];
</script>

<section class="bg-[#fafafa] py-28">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="font-semibold tracking-[0.3em] text-violet-600 uppercase">Collection</p>
				<h2 class="mt-3 text-5xl font-black text-gray-900">Featured Books</h2>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
					Discover the most loved books by our community. Explore thousands of titles across every
					category.
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				{#each filters as filter}
					<button
						onclick={() => (active = filter)}
						class={`rounded-full px-6 py-3 font-semibold transition-all ${
							active === filter
								? 'bg-violet-600 text-white shadow-xl'
								: 'bg-white text-gray-600 shadow hover:bg-violet-50'
						}`}
					>
						{filter}
					</button>
				{/each}
			</div>
		</div>
		<div class="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
			{#each books as book}
				<BookCard {...book} />
			{/each}
		</div>
		<div class="mt-20 text-center">
			<a
				href="/browse"
				class="inline-flex items-center gap-3 rounded-2xl bg-violet-600 px-10 py-5 text-lg font-semibold text-white transition hover:-translate-y-1 hover:bg-violet-700"
			>
				View Complete Library
				<span>→</span>
			</a>
		</div>
	</div>
</section>
