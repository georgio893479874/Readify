<script lang="ts">
	let {
		fontSize = 110,
		theme = 'light',
		onFontChange,
		onThemeChange,
		onWidthChange,
		onLineHeightChange
	} = $props();

	let width = $state('normal');

	let lineHeight = $state(1.7);

	function setFont(value: number) {
		onFontChange?.(value);
	}

	function setTheme(value: 'light' | 'dark' | 'sepia') {
		onThemeChange?.(value);
	}

	function reset() {
		fontSize = 110;

		width = 'normal';

		lineHeight = 1.7;

		onFontChange?.(110);

		onWidthChange?.('normal');

		onLineHeightChange?.(1.7);

		onThemeChange?.('light');
	}
</script>

<div class="settings">
	<div class="panel">
		<h2>⚙ Reading settings</h2>

		<section>
			<h3>Font size</h3>

			<div class="row">
				<button onclick={() => setFont(Math.max(fontSize - 10, 80))}> A- </button>

				<span>
					{fontSize}%
				</span>

				<button onclick={() => setFont(Math.min(fontSize + 10, 180))}> A+ </button>
			</div>
		</section>

		<section>
			<h3>Theme</h3>

			<div class="themes">
				<button class:active={theme === 'light'} onclick={() => setTheme('light')}>
					☀️ Light
				</button>

				<button class:active={theme === 'sepia'} onclick={() => setTheme('sepia')}>
					📜 Sepia
				</button>

				<button class:active={theme === 'dark'} onclick={() => setTheme('dark')}> 🌙 Dark </button>
			</div>
		</section>

		<section>
			<h3>Page width</h3>

			<div class="themes">
				<button
					class:active={width === 'small'}
					onclick={() => {
						width = 'small';
						onWidthChange?.('small');
					}}
				>
					Narrow
				</button>

				<button
					class:active={width === 'normal'}
					onclick={() => {
						width = 'normal';
						onWidthChange?.('normal');
					}}
				>
					Normal
				</button>

				<button
					class:active={width === 'large'}
					onclick={() => {
						width = 'large';
						onWidthChange?.('large');
					}}
				>
					Wide
				</button>
			</div>
		</section>

		<section>
			<h3>Line height</h3>

			<input
				type="range"
				min="1.2"
				max="2.2"
				step="0.1"
				bind:value={lineHeight}
				oninput={() => onLineHeightChange?.(Number(lineHeight))}
			/>

			<span>
				{lineHeight}
			</span>
		</section>

		<button class="reset" onclick={reset}> Reset settings </button>
	</div>
</div>

<style>
	.settings {
		position: fixed;

		right: 20px;

		top: 150px;

		z-index: 30;
	}

	.panel {
		width: 320px;

		padding: 25px;

		background: white;

		border-radius: 22px;

		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

		display: flex;

		flex-direction: column;

		gap: 20px;
	}

	h2 {
		margin: 0;

		font-size: 20px;
	}

	section {
		display: flex;

		flex-direction: column;

		gap: 10px;
	}

	h3 {
		margin: 0;

		font-size: 14px;

		color: #475569;
	}

	.row {
		display: flex;

		align-items: center;

		justify-content: space-between;
	}

	button {
		border: 0;

		padding: 10px 14px;

		border-radius: 12px;

		background: #f1f5f9;

		cursor: pointer;
	}

	button:hover {
		background: #dbeafe;
	}

	.themes {
		display: flex;

		gap: 8px;

		flex-wrap: wrap;
	}

	.active {
		background: #2563eb;

		color: white;
	}

	input {
		width: 100%;
	}

	.reset {
		background: #ef4444;

		color: white;
	}

	@media (max-width: 700px) {
		.settings {
			right: 10px;

			left: 10px;
		}

		.panel {
			width: auto;
		}
	}
</style>
