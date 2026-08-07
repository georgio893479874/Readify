import ePub from 'epubjs';

export interface Bookmark {
	cfi: string;
	label: string;
	date: number;
}

export interface ReaderOptions {
	url: string;
	viewer: HTMLDivElement;
	bookId: string;
	onProgress?: (value: number) => void;
	onTitle?: (title: string) => void;
	onReady?: () => void;
}

export class EPUBReader {
	book: any;
	rendition: any;

	bookId: string;
	viewer: HTMLDivElement;

	bookmarks: Bookmark[] = [];
	toc: any[] = [];

	private startX = 0;

	constructor(private options: ReaderOptions) {
		this.viewer = options.viewer;
		this.bookId = options.bookId;
	}

	async load() {
		this.book = ePub(this.options.url, {
			openAs: 'epub'
		});

		await this.book.ready;

		const metadata = await this.book.loaded.metadata;

		this.options.onTitle?.(metadata.title || 'Book');

		const navigation = await this.book.loaded.navigation;

		this.toc = navigation.toc || [];

		const mobile = window.innerWidth < 700;

		this.rendition = this.book.renderTo(this.viewer, {
			width: '100%',
			height: '100%',

			manager: 'default',

			flow: mobile ? 'scrolled-doc' : 'paginated',

			spread: mobile ? 'none' : 'auto'
		});

		this.setupThemes();

		this.setupImages();

		this.setupLocation();

		const saved = localStorage.getItem(this.storageKey());

		await this.rendition.display(saved || undefined);

		this.setupSwipe();

		this.options.onReady?.();
	}

	private setupThemes() {
		this.rendition.themes.register('light', {
			body: {
				background: '#ffffff',
				color: '#111827'
			}
		});

		this.rendition.themes.register('sepia', {
			body: {
				background: '#f4ecd8',
				color: '#3b3024'
			}
		});

		this.rendition.themes.register('dark', {
			body: {
				background: '#111827',
				color: '#f8fafc'
			}
		});

		this.rendition.themes.default({
			body: {
				'line-height': '1.7',

				'font-family': 'Georgia, serif',

				'letter-spacing': '0.02em'
			},

			img: {
				'max-width': '100% !important',

				height: 'auto !important',

				'object-fit': 'contain !important'
			}
		});
	}

	setTheme(theme: 'light' | 'dark' | 'sepia') {
		this.rendition?.themes.select(theme);
	}

	setFontSize(size: number) {
		this.rendition?.themes.fontSize(`${size}%`);
	}

	private setupImages() {
		this.rendition.hooks.content.register((contents: any) => {
			contents.document.querySelectorAll('script').forEach((el: any) => el.remove());

			const images = contents.document.querySelectorAll('img');

			images.forEach((img: HTMLImageElement) => {
				img.style.maxWidth = '100%';

				img.style.height = 'auto';

				img.style.objectFit = 'contain';
			});
		});
	}

	private setupLocation() {
		this.rendition.on('relocated', (location: any) => {
			const cfi = location.start.cfi;

			localStorage.setItem(this.storageKey(), cfi);

			if (location.start.percentage) {
				this.options.onProgress?.(Math.floor(location.start.percentage * 100));
			}
		});
	}

	next() {
		this.rendition?.next();
	}

	prev() {
		this.rendition?.prev();
	}

	async goTo(cfi: string) {
		await this.rendition.display(cfi);
	}

	addBookmark(label = 'Bookmark') {
		const location = this.rendition.currentLocation();

		if (!location) return;

		this.bookmarks.push({
			cfi: location.start.cfi,

			label,

			date: Date.now()
		});

		this.saveBookmarks();
	}

	removeBookmark(index: number) {
		this.bookmarks.splice(index, 1);

		this.saveBookmarks();
	}

	loadBookmarks() {
		const data = localStorage.getItem(this.bookmarkKey());

		if (data) {
			this.bookmarks = JSON.parse(data);
		}
	}

	private saveBookmarks() {
		localStorage.setItem(this.bookmarkKey(), JSON.stringify(this.bookmarks));
	}

	private storageKey() {
		return `reader-${this.bookId}`;
	}

	private bookmarkKey() {
		return `bookmarks-${this.bookId}`;
	}

	getTOC() {
		return this.toc;
	}

	private setupSwipe() {
		this.viewer.addEventListener('touchstart', (e: any) => {
			this.startX = e.touches[0].clientX;
		});

		this.viewer.addEventListener('touchend', (e: any) => {
			const end = e.changedTouches[0].clientX;

			const diff = this.startX - end;

			if (diff > 60) {
				this.next();
			}

			if (diff < -60) {
				this.prev();
			}
		});
	}

	destroy() {
		this.rendition?.destroy();

		this.book?.destroy();
	}
}
