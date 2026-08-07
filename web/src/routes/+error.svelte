<script lang="ts">
	import { page } from '$app/state';
	import image from "$lib/assets/404.webp";
</script>

<svelte:head>
	<title>404 - Page not found</title>
</svelte:head>

<div
	class="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center"
	style={`background-image: url(${image});`}
>
	<div class="absolute inset-0 bg-gradient-to-br from-gray-50/95 via-violet-50/90 to-violet-100/95"></div>

	<div class="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl"></div>

	<div class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl"></div>

	<div class="relative z-10 max-w-lg rounded-3xl border border-white/50 bg-white/70 p-10 shadow-2xl backdrop-blur-xl">
		<div class="mb-6 text-8xl font-black tracking-tight text-violet-600 drop-shadow-sm">
			404
		</div>

		<h1 class="text-3xl font-bold text-gray-900">
			Page not found
		</h1>

		<p class="mx-auto mt-4 max-w-md leading-relaxed text-gray-500">
			Looks like this book has disappeared from the shelves. Try going back to the library and discover something new to read.
		</p>

		<a
			href="/"
			class="group mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-600/30 transition duration-300 hover:-translate-y-1 hover:bg-violet-700"
		>
			<span>Go Home</span>

			<svg
				class="h-5 w-5 transition-transform group-hover:translate-x-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 7l5 5m0 0l-5 5m5-5H6"
				/>
			</svg>
		</a>

		<div class="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
			<span class="h-px w-10 bg-gray-300"></span>
			<span>Error {page.status}</span>
			<span class="h-px w-10 bg-gray-300"></span>
		</div>
	</div>
</div>
