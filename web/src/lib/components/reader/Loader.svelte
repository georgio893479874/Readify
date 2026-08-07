<script lang="ts">
	let { progress = 40, text = 'Loading book...' } = $props();
</script>

<div class="loader">
	<div class="card">
		<div class="book">
			<div class="page left"></div>

			<div class="page right"></div>
		</div>

		<h2>
			{text}
		</h2>

		<div class="bar">
			<div style={`width:${progress}%`}></div>
		</div>

		<span>
			{progress}%
		</span>
	</div>
</div>

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
	}

	.card {
		width: 330px;

		padding: 40px;

		border-radius: 28px;

		background: rgba(255, 255, 255, 0.95);

		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);

		display: flex;

		flex-direction: column;

		align-items: center;

		gap: 20px;
	}

	.card h2 {
		font-size: 18px;

		color: #334155;
	}

	.book {
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

		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
	}

	.left {
		left: 0;

		transform-origin: right;

		animation: openLeft 1.5s infinite;
	}

	.right {
		right: 0;

		transform-origin: left;

		animation: openRight 1.5s infinite;
	}

	.bar {
		width: 100%;

		height: 8px;

		background: #e2e8f0;

		border-radius: 20px;

		overflow: hidden;
	}

	.bar div {
		height: 100%;

		background: linear-gradient(90deg, #2563eb, #60a5fa);

		border-radius: 20px;

		transition: 0.4s;
	}

	.card span {
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

	@media (max-width: 500px) {
		.card {
			width: 280px;

			padding: 30px;
		}
	}
</style>
