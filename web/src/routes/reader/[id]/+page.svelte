<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { PUBLIC_API_URL } from '$env/static/public';
	import ePub from 'epubjs';

	let viewer: HTMLDivElement;
	let book: any;
	let rendition: any;
	let started = false;
	let loading = $state(true);
	let loadingProgress = $state(0);
	let loadingText = $state('Loading...');
	let title = $state('Book');
	let fontSize = $state(110);
	let dark = $state(false);
	let progress = $state(0);

	async function loadBook() {
		try {
			loading = true;
			loadingProgress = 10;
			loadingText = 'Getting a book...';

			const response = await fetch(`${PUBLIC_API_URL}/books/${get(page).params.id}/read`);

			if (!response.ok) {
				throw new Error('API error');
			}

			const json = await response.json();

			if (!json.success || !json.file) {
				throw new Error('File missing');
			}

			loadingProgress = 30;
			loadingText = 'Openning EPUB...';

			let epubUrl = json.file;

			if (!epubUrl.startsWith('http')) {
				epubUrl = `${PUBLIC_API_URL}/${epubUrl}`;
			}

			book = ePub(epubUrl);

			await book.ready;
			await book.loaded.package;
			await book.loaded.spine;

			loadingProgress = 45;
			loadingText = 'Reading methadata...';

			const metadata = await book.loaded.metadata;

			title = metadata.title || 'Book';

			loadingProgress = 60;
			loadingText = 'Creating pages...';

			rendition = book.renderTo(viewer, {
				width: '100%',
				height: '100%',
				manager: 'default',
				flow: 'paginated',
				spread: 'none'
			});

			rendition.on('rendered', () => {
				const iframe = viewer.querySelector('iframe');

				if (iframe) {
					iframe.style.height = '100%';
					iframe.style.width = '100%';
				}
			});

            rendition.themes.default({
                img:{
                    "max-width":"100% !important",
                    "height":"auto !important",
                    "object-fit":"contain !important"
                }
            });

			rendition.hooks.content.register((contents: any) => {
				const images = contents.document.querySelectorAll('img');

				images.forEach((img: HTMLImageElement) => {
					img.style.maxWidth = '100%';
					img.style.maxHeight = '100%';
					img.style.width = 'auto';
					img.style.height = 'auto';
					img.style.objectFit = 'contain';
				});
			});

			rendition.themes.register('light', {
				body: {
					background: '#ffffff',
					color: '#111827'
				}
			});

			rendition.themes.register('dark', {
				body: {
					background: '#111827',
					color: '#f8fafc'
				}
			});

			rendition.on('relocated', (location: any) => {
				const cfi = location.start.cfi;

				localStorage.setItem(`reader-${get(page).params.id}`, cfi);

				if (location.start.percentage) {
					progress = Math.floor(location.start.percentage * 100);
				}
			});

			rendition.on('displayed', () => {
				loadingProgress = 100;
				loadingText = 'Ready 📖';

				setTimeout(() => {
					loading = false;
				}, 400);
			});

			const saved = localStorage.getItem(`reader-${get(page).params.id}`);

			await rendition.display(saved ?? undefined);
		} catch (error) {
			loadingText = 'Loading error 😢';

			setTimeout(() => {
				loading = false;
			}, 2000);
		}
	}

	function next() {
		rendition?.next();
	}

	function prev() {
		rendition?.prev();
	}

	function setFont() {
		rendition?.themes.fontSize(`${fontSize}%`);
	}

	function setTheme() {
		if (!rendition) return;

		rendition.themes.select(dark ? 'dark' : 'light');
	}

	function increaseFont() {
		fontSize = Math.min(fontSize + 10, 160);

		setFont();
	}

	function decreaseFont() {
		fontSize = Math.max(fontSize - 10, 80);

		setFont();
	}

	function keyboard(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') next();

		if (e.key === 'ArrowLeft') prev();
	}
	onMount(() => {
		if (started) return;

		started = true;

		loadBook();

		window.addEventListener('keydown', keyboard);

		return () => {
			window.removeEventListener('keydown', keyboard);

			rendition?.destroy();
			book?.destroy();
		};
	});
</script>

<div class="reader">
	<header class="topbar">
		<div class="title">
			{title || 'Book'}
		</div>
		<div class="controls">
			<button onclick={decreaseFont}> A- </button>
			<button onclick={increaseFont}> A+ </button>
			<button
				onclick={() => {
					dark = !dark;
					setTheme();
				}}
			>
				{dark ? '☀️' : '🌙'}
			</button>
		</div>
	</header>
	<div class="progress">
		<div style={`width:${progress}%`}></div>
	</div>
	<main>
		<button class="nav left" onclick={prev}> ‹ </button>
		<div bind:this={viewer} class="book"></div>
		<button class="nav right" onclick={next}> › </button>
	</main>
</div>
{#if loading}
	<div class="loader">
		<div class="loader-card">
			<div class="book-loader">
				<div class="page left-page"></div>
				<div class="page right-page"></div>
			</div>
			<h2>
				{loadingText}
			</h2>
			<div class="loader-bar">
				<div style={`width:${loadingProgress}%`}></div>
			</div>
			<span>
				{loadingProgress}%
			</span>
		</div>
	</div>
{/if}

<style>
	.loader {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(248, 250, 252, 0.75);
		backdrop-filter: blur(15px);
		z-index: 100;
		animation: fadeIn 0.3s ease;
	}

	.loader-card {
		width: 330px;
		padding: 40px;
		border-radius: 28px;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.loader-card h2 {
		font-size: 18px;
		color: #334155;
		font-weight: 700;
	}

	.book-loader {
		position: relative;
		width: 90px;
		height: 70px;
		perspective: 800px;
	}

	.page {
		position: absolute;
		width: 45px;
		height: 70px;
		background: white;
		border-radius: 5px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
	}

	.left-page {
		left: 0;
		transform-origin: right;
		animation: openLeft 1.5s infinite;
	}

	.right-page {
		right: 0;
		transform-origin: left;
		animation: openRight 1.5s infinite;
	}

	.loader-bar {
		width: 100%;
		height: 8px;
		border-radius: 20px;
		background: #e2e8f0;
		overflow: hidden;
	}

	.loader-bar div {
		height: 100%;
		border-radius: 20px;
		background: linear-gradient(90deg, #2563eb, #60a5fa);
		transition: 0.4s;
	}

	.loader-card span {
		font-weight: 700;
		color: #2563eb;
	}

	@keyframes openLeft {
		0%,
		100% {
			transform: rotateY(0);
		}

		50% {
			transform: rotateY(-50deg);
		}
	}

	@keyframes openRight {
		0%,
		100% {
			transform: rotateY(0);
		}

		50% {
			transform: rotateY(50deg);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.reader {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		overflow: hidden;
	}

	.topbar {
		margin-top: 72px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;
		background: white;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		z-index: 5;
	}

	.title {
		font-size: 20px;
		font-weight: 700;
		max-width: 60%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.controls {
		display: flex;
		gap: 10px;
	}

	.controls button {
		border: 0;
		background: #f1f5f9;
		width: 45px;
		height: 40px;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: 0.2s;
	}

	.controls button:hover {
		background: #dbeafe;
		transform: translateY(-2px);
	}

	.progress {
		height: 4px;
		background: #e5e7eb;
	}

	.progress div {
		height: 100%;
		background: #2563eb;
		transition: 0.4s;
	}
	main {
		flex: 1;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 20px;
	}

	.book {
		height: 100%;
		min-height: 0;
		width: min(900px, 90vw);
		background: white;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 55px;
		height: 55px;
		border-radius: 50%;
		border: 0;
		background: white;
		font-size: 40px;
		color: #334155;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		z-index: 3;
		transition: 0.2s;
	}

	.nav:hover {
		scale: 1.1;
		background: #2563eb;
		color: white;
	}

	.left {
		left: 30px;
	}

	.right {
		right: 30px;
	}

	@media (max-width: 700px) {
		.topbar {
			padding: 0 15px;
			height: 60px;
		}

		.title {
			font-size: 16px;
		}

		.nav {
			width: 42px;
			height: 42px;
			font-size: 30px;
		}

		.left {
			left: 10px;
		}

		.right {
			right: 10px;
		}

		.book {
			width: 100%;
			border-radius: 10px;
		}
	}

	.book :global(iframe) {
		width: 100% !important;
		height: 100% !important;
	}

	.book :global(img) {
		object-fit: contain !important;
	}
</style>
