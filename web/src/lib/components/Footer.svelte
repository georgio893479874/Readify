<script lang="ts">
	import { Mail, MapPin, Phone } from 'lucide-svelte';
	import Icon from '@iconify/svelte';

	const product = ['Browse Books', 'Categories', 'New Releases', 'Top Authors', 'Trending'];
	const company = ['About', 'Careers', 'Press', 'Partners', 'Contact'];
	const resources = ['Help Center', 'Blog', 'Community', 'API', 'Developers'];
	const legal = ['Privacy Policy', 'Terms of Service', 'Cookies', 'Licenses', 'Security'];
</script>

<footer class="relative overflow-hidden bg-[#0f0f17] text-white">
	<div
		class="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-violet-700/20 blur-[180px]"
	></div>
	<div
		class="absolute right-[-200px] bottom-[-200px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[180px]"
	></div>
	<div class="mx-auto max-w-7xl px-6 py-24">
		<div class="grid gap-20 lg:grid-cols-[2fr,1fr,1fr,1fr,1fr]">
			<div>
				<div class="flex items-center gap-4">
					<div
						class="flex p-4 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-purple-500 text-3xl font-black"
					>
						Readify
					</div>
					<div>
						<h2 class="text-3xl font-black">Your Library</h2>
						<p class="text-violet-300">Read Anywhere</p>
					</div>
				</div>
				<p class="mt-8 max-w-md leading-8 text-gray-400">
					Discover millions of books, follow your favorite authors and enjoy reading from any
					device. Your digital library always stays with you.
				</p>
				<div class="mt-10 flex gap-4">
					<a class="rounded-2xl bg-white/10 p-4 transition hover:bg-violet-600">
						<Icon icon="mdi:facebook" width="22" />
					</a>
					<a class="rounded-2xl bg-white/10 p-4 transition hover:bg-violet-600">
						<Icon icon="mdi:instagram" width="22" />
					</a>
					<a class="rounded-2xl bg-white/10 p-4 transition hover:bg-violet-600">
						<Icon icon="mdi:twitter" width="22" />
					</a>
					<a class="rounded-2xl bg-white/10 p-4 transition hover:bg-violet-600">
						<Icon icon="mdi:github" width="22" />
					</a>
					<a class="rounded-2xl bg-white/10 p-4 transition hover:bg-violet-600">
						<Icon icon="mdi:youtube" width="22" />
					</a>
				</div>
			</div>
			<div>
				<h3 class="text-xl font-bold">Product</h3>
				<div class="mt-8 space-y-5">
					{#each product as item}
						<a href="/" class="block text-gray-400 transition hover:text-violet-300">
							{item}
						</a>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="text-xl font-bold">Company</h3>
				<div class="mt-8 space-y-5">
					{#each company as item}
						<a href="/" class="block text-gray-400 transition hover:text-violet-300">
							{item}
						</a>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="text-xl font-bold">Resources</h3>
				<div class="mt-8 space-y-5">
					{#each resources as item}
						<a href="/" class="block text-gray-400 transition hover:text-violet-300">
							{item}
						</a>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="text-xl font-bold">Contact</h3>
				<div class="mt-8 space-y-6">
					<div class="flex items-center gap-4 text-gray-400">
						<Mail size={18} />
						<span>hello@yourlibrary.com</span>
					</div>
					<div class="flex items-center gap-4 text-gray-400">
						<Phone size={18} />
						<span>+380 00 000 00 00</span>
					</div>
					<div class="flex items-center gap-4 text-gray-400">
						<MapPin size={18} />
						<span>Worldwide</span>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-24 rounded-[40px] bg-gradient-to-r from-violet-700 to-purple-600 p-12">
			<div class="grid items-center gap-10 lg:grid-cols-2">
				<div>
					<h2 class="text-4xl font-black">Stay Updated</h2>
					<p class="mt-4 text-lg text-violet-100">
						Get notified about new books, authors and exclusive releases.
					</p>
				</div>
				<div class="flex flex-col gap-4 sm:flex-row">
					<input
						type="email"
						placeholder="Enter your email"
						class="flex-1 rounded-2xl border-0 px-6 py-4 text-black outline-none bg-white/80"
					/>
					<button
						class="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-900"
					>
						Subscribe
					</button>
				</div>
			</div>
		</div>
		<div class="mt-20 border-t border-white/10 pt-10">
			<div class="flex flex-col items-center justify-between gap-6 lg:flex-row">
				<p class="text-gray-500">© 2026 Your Library. All rights reserved.</p>
				<div class="flex flex-wrap gap-8">
					{#each legal as item}
						<a href="/" class="text-gray-500 transition hover:text-violet-300">
							{item}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</footer>
