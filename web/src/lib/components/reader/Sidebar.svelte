<script lang="ts">
	let { reader } = $props();

	let activeTab = $state<'contents' | 'bookmarks'>('contents');

	let bookmarks = $state<any[]>([]);

	let toc = $state<any[]>([]);

	let bookmarkName = $state('');

	$effect(() => {
		if (reader) {
			toc = reader.getTOC() || [];

			bookmarks = reader.bookmarks || [];
		}
	});

	function openChapter(item: any) {
		if (item.href) {
			reader?.book?.spine?.get(item.href);
		}

		if (item.cfi) {
			reader?.goTo(item.cfi);
		}
	}

	function addBookmark() {
		reader?.addBookmark(bookmarkName || 'Bookmark');

		bookmarks = [...reader.bookmarks];

		bookmarkName = '';
	}

	function removeBookmark(index: number) {
		reader?.removeBookmark(index);

		bookmarks = [...reader.bookmarks];
	}
</script>

<aside class="sidebar">
	<div class="tabs">
		<button class:active={activeTab === 'contents'} onclick={() => (activeTab = 'contents')}>
			📑 Contents
		</button>

		<button class:active={activeTab === 'bookmarks'} onclick={() => (activeTab = 'bookmarks')}>
			🔖 Bookmarks
		</button>
	</div>

	{#if activeTab === 'contents'}
		<div class="list">
			{#each toc as item}
				<button class="item" onclick={() => openChapter(item)}>
					{item.label}
				</button>

				{#if item.subitems}
					<div class="sub">
						{#each item.subitems as child}
							<button class="item small" onclick={() => openChapter(child)}>
								{child.label}
							</button>
						{/each}
					</div>
				{/if}
			{/each}

			{#if toc.length === 0}
				<p class="empty">No chapters found</p>
			{/if}
		</div>
	{:else}
		<div class="bookmark-box">
			<div class="add">
				<input placeholder="Bookmark name" bind:value={bookmarkName} />

				<button onclick={addBookmark}> + </button>
			</div>

			{#each bookmarks as mark, index}
				<div class="bookmark">
					<button class="open" onclick={() => reader.goTo(mark.cfi)}>
						🔖 {mark.label}
					</button>

					<button class="delete" onclick={() => removeBookmark(index)}> × </button>
				</div>
			{:else}
				<p class="empty">No bookmarks</p>
			{/each}
		</div>
	{/if}
</aside>

<style>
	.sidebar {
		position: fixed;

		left: 20px;

		top: 150px;

		width: 340px;

		max-height: calc(100vh - 180px);

		background: white;

		border-radius: 22px;

		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

		z-index: 40;

		overflow: hidden;

		display: flex;

		flex-direction: column;
	}

	.tabs {
		display: flex;

		border-bottom: 1px solid #e2e8f0;
	}

	.tabs button {
		flex: 1;

		padding: 15px;

		border: 0;

		background: white;

		cursor: pointer;
	}

	.tabs .active {
		background: #2563eb;

		color: white;
	}

	.list,
	.bookmark-box {
		padding: 15px;

		overflow: auto;
	}

	.item {
		display: block;

		width: 100%;

		text-align: left;

		border: 0;

		background: #f8fafc;

		padding: 12px;

		border-radius: 10px;

		margin-bottom: 8px;

		cursor: pointer;
	}

	.item:hover {
		background: #dbeafe;
	}

	.small {
		margin-left: 15px;

		width: calc(100% - 15px);
	}

	.sub {
		margin-bottom: 10px;
	}

	.add {
		display: flex;

		gap: 10px;

		margin-bottom: 15px;
	}

	.add input {
		flex: 1;

		padding: 10px;

		border-radius: 10px;

		border: 1px solid #cbd5e1;
	}

	.add button {
		width: 40px;

		border: 0;

		border-radius: 10px;

		background: #2563eb;

		color: white;
	}

	.bookmark {
		display: flex;

		gap: 5px;

		margin-bottom: 8px;
	}

	.open {
		flex: 1;

		text-align: left;
	}

	.delete {
		width: 40px;

		color: #ef4444;
	}

	button {
		cursor: pointer;
	}

	.empty {
		color: #64748b;

		text-align: center;
	}

	@media (max-width: 700px) {
		.sidebar {
			left: 10px;

			right: 10px;

			width: auto;

			top: 90px;
		}
	}
</style>
