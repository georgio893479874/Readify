<script lang="ts">
	import BookCard from '$lib/components/cards/BookCard.svelte';
	import book17 from "$lib/assets/books/book17.webp";

	const images = import.meta.glob<string>('$lib/assets/books/*.webp', {
		eager: true,
		query: '?url',
		import: 'default'
	});

	const getBookImage = (id: number) => {
		return images[`/src/lib/assets/books/book${id}.webp`] || '';
	};

	let selected = $state('Trending');
	const tabs = ['Trending', 'New Releases', 'Best Rated', "Editor's Choice"];

	const booksData = [
		{
			id: 21,
			title: 'The Horizon Door',
			author: 'Jamie Reese',
			rating: 4.4,
			pages: 322,
			category: 'Fantasy'
		},
		{
			id: 22,
			title: "Pretty When You're Ruined",
			author: 'A. E. Murphy',
			rating: 4.3,
			pages: 430,
			category: 'Dark Romance'
		},
		{
			id: 23,
			title: 'The Lottery',
			author: 'Shirley Jackson',
			rating: 4.2,
			pages: 304,
			category: 'Horror'
		},
		{ id: 24, title: 'Traded', author: 'K. Erose', rating: 4.5, pages: 368, category: 'Romance' },
		{
			id: 25,
			title: "The Alchemist's Crown",
			author: 'Samantha Coville',
			rating: 4.6,
			pages: 412,
			category: 'Fantasy'
		},
		{
			id: 26,
			title: 'Hooked Crown',
			author: 'Nicole Fox',
			rating: 4.4,
			pages: 394,
			category: 'Mafia Romance'
		},
		{
			id: 27,
			title: 'Consumed by Deception',
			author: 'Rina Kent',
			rating: 4.6,
			pages: 486,
			category: 'Dark Romance'
		},
		{
			id: 28,
			title: 'The Apartment Girl',
			author: 'Norman Druce',
			rating: 4.1,
			pages: 291,
			category: 'Mystery'
		},
		{
			id: 29,
			title: 'Skin of a Sinner',
			author: 'Avina St. Graves',
			rating: 4.5,
			pages: 438,
			category: 'Dark Romance'
		},
		{
			id: 30,
			title: 'Day Shadows',
			author: 'Dana Marie',
			rating: 4.3,
			pages: 356,
			category: 'Fantasy'
		},
		{
			id: 31,
			title: 'His Dark Claim',
			author: 'Luna Sods',
			rating: 4.4,
			pages: 378,
			category: 'Paranormal Romance'
		},
		{
			id: 32,
			title: 'An Eevil Wind',
			author: 'T. K. Hart',
			rating: 4.2,
			pages: 342,
			category: 'Thriller'
		},
		{
			id: 33,
			title: 'The Heart of Betrayal',
			author: 'Mary E. Pearson',
			rating: 4.3,
			pages: 480,
			category: 'Fantasy'
		},
		{
			id: 34,
			title: 'Nights & Daylights',
			author: 'Ashley Mathews',
			rating: 4.2,
			pages: 329,
			category: 'Contemporary Romance'
		},
		{
			id: 35,
			title: 'Shades of Mer',
			author: 'H. M. Myer',
			rating: 4.4,
			pages: 391,
			category: 'Fantasy'
		},
		{
			id: 36,
			title: 'Hexed',
			author: 'Emily McIntire',
			rating: 4.4,
			pages: 496,
			category: 'Dark Romance'
		}
	];

	const recentlyAddedBooks = [
		{
			title: 'A Song in the Kingdom',
			author: 'Trif Pema',
			rating: 4.6,
			pages: 392,
			category: 'Fantasy'
		},
		{
			title: 'Beauty & Rage',
			author: 'Natalie Bennett',
			rating: 4.5,
			pages: 368,
			category: 'Dark Romance'
		},
		{
			title: 'Blood Mate',
			author: 'Kitty Thomas',
			rating: 4.4,
			pages: 326,
			category: 'Dark Romance'
		},
		{
			title: 'The Summer Madness',
			author: 'Marcus Vogel',
			rating: 4.2,
			pages: 287,
			category: 'Romance'
		},
		{
			title: 'House Of  Dark Shadows',
			author: 'Dakota Blake',
			rating: 4.5,
			pages: 304,
			category: 'Contemporary Fiction'
		},
		{
			title: 'Soul Weaver',
			author: 'Eric J. Vann',
			rating: 4.6,
			pages: 421,
			category: 'Epic Fantasy'
		},
		{
			title: 'Empire of Desire',
			author: 'Rina Kent',
			rating: 4.7,
			pages: 468,
			category: 'Dark Romance'
		},
		{
			title: 'Im Schatten der Dämmerung',
			author: 'Stephanie Otte',
			rating: 4.3,
			pages: 352,
			category: 'Fantasy'
		},
		{
			title: 'Blood Lands',
			author: 'Stacey Marie Brown',
			rating: 4.0,
			pages: 320,
			category: 'Fantasy'
		},
		{
			title: 'Vicious Prince',
			author: 'Rina Kent',
			rating: 4.6,
			pages: 438,
			category: 'Dark Romance'
		},
		{
			title: 'What the Water Carries',
			author: "Maya O'Neill",
			rating: 4.5,
			pages: 371,
			category: 'Mystery'
		},
		{
			title: 'The Vintage Triangle',
			author: "Martin Schreiber",
			rating: 3.7,
			pages: 256,
			category: 'Romance'
		}
	];

	const books = booksData.map((book) => ({
		...book,
		image: getBookImage(book.id)
	}));

	const recentlyAdded = recentlyAddedBooks.map((book, index) => ({
		...book,
		image: getBookImage(index + 38)
	}));
</script>

<section class="bg-gradient-to-b from-white to-violet-50 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="font-semibold tracking-[0.35em] text-violet-600 uppercase">Trending Collection</p>
				<h2 class="mt-4 text-5xl font-black">Trending Books</h2>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
					Explore the books everyone is reading right now. Updated daily with the latest trends.
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				{#each tabs as tab}
					<button
						onclick={() => (selected = tab)}
						class={`rounded-full px-6 py-3 font-semibold transition ${
							selected === tab
								? 'bg-violet-600 text-white shadow-xl'
								: 'bg-white shadow hover:bg-violet-50'
						}`}
					>
						{tab}
					</button>
				{/each}
			</div>
		</div>
		<div class="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each books as book}
				<BookCard {...book} />
			{/each}
		</div>
		<div
			class="mt-28 overflow-hidden rounded-[40px] bg-gradient-to-r from-violet-700 via-violet-600 to-purple-600"
		>
			<div class="grid items-center gap-12 p-12 lg:grid-cols-2">
				<div class="text-white">
					<span class="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
						BOOK OF THE MONTH
					</span>
					<h2 class="mt-8 text-5xl leading-tight font-black">
						Discover your next favorite adventure.
					</h2>
					<p class="mt-8 max-w-xl text-lg leading-8 text-violet-100">
						Every month our editors choose one incredible book that thousands of readers fall in
						love with. Start reading today and join our growing community.
					</p>
					<div class="mt-10 flex gap-5">
						<button
							class="rounded-2xl bg-white px-8 py-4 font-bold text-violet-700 transition hover:scale-105"
						>
							Read Now
						</button>
						<button
							class="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
						>
							Learn More
						</button>
					</div>
				</div>
				<div class="relative flex justify-center">
					<img
						src={book17}
						alt=""
						class="h-[600px] rounded-[32px] object-cover shadow-[0_30px_80px_rgba(0,0,0,.35)]"
					/>
					<div class="absolute top-10 -left-6 rounded-3xl bg-white p-6 shadow-2xl">
						<p class="text-sm text-gray-500">Rating</p>
						<h3 class="mt-2 text-4xl font-black text-violet-700">★ 4.9</h3>
					</div>
					<div class="absolute -right-6 bottom-10 rounded-3xl bg-white p-6 shadow-2xl">
						<p class="text-sm text-gray-500">Readers</p>
						<h3 class="mt-2 text-4xl font-black text-violet-700">1.2M+</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-24">
			<div class="mb-10 flex items-center justify-between">
				<div>
					<h2 class="text-4xl font-black">Recently Added</h2>
					<p class="mt-3 text-gray-500">Fresh books added this week.</p>
				</div>
				<a href="/browse" class="font-semibold text-violet-600 transition hover:text-violet-800">
					View All →
				</a>
			</div>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
				{#each recentlyAdded as book}
					<div class="group cursor-pointer">
						<div class="overflow-hidden rounded-3xl shadow-lg">
							<img
								src={book.image}
								alt={book.title}
								class="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
							/>
						</div>

						<h4 class="mt-4 font-bold transition group-hover:text-violet-700">
							{book.title}
						</h4>

						<p class="mt-1 text-sm text-gray-500">
							{book.author}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
