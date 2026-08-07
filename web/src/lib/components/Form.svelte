<script lang="ts">
	import { BookOpen, Eye, EyeOff, Mail, Lock, User } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_API_URL } from '$env/static/public';
	import book15 from '$lib/assets/books/book15.webp';
	import book16 from '$lib/assets/books/book16.webp';
	import book20 from '$lib/assets/books/book20.webp';

	const props = $props<{ type?: 'login' | 'register' }>();
	let loading = $state(false);
	let error = $state('');
	let email = $state('');
	let password = $state('');
	let name = $state('');
	let showPassword = $state(false);
	const isLogin = $derived(props.type === 'login');

	const slides = [
		{
			image: book15,
			title: 'Discover Amazing Books',
			text: 'Thousands of carefully selected books waiting for you.'
		},
		{
			image: book16,
			title: 'Read Anywhere',
			text: 'Continue reading from any device.'
		},
		{
			image: book20,
			title: 'Join Our Community',
			text: 'Millions of readers share reviews every day.'
		}
	];

	async function login() {
		error = '';
		loading = true;

		try {
			const res = await fetch(`${PUBLIC_API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				error = data.message ?? 'Login failed';
				return;
			}

			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.user));

			await goto('/library');
		} catch {
			error = 'Server unavailable';
		} finally {
			loading = false;
		}
	}

	async function register() {
		error = '';
		loading = true;

		try {
			const res = await fetch(`${PUBLIC_API_URL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: name,
					email,
					password
				})
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				error = data.message;
				return;
			}

			await login();
		} catch {
			error = 'Server unavailable';
		} finally {
			loading = false;
		}
	}

	let active = $state(0);

	$effect(() => {
		const id = setInterval(() => {
			active = (active + 1) % slides.length;
		}, 4000);

		return () => clearInterval(id);
	});
</script>

<div
	class="relative mt-15 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 px-6 py-10"
>
	<div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl"></div>
	<div
		class="absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-purple-200/40 blur-3xl"
	></div>
	<div
		class="relative z-10 mx-auto grid w-full max-w-7xl overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-2"
	>
		<div class="flex items-center justify-center bg-white p-10 lg:p-16">
			<div class="w-full max-w-md">
				<div class="mb-8 flex flex-col items-center">
					<div
						class="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 text-white shadow-lg"
					>
						<BookOpen size={30} />
					</div>
					<h1 class="text-center text-3xl font-black text-gray-900">
						{isLogin ? 'Welcome Back' : 'Create Account'}
					</h1>
					<p class="mt-2 text-center text-gray-500">
						{#if isLogin}
							Sign in to continue reading your favorite books.
						{:else}
							Create your account and start your reading journey.
						{/if}
					</p>
				</div>
				<form
					class="space-y-5"
					on:submit|preventDefault={() => {
						if (isLogin) {
							login();
						} else {
							register();
						}
					}}
				>
					{#if !isLogin}
						<div>
							<label class="mb-2 block text-sm font-semibold text-gray-700"> Full Name </label>
							<div
								class="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-500 focus-within:bg-white"
							>
								<User size={20} class="text-gray-400" />
								<input
									bind:value={name}
									type="text"
									placeholder="John Smith"
									class="w-full bg-transparent px-3 py-4 outline-none"
								/>
							</div>
						</div>
					{/if}
					<div>
						<label class="mb-2 block text-sm font-semibold text-gray-700"> Email </label>
						<div
							class="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-500 focus-within:bg-white"
						>
							<Mail size={20} class="text-gray-400" />
							<input
								bind:value={email}
								type="email"
								placeholder="you@example.com"
								class="w-full bg-transparent px-3 py-4 outline-none"
							/>
						</div>
					</div>
					<div>
						<label class="mb-2 block text-sm font-semibold text-gray-700"> Password </label>
						<div
							class="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-500 focus-within:bg-white"
						>
							<Lock size={20} class="text-gray-400" />
							<input
								bind:value={password}
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								class="w-full bg-transparent px-3 py-4 outline-none"
							/>
							<button
								type="button"
								on:click={() => (showPassword = !showPassword)}
								class="text-gray-400 transition hover:text-violet-600"
							>
								{#if showPassword}
									<EyeOff size={20} />
								{:else}
									<Eye size={20} />
								{/if}
							</button>
						</div>
					</div>
					{#if isLogin}
						<div class="flex items-center justify-between text-sm">
							<label class="flex items-center gap-2 text-gray-600">
								<input type="checkbox" class="accent-violet-600" />
								Remember me
							</label>
							<a href="/forgot-password" class="font-medium text-violet-600 hover:text-violet-700">
								Forgot password?
							</a>
						</div>
					{/if}
					<button
						type="submit"
						disabled={loading}
						class="mt-2 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
					>
						{#if loading}
							Loading...
						{:else}
							{isLogin ? 'Sign In' : 'Create Account'}
						{/if}
					</button>
					{#if error}
						<p class="text-center text-sm text-red-500">
							{error}
						</p>
					{/if}
					<div class="my-8 flex items-center gap-4">
						<div class="h-px flex-1 bg-gray-200"></div>
						<span class="text-sm text-gray-400">OR</span>
						<div class="h-px flex-1 bg-gray-200"></div>
					</div>
					<div class="space-y-3">
						<button
							type="button"
							class="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 py-3 font-medium transition hover:border-violet-300 hover:bg-violet-50"
						>
							Continue with Google
						</button>
						<button
							type="button"
							class="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 py-3 font-medium transition hover:border-violet-300 hover:bg-violet-50"
						>
							Continue with Apple
						</button>
					</div>
					<p class="mt-8 text-center text-gray-600">
						{#if isLogin}
							Don't have an account?
							<a href="/register" class="font-semibold text-violet-600 hover:text-violet-700">
								Sign Up
							</a>
						{:else}
							Already have an account?
							<a href="/login" class="font-semibold text-violet-600 hover:text-violet-700">
								Sign In
							</a>
						{/if}
					</p>
				</form>
			</div>
		</div>
		<div class="relative hidden min-h-[750px] overflow-hidden lg:block">
			<img
				src={slides[active].image}
				alt={slides[active].title}
				class="absolute inset-0 h-full w-full object-cover transition-all duration-700"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-purple-800/60 to-black/60"
			></div>
			<div
				class="absolute top-10 left-10 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl"
			>
				<p class="text-3xl font-black text-white">50K+</p>
				<p class="text-sm text-violet-100">Readers</p>
			</div>
			<div
				class="absolute top-32 right-10 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl"
			>
				<p class="text-3xl font-black text-white">120K+</p>
				<p class="text-sm text-violet-100">Books</p>
			</div>
			<div
				class="absolute right-12 bottom-75 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl"
			>
				<p class="text-3xl font-black text-white">4.9 ★</p>
				<p class="text-sm text-violet-100">Average Rating</p>
			</div>
			<div class="relative flex h-full flex-col justify-end p-14 text-white">
				<div class="mb-8">
					<h2 class="mb-4 text-5xl leading-tight font-black">
						{slides[active].title}
					</h2>
					<p class="max-w-md text-lg leading-relaxed text-violet-100">
						{slides[active].text}
					</p>
				</div>
				<div class="flex gap-3">
					{#each slides as _, i}
						<button
							type="button"
							on:click={() => (active = i)}
							class={`h-3 rounded-full transition-all duration-300 ${
								active === i ? 'w-10 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
							}`}
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
