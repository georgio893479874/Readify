<script lang="ts">
	import BestSellerBook from '$lib/assets/books/Best-Seller-Book.webp';
	const stats = [
		{ value: '250K+', label: 'Books' },
		{ value: '1M+', label: 'Readers' },
		{ value: '100+', label: 'Categories' },
		{ value: '4.9★', label: 'Rating' }
	];

	const features = ['Unlimited Reading', 'Cloud Library', 'Offline Access'];
</script>

<section
	class="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white pt-40 pb-28"
>
	<div
		class="absolute top-[-120px] left-[-150px] h-96 w-96 rounded-full bg-violet-200/40 blur-[140px]"
	></div>
	<div
		class="absolute right-[-120px] bottom-[-120px] h-96 w-96 rounded-full bg-purple-300/30 blur-[160px]"
	></div>
	<div class="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
		<div>
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-4 py-2"
			>
				<div class="h-2 w-2 rounded-full bg-violet-600"></div>
				<p class="text-sm font-semibold text-violet-700">The Future of Reading</p>
			</div>
			<h1 class="text-5xl leading-tight font-black text-gray-900 md:text-7xl">
				Discover
				<span
					class="block bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent"
				>
					Millions
				</span>
				of Amazing Books
			</h1>
			<p class="mt-8 max-w-xl text-lg leading-8 text-gray-600">
				Explore thousands of novels, programming books, science, history, fantasy, business and much
				more. Build your own digital library and read from any device.
			</p>
			<div class="mt-10 flex flex-wrap gap-4">
				<a
					href="/browse"
					class="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
				>
					Start Reading
				</a>
				<a
					href="/categories"
					class="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-semibold transition hover:border-violet-400 hover:bg-violet-50"
				>
					Explore Library
				</a>
			</div>
			<div class="mt-12 flex flex-wrap gap-4">
				{#each features as feature}
					<div class="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">✓</div>
						<p class="font-medium text-gray-700">
							{feature}
						</p>
					</div>
				{/each}
			</div>
			<div class="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
				{#each stats as stat}
					<div>
						<h2 class="text-4xl font-black text-violet-700">
							{stat.value}
						</h2>
						<p class="mt-2 text-gray-500">
							{stat.label}
						</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="relative">
			<div class="overflow-hidden rounded-[40px] bg-white p-4 shadow-2xl">
				<img src={BestSellerBook} alt="" class="h-[650px] w-full rounded-[30px] object-cover" />
			</div>
			<div class="absolute top-16 -left-8 w-64 rounded-3xl bg-white p-6 shadow-2xl">
				<p class="text-sm text-gray-500">Currently Reading</p>
				<h3 class="mt-2 text-xl font-bold">The Great Adventure</h3>
				<p class="mt-2 text-gray-500">John Smith</p>
				<div class="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
					<div class="h-full w-2/3 rounded-full bg-violet-600"></div>
				</div>
				<p class="mt-3 text-sm text-violet-700">67% Completed</p>
			</div>
			<div class="absolute -right-8 bottom-12 rounded-3xl bg-white p-6 shadow-2xl">
				<h3 class="text-3xl font-black text-violet-700">★★★★★</h3>
				<p class="mt-2 text-gray-500">Trusted by over</p>
				<p class="text-xl font-bold">1 Million Readers</p>
			</div>
		</div>
	</div>
</section>
