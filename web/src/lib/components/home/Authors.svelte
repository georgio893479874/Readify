<script lang="ts">
	const images = import.meta.glob<string>('$lib/assets/authors/*.webp', {
		eager: true,
		query: '?url',
		import: 'default'
	});

	const getAuthorImage = (filename: string) => {
		const path = `/src/lib/assets/authors/${filename}.webp`;
		return images[path] || '';
	};

	const authors = [
		{
			name: 'Stephen King',
			image: getAuthorImage('author1'),
			books: 74,
			followers: '2.4M'
		},
		{
			name: 'J.K. Rowling',
			image: getAuthorImage('author2'),
			books: 19,
			followers: '5.8M'
		},
		{
			name: 'George R. R. Martin',
			image: getAuthorImage('author3'),
			books: 28,
			followers: '3.7M'
		},
		{
			name: 'Brandon Sanderson',
			image: getAuthorImage('author4'),
			books: 42,
			followers: '2.1M'
		},
		{
			name: 'James Clear',
			image: getAuthorImage('author5'),
			books: 8,
			followers: '1.4M'
		},
		{
			name: 'Robert C. Martin',
			image: getAuthorImage('author6'),
			books: 15,
			followers: '980K'
		},
		{
			name: 'Paulo Coelho',
			image: getAuthorImage('author7'),
			books: 31,
			followers: '3.1M'
		},
		{
			name: 'Yuval Noah Harari',
			image: getAuthorImage('author8'),
			books: 12,
			followers: '1.8M'
		}
	];
</script>

<section class="relative overflow-hidden bg-white py-32">
	<div class="absolute top-20 -left-32 h-80 w-80 rounded-full bg-violet-100 blur-[140px]"></div>
	<div class="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-100 blur-[160px]"></div>
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<p class="font-semibold tracking-[0.35em] text-violet-600 uppercase">Writers</p>
			<h2 class="mt-4 text-5xl font-black text-gray-900">Meet Popular Authors</h2>
			<p class="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
				Follow your favorite authors and never miss new releases.
			</p>
		</div>
		<div class="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each authors as author}
				<div
					class="group overflow-hidden rounded-[32px] border border-violet-100 bg-white p-8 text-center shadow transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
						<img
							src={author.image}
							alt={author.name}
							class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
						/>
					</div>
					<h3 class="mt-8 text-2xl font-bold text-gray-900">
						{author.name}
					</h3>
					<div class="mt-8 flex justify-center gap-8">
						<div>
							<h4 class="text-3xl font-black text-violet-700">
								{author.books}
							</h4>
							<p class="text-sm text-gray-400">Books</p>
						</div>
						<div>
							<h4 class="text-3xl font-black text-violet-700">
								{author.followers}
							</h4>
							<p class="text-sm text-gray-400">Followers</p>
						</div>
					</div>
					<button
						class="mt-8 w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
					>
						Follow
					</button>
				</div>
			{/each}
		</div>
	</div>
</section>
