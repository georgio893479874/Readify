<script lang="ts">
	import book50 from "$lib/assets/books/book50.webp";
	import book51 from "$lib/assets/books/book51.webp";
	import book52 from "$lib/assets/books/book52.webp";

	const features = [
		'Offline Reading',
		'Unlimited Cloud Library',
		'Bookmarks & Notes',
		'AI Recommendations',
		'Dark & Light Mode',
		'Sync Across Devices',
		'Read Anywhere',
		'Instant Search'
	];
</script>

<section class="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white py-36">
	<div
		class="absolute top-20 left-[-180px] h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[180px]"
	></div>
	<div
		class="absolute right-[-200px] bottom-0 h-[600px] w-[600px] rounded-full bg-purple-200/30 blur-[180px]"
	></div>
	<div class="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
		<div>
			<p class="font-semibold tracking-[0.35em] text-violet-600 uppercase">Read Everywhere</p>
			<h2 class="mt-5 text-6xl leading-tight font-black text-gray-900">
				Your Library
				<span class="block text-violet-600"> Always With You. </span>
			</h2>

			<p class="mt-8 text-lg leading-9 text-gray-500">
				Read books on your laptop, tablet or phone. Your progress automatically syncs between every
				device so you can continue exactly where you stopped.
			</p>
			<div class="mt-12 grid gap-5">
				{#each features as feature}
					<div
						class="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-md transition hover:shadow-xl"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-700"
						>
							✓
						</div>

						<h3 class="font-semibold text-gray-700">
							{feature}
						</h3>
					</div>
				{/each}
			</div>
			<div class="mt-12 flex gap-5">
				<button
					class="rounded-2xl bg-violet-600 px-8 py-4 font-bold text-white transition hover:scale-105 hover:bg-violet-700"
				>
					Start Reading
				</button>
				<button
					class="rounded-2xl border border-violet-200 px-8 py-4 font-semibold transition hover:bg-violet-50"
				>
					Explore Library
				</button>
			</div>
		</div>
		<div class="relative flex justify-center">
			<img
				src={book50}
				class="w-[620px] rounded-[30px] shadow-[0_40px_100px_rgba(0,0,0,.18)]"
			/>
			<img
				src={book51}
				class="absolute bottom-5 -left-12 w-60 rounded-[24px] shadow-[0_35px_70px_rgba(0,0,0,.22)] transition duration-500 hover:-translate-y-3 hover:rotate-3"
			/>
			<img
				src={book52}
				class="absolute top-12 -right-10 w-40 rounded-[28px] shadow-[0_35px_70px_rgba(0,0,0,.25)] transition duration-500 hover:-translate-y-4 hover:-rotate-6"
			/>
			<div class="absolute top-0 left-8 rounded-3xl bg-white p-6 shadow-2xl">
				<p class="text-sm text-gray-500">Books Read</p>
				<h2 class="mt-2 text-4xl font-black text-violet-700">1.8M+</h2>
			</div>
			<div class="absolute right-0 bottom-0 rounded-3xl bg-white p-6 shadow-2xl">
				<p class="text-sm text-gray-500">Synced Devices</p>
				<h2 class="mt-2 text-4xl font-black text-violet-700">420K+</h2>
			</div>
		</div>
	</div>
</section>
