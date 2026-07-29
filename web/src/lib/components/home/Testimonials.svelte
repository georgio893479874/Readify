<script lang="ts">
	const stats = [
		{ number: '250K+', title: 'Books' },
		{ number: '12M+', title: 'Readers' },
		{ number: '180+', title: 'Countries' },
		{ number: '4.9★', title: 'Average Rating' }
	];

	const reviews = [
		{
			name: 'Emily Johnson',
			image: 'https://ui-avatars.com/api/?name=Emily+Johnson&background=random&size=200',
			text: "The best reading platform I've ever used. Beautiful design and an incredible collection of books."
		},
		{
			name: 'Michael Brown',
			image: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random&size=200',
			text: 'I love how quickly I can discover new books. Everything feels premium.'
		},
		{
			name: 'Sophia Wilson',
			image: 'https://ui-avatars.com/api/?name=Sophia+Wilson&background=random&size=200',
			text: 'Sync between my laptop and phone works perfectly. Highly recommended.'
		},
		{
			name: 'Daniel Carter',
			image: 'https://ui-avatars.com/api/?name=Daniel+Carter&background=random&size=200',
			text: 'Amazing recommendations. I discovered dozens of books I never knew about.'
		},
		{
			name: 'Olivia White',
			image: 'https://ui-avatars.com/api/?name=Olivia+White&background=random&size=200',
			text: 'Beautiful UI and smooth reading experience.'
		},
		{
			name: 'James Taylor',
			image: 'https://ui-avatars.com/api/?name=James+Taylor&background=random&size=200',
			text: 'Exactly what I wanted from a digital library.'
		}
	];
</script>

<section class="bg-white py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<p class="font-semibold tracking-[0.35em] text-violet-600 uppercase">Community</p>
			<h2 class="mt-4 text-5xl font-black">Loved By Millions</h2>
			<p class="mx-auto mt-6 max-w-3xl text-lg text-gray-500">
				Join readers from all over the world and discover why our platform continues to grow every
				day.
			</p>
		</div>
		<div class="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
			{#each stats as stat}
				<div
					class="rounded-[32px] bg-gradient-to-br from-violet-600 to-purple-600 p-10 text-center text-white shadow-xl"
				>
					<h2 class="text-5xl font-black">
						{stat.number}
					</h2>
					<p class="mt-4 text-lg text-violet-100">
						{stat.title}
					</p>
				</div>
			{/each}
		</div>
		<div class="mt-24 grid gap-8 lg:grid-cols-3">
			{#each reviews as review}
				<div
					class="rounded-[30px] border border-violet-100 bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="flex items-center gap-4">
						<img src={review.image} alt="" class="h-16 w-16 rounded-full object-cover" />
						<div>
							<h3 class="text-lg font-bold">
								{review.name}
							</h3>
							<div class="text-yellow-400">★★★★★</div>
						</div>
					</div>
					<p class="mt-6 leading-8 text-gray-500">
						"{review.text}"
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
