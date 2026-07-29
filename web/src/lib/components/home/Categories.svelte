<script lang="ts">
	import {
		Code2,
		BookOpen,
		Heart,
		Brain,
		Briefcase,
		FlaskConical,
		ScrollText,
		Ghost
	} from 'lucide-svelte';

	const categories = [
		{
			title: 'Programming',
			description: 'JavaScript, Node.js, Rust, Go, Python and more.',
			icon: Code2,
			books: '12 400+',
			color: 'from-violet-500 to-purple-600'
		},
		{
			title: 'Fantasy',
			description: 'Epic worlds full of magic and adventure.',
			icon: BookOpen,
			books: '9 100+',
			color: 'from-blue-500 to-cyan-500'
		},
		{
			title: 'Romance',
			description: 'Stories that inspire emotions.',
			icon: Heart,
			books: '8 600+',
			color: 'from-pink-500 to-rose-500'
		},
		{
			title: 'Psychology',
			description: 'Understand yourself and other people.',
			icon: Brain,
			books: '4 700+',
			color: 'from-orange-400 to-amber-500'
		},
		{
			title: 'Business',
			description: 'Leadership, startups and investing.',
			icon: Briefcase,
			books: '5 800+',
			color: 'from-emerald-500 to-green-600'
		},
		{
			title: 'Science',
			description: 'Physics, chemistry, astronomy.',
			icon: FlaskConical,
			books: '7 300+',
			color: 'from-sky-500 to-indigo-500'
		},
		{
			title: 'History',
			description: 'Discover the greatest civilizations.',
			icon: ScrollText,
			books: '3 900+',
			color: 'from-yellow-500 to-orange-500'
		},
		{
			title: 'Horror',
			description: 'Dark stories that keep you awake.',
			icon: Ghost,
			books: '2 800+',
			color: 'from-slate-700 to-black'
		}
	];
</script>

<section class="bg-white py-28">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<p class="font-semibold tracking-[0.35em] text-violet-600 uppercase">Categories</p>
			<h2 class="mt-4 text-5xl font-black text-gray-900">Explore Every Genre</h2>
			<p class="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
				From programming and business to fantasy and history. Find your next favorite book in
				seconds.
			</p>
		</div>
		<div class="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
			{#each categories as category}
				<a
					href="/categories"
					class="group relative overflow-hidden rounded-[32px] border border-violet-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-100 blur-3xl transition group-hover:scale-150"
					></div>
					<div
						class={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${category.color} text-white shadow-xl`}
					>
						<svelte:component this={category.icon} size={36} />
					</div>
					<h3 class="mt-8 text-2xl font-bold text-gray-900 group-hover:text-violet-700">
						{category.title}
					</h3>
					<p class="mt-4 leading-7 text-gray-500">
						{category.description}
					</p>
					<div class="mt-8 flex items-center justify-between">
						<div>
							<p class="text-3xl font-black text-violet-700">
								{category.books}
							</p>
							<p class="text-sm text-gray-400">Books</p>
						</div>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 transition group-hover:bg-violet-600 group-hover:text-white"
						>
							→
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
