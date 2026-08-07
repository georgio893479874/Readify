<script lang="ts">
	import { goto } from '$app/navigation';
	interface Props {
		id?: number;
		title?: string;
		author?: string;
		image?: string;
		rating?: number;
		category?: string;
		pages?: number;
		premium?: boolean;
	}

	let {
		id,
		title = 'The Great Adventure',
		author = 'John Smith',
		image = '/books/book1.jpg',
		rating = 4.9,
		category = 'Fantasy',
		pages = 420,
		premium = false
	}: Props = $props();
</script>

<div
	class="group overflow-hidden rounded-[32px] border border-violet-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
>
	<div class="relative overflow-hidden">
		<img
			src={image}
			alt={title}
			class="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
		></div>
		{#if premium}
			<div
				class="absolute top-4 left-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 text-xs font-bold text-white shadow-lg"
			>
				PREMIUM
			</div>
		{/if}
		<div
			class="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-2 font-bold text-violet-700 backdrop-blur"
		>
			⭐ {rating}
		</div>
		<div
			class="absolute right-4 bottom-4 left-4 translate-y-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
		>
			<button
				on:click={() => goto(`/books/${id}/read`)}
				class="w-full rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
			>
				Read Now
			</button>
		</div>
	</div>
	<div class="space-y-3 p-6">
		<span
			class="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700"
		>
			{category}
		</span>
		<h3 class="line-clamp-2 text-xl font-bold text-gray-900 transition group-hover:text-violet-700">
			{title}
		</h3>
		<p class="text-gray-500">
			{author}
		</p>
		<div class="flex items-center justify-between pt-2">
			<div>
				<div class="flex text-yellow-400">★★★★★</div>
				<p class="mt-1 text-sm text-gray-400">
					{rating}/5
				</p>
			</div>
			<div class="text-right">
				<p class="text-2xl font-black text-violet-700">
					{pages}
				</p>
				<p class="text-sm text-gray-400">pages</p>
			</div>
		</div>
	</div>
</div>
