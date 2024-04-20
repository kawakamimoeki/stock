<script lang="ts">
	import type { PageData } from './$types';
	import '../app.css';
	import Fuse from 'fuse.js';
	import 'virtual:uno.css';
	import { orderBy } from 'lodash';

	export let data: PageData;
	export let q: string = '';
	export let tags: any = data.tags;

	const fuse = new Fuse(data.tags, { keys: ['slug', 'name'] });

	const search = () => {
		if (q) {
			tags = orderBy(
				fuse.search(q).map((t) => t.item),
				['refIndex']
			);
		} else {
			tags = data.tags;
		}
	};
</script>

<svelte:head>
	<title>stock</title>
	<meta
		name="description"
		content="About
Links to help developers reach useful information efficiently"
	/>
	<meta property="og:site_name" content="stock" />
	<meta property="og:title" content="stock" />
	<meta
		property="og:description"
		content="About
Links to help developers reach useful information efficiently"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stock-dev.vercel.app/" />
	<meta property="og:local" content="ja-JP" />
</svelte:head>

<header class="p-4 max-w-4xl mx-auto flex items-center text-center w-full">
	<a class="font-bold" href="/">stock</a>
	<div class="grow" />
	<a href="/search" aria-label="検索" class="block hover:bg-gray-50 rounded-full p-3">
		<div class="i-lucide-search" />
	</a>
	<a href="/feed" aria-label="RSS" target="_blank" class="block hover:bg-gray-50 rounded-full p-3">
		<div class="i-lucide-rss" />
	</a>
	<a
		href="https://github.com/kawakamimoeki/stock"
		target="_blank"
		aria-label="GitHub"
		class="block hover:bg-gray-50 rounded-full p-3"
	>
		<div class="i-lucide-github" />
	</a>
</header>

<main class="max-w-4xl mx-auto">
	<slot />
</main>

<footer class="text-gray-500 p-4 text-center">
	<p><a class="underline" href="/terms">利用規約</a></p>
	<p>&copy; stock 2023</p>
</footer>
