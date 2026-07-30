<script lang="ts">
	import BookCard from '$lib/components/cards/BookCard.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	interface Book {
		id: number;
		title: string;
		slug: string;
		description?: string;
		cover?: string;
		language?: string;
		status: string;
		views: number;
		likes: number;
		createdAt: number;
	}

	let books = $state<Book[]>([]);
	let loading = $state(true);
	let search = $state('');
	let filter = $state('All');

	const filters = ['All', 'Published', 'Draft', 'Completed', 'Hidden'];

	async function loadBooks() {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/books`);

			const json = await res.json();

			books = json.data;
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		loadBooks();
	});

	const filteredBooks = $derived.by(() => {
		return books.filter((book) => {
			const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());

			const matchesFilter = filter === 'All' || book.status.toLowerCase() === filter.toLowerCase();

			return matchesSearch && matchesFilter;
		});
	});
</script>

<section class="min-h-screen bg-[#fafafa] py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="font-semibold tracking-[0.35em] text-violet-600 uppercase">Library</p>

				<h1 class="mt-3 text-6xl font-black text-gray-900">Discover Books</h1>

				<p class="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
					Explore stories written by our community. Search thousands of books, discover new authors
					and continue reading where you left off.
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<input
					bind:value={search}
					placeholder="Search books..."
					class="w-80 rounded-2xl border border-gray-200 bg-white px-6 py-4 transition outline-none focus:border-violet-500"
				/>

				<div class="flex flex-wrap gap-3">
					{#each filters as item}
						<button
							onclick={() => (filter = item)}
							class={`rounded-full px-5 py-2 font-medium transition ${
								filter === item
									? 'bg-violet-600 text-white shadow-lg'
									: 'bg-white shadow hover:bg-violet-50'
							}`}
						>
							{item}
						</button>
					{/each}
				</div>
			</div>
		</div>
		<div class="mb-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
			<div class="rounded-3xl bg-white p-8 shadow-sm">
				<p class="text-sm text-gray-500">Books</p>

				<h2 class="mt-3 text-4xl font-black">
					{books.length}
				</h2>
			</div>

			<div class="rounded-3xl bg-white p-8 shadow-sm">
				<p class="text-sm text-gray-500">Published</p>

				<h2 class="mt-3 text-4xl font-black">
					{books.filter((b) => b.status === 'published').length}
				</h2>
			</div>

			<div class="rounded-3xl bg-white p-8 shadow-sm">
				<p class="text-sm text-gray-500">Completed</p>

				<h2 class="mt-3 text-4xl font-black">
					{books.filter((b) => b.status === 'completed').length}
				</h2>
			</div>

			<div
				class="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 text-white shadow-xl"
			>
				<p class="opacity-80">Community</p>

				<h2 class="mt-3 text-4xl font-black">
					{books.reduce((a, b) => a + (b.likes ?? 0), 0)}
				</h2>

				<p class="mt-2 opacity-80">Total Likes</p>
			</div>
		</div>

		{#if loading}
			<div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
				{#each Array(8) as _}
					<div class="h-[420px] animate-pulse rounded-3xl bg-white"></div>
				{/each}
			</div>
		{:else}
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filteredBooks as book}
					<BookCard
						id={book.id}
						title={book.title}
						author="Unknown Author"
						image={book.cover || '/placeholder-book.png'}
						category={book.language || 'Unknown'}
						rating={Math.max(1, Math.min(5, (book.likes ?? 0) / 20))}
						pages={book.views ?? 0}
						premium={book.status === 'published'}
					/>
				{/each}
			</div>

			{#if filteredBooks.length === 0}
				<div class="py-32 text-center">
					<h2 class="text-3xl font-bold">No books found</h2>
					<p class="mt-4 text-gray-500">Try changing your search or filters.</p>
				</div>
			{/if}
		{/if}
	</div>
</section>
