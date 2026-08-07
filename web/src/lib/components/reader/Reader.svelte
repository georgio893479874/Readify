<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { EPUBReader } from './epub';
	import Toolbar from './Toolbar.svelte';
	import Settings from './Settings.svelte';
	import Sidebar from './Sidebar.svelte';
	import Loader from './Loader.svelte';

	let viewer: HTMLDivElement;

	let reader: EPUBReader;

	let loading = $state(true);
	let loadingProgress = $state(10);
	let loadingText = $state('Loading...');

	let progress = $state(0);

	let title = $state('Book');

	let fontSize = $state(110);

	let theme = $state<'light' | 'dark' | 'sepia'>('light');

	let zen = $state(false);

	let settingsOpen = $state(false);
	let sidebarOpen = $state(false);

	let error = $state('');

	const bookId = $derived($page.params.id);

	function changeWidth(value: string) {
		const sizes: any = {
			small: '650px',
			normal: '760px',
			large: '950px'
		};

		if (viewer) {
			viewer.style.maxWidth = sizes[value];
		}
	}

	function changeLineHeight(value: number) {
		reader?.rendition?.themes.default({
			body: {
				'line-height': `${value}`
			}
		});
	}

	async function loadBook() {
		try {
			loading = true;

			loadingProgress = 10;
			loadingText = 'Getting book...';

			const response = await fetch(`${PUBLIC_API_URL}/books/${bookId}/read`);

			if (!response.ok) {
				throw new Error('Book API error');
			}

			const json = await response.json();

			if (!json.success || !json.file) {
				throw new Error('File missing');
			}

			let url = json.file;

			if (!url.startsWith('http')) {
				url = `${PUBLIC_API_URL}/${url}`;
			}

			loadingProgress = 40;
			loadingText = 'Opening EPUB...';

			reader = new EPUBReader({
				url,

				viewer,

				bookId: bookId ?? '',

				onTitle(value) {
					title = value;
				},

				onProgress(value) {
					progress = value;
				},

				onReady() {
					loadingProgress = 100;
					loadingText = 'Ready 📖';
					loading = false;
				}
			});

			loadingProgress = 70;
			loadingText = 'Preparing pages...';

			await reader.load();

			reader.loadBookmarks();
		} catch (e: any) {
			console.error(e);

			error = e.message ?? 'Unknown error';

			loading = false;
		}
	}

	function next() {
		reader?.next();
	}

	function prev() {
		reader?.prev();
	}

	function changeFont(value: number) {
		fontSize = value;

		reader?.setFontSize(fontSize);
	}

	function changeTheme(value: 'light' | 'dark' | 'sepia') {
		theme = value;

		reader?.setTheme(value);
	}

	function keyboard(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') next();

		if (e.key === 'ArrowLeft') prev();

		if (e.key === 'Escape') zen = false;
	}

	onMount(() => {
		loadBook();

		window.addEventListener('keydown', keyboard);

		return () => {
			window.removeEventListener('keydown', keyboard);

			reader?.destroy();
		};
	});
</script>

<div class:zen class="reader">
	<Toolbar
		{title}
		{fontSize}
		{theme}
		{zen}
		onsettings={() => (settingsOpen = !settingsOpen)}
		onsidebar={() => (sidebarOpen = !sidebarOpen)}
		onzen={() => (zen = !zen)}
		onfontChange={(e: CustomEvent) => changeFont(e.detail)}
		onthemeChange={(e: CustomEvent) => changeTheme(e.detail)}
	/>

	<div class="progress">
		<div style={`width:${progress}%`}></div>
	</div>

	<main>
		<button class="nav left" onclick={prev} aria-label="Previous page"> ‹ </button>

		<div bind:this={viewer} class="book" onclick={() => (zen = !zen)}></div>

		<button class="nav right" onclick={next} aria-label="Next page"> › </button>
	</main>

	{#if settingsOpen}
		<Settings
			{fontSize}
			{theme}
			onFontChange={changeFont}
			onThemeChange={changeTheme}
			onWidthChange={changeWidth}
			onLineHeightChange={changeLineHeight}
		/>
	{/if}

	{#if sidebarOpen}
		<Sidebar {reader} />
	{/if}
</div>

{#if loading}
	<Loader progress={loadingProgress} text={loadingText} />
{/if}

{#if error}
	<div class="error">
		<h2>
			😢 {error}
		</h2>

		<button onclick={loadBook}> Retry </button>
	</div>
{/if}

<style>
	.reader {
		height: 100vh;

		display: flex;

		flex-direction: column;

		background: linear-gradient(135deg, #f8fafc, #e2e8f0);

		overflow: hidden;
	}

	.reader.zen :global(.topbar),
	.reader.zen .progress {
		transform: translateY(-100%);

		opacity: 0;
	}

	.progress {
		height: 4px;

		background: #e5e7eb;
	}

	.progress div {
		height: 100%;

		background: #2563eb;

		transition: 0.3s;
	}

	main {
		flex: 1;

		display: flex;

		align-items: center;

		justify-content: center;

		position: relative;

		padding: 20px;
	}

	.book {
		width: min(760px, 92vw);

		height: 100%;

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

		cursor: pointer;

		z-index: 5;
	}

	.left {
		left: 30px;
	}

	.right {
		right: 30px;
	}

	.error {
		position: fixed;

		inset: 0;

		display: flex;

		flex-direction: column;

		align-items: center;

		justify-content: center;

		gap: 20px;

		background: white;

		z-index: 100;
	}

	.error button {
		padding: 12px 25px;

		border: 0;

		border-radius: 12px;

		background: #2563eb;

		color: white;

		cursor: pointer;
	}

	:global(.book iframe) {
		width: 100% !important;

		height: 100% !important;
	}

	@media (max-width: 700px) {
		.book {
			width: 100%;

			border-radius: 10px;
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
	}
</style>
