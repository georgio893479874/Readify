<script lang="ts">
	// Use $props() instead of `export let` for runes mode
	type Theme = 'light' | 'dark' | 'sepia';

	const props = $props();

	const title: string = props.title ?? 'Book';

	const fontSize: number = props.fontSize ?? 110;

	const theme: Theme = (props.theme ?? 'light') as Theme;

	const zen: boolean = props.zen ?? false;

	const dispatch = (name: string, detail?: any) =>
		dispatchEvent(
			new CustomEvent(name, {
				detail,
				bubbles: true
			})
		);

	function decrease() {
		dispatch('fontChange', Math.max(fontSize - 10, 80));
	}

	function increase() {
		dispatch('fontChange', Math.min(fontSize + 10, 180));
	}

	function changeTheme() {
		let next;

		if (theme === 'light') next = 'sepia';
		else if (theme === 'sepia') next = 'dark';
		else next = 'light';

		dispatch('themeChange', next);
	}
</script>

<header class="topbar">
	<div class="book-title">
		📖

		<span>
			{title}
		</span>
	</div>

	<div class="controls">
		<button title="Decrease font" onclick={decrease}> A- </button>

		<button title="Increase font" onclick={increase}> A+ </button>

		<button title="Change theme" onclick={changeTheme}>
			{#if theme === 'dark'}
				☀️
			{:else if theme === 'sepia'}
				📜
			{:else}
				🌙
			{/if}
		</button>

		<button title="Settings" onclick={() => dispatch('settings')}> ⚙ </button>

		<button title="Contents" onclick={() => dispatch('sidebar')}> ☰ </button>

		<button title="Zen mode" onclick={() => dispatch('zen')}>
			{zen ? '↩' : '⛶'}
		</button>
	</div>
</header>

<style>
	.topbar {
		height: 72px;

		margin-top: 72px;

		display: flex;

		align-items: center;

		justify-content: space-between;

		padding: 0 30px;

		background: white;

		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

		z-index: 10;

		transition: 0.3s;
	}

	.book-title {
		display: flex;

		align-items: center;

		gap: 12px;

		font-size: 20px;

		font-weight: 700;

		max-width: 60%;
	}

	.book-title span {
		overflow: hidden;

		text-overflow: ellipsis;

		white-space: nowrap;
	}

	.controls {
		display: flex;

		gap: 8px;
	}

	.controls button {
		width: 42px;

		height: 40px;

		border: 0;

		border-radius: 12px;

		background: #f1f5f9;

		cursor: pointer;

		font-weight: 700;

		font-size: 15px;

		transition: 0.2s;
	}

	.controls button:hover {
		background: #dbeafe;

		transform: translateY(-2px);
	}

	.controls button:active {
		transform: scale(0.95);
	}

	@media (max-width: 700px) {
		.topbar {
			margin-top: 0;

			height: 60px;

			padding: 0 12px;
		}

		.book-title {
			font-size: 16px;

			max-width: 40%;
		}

		.controls {
			gap: 5px;
		}

		.controls button {
			width: 36px;

			height: 36px;

			border-radius: 10px;

			font-size: 13px;
		}
	}
</style>
