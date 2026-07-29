<script lang="ts">
	import { Menu, X, Search } from 'lucide-svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	let mobileMenu = false;

	const links = [
		{ title: 'Home', href: '/' },
		{ title: 'Browse', href: '/browse' },
		{ title: 'Categories', href: '/categories' },
		{ title: 'Authors', href: '/authors' },
		{ title: 'Library', href: '/library' }
	];
</script>

<svelte:head>
	<title>Readify</title>
</svelte:head>

<header
	class="fixed top-0 right-0 left-0 z-50 border-b border-violet-100/60 bg-white/80 backdrop-blur-xl"
>
	<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
		<a href={localizeHref('/')} class="flex items-center gap-3">
			<div>
				<h2 class="text-2xl font-black text-gray-900">READIFY</h2>
				<p class="-mt-1 text-xs text-gray-500">Read Everywhere</p>
			</div>
		</a>
		<nav class="hidden items-center gap-8 lg:flex">
			{#each links as item}
				<a
					href={item.href}
					class="relative font-medium text-gray-700 transition hover:text-violet-600"
				>
					{item.title}
					<span
						class="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-violet-600 transition-all duration-300 hover:w-full"
					>
					</span>
				</a>
			{/each}
		</nav>
		<div class="hidden items-center gap-4 lg:flex">
			<button
				class="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:border-violet-400 hover:bg-violet-50"
			>
				<Search size={20} />
			</button>
			<a href={localizeHref('/login')} class="font-medium text-gray-700 transition hover:text-violet-600">
				Login
			</a>
			<a
				href={localizeHref('/register')}
				class="rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
			>
				Sign Up
			</a>
		</div>
		<button class="rounded-xl border p-3 lg:hidden" on:click={() => (mobileMenu = !mobileMenu)}>
			{#if mobileMenu}
				<X size={22} />
			{:else}
				<Menu size={22} />
			{/if}
		</button>
	</div>
	{#if mobileMenu}
		<div class="border-t bg-white lg:hidden">
			<div class="space-y-1 p-6">
				{#each links as item}
					<a
						href={item.href}
						class="block rounded-xl px-4 py-3 font-medium transition hover:bg-violet-50"
					>
						{item.title}
					</a>
				{/each}
				<hr class="my-4" />
				<a href="/login" class="block rounded-xl px-4 py-3 font-medium"> Login </a>
				<a
					href="/register"
					class="mt-3 block rounded-xl bg-violet-600 px-4 py-3 text-center font-semibold text-white"
				>
					Sign Up
				</a>
			</div>
		</div>
	{/if}
</header>
