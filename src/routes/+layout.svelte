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
	<title>stoc.dev</title>
	<meta name="description" content="Where developers share knowledge." />
	<meta property="og:site_name" content="Stoc" />
	<meta property="og:title" content="Stoc" />
	<meta property="og:description" content="Where developers share knowledge." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stoc.dev/" />
	<meta property="og:local" content="ja-JP" />
	<meta property="og:image" content="https://stoc.dev/ogp.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://stoc.dev/ogp.png" />
</svelte:head>

<header class="p-4 max-w-4xl mx-auto flex items-center text-center w-full">
	<a class="font-bold" href="/">stoc.dev</a>
	<div class="grow" />
	<a href="/feed" aria-label="RSS" target="_blank" class="block hover:bg-gray-50 rounded-full p-3">
		<div class="i-lucide-rss" />
	</a>
	<a
		href="https://discord.gg/WTy8tpvZUn"
		aria-label="Discord"
		target="_blank"
		class="block hover:bg-gray-50 rounded-full p-3"
	>
		<div class="i-bxl-discord-alt" />
	</a>
	<a
		href="https://github.com/moekidev/stoc.dev"
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
	<p><a href="/terms">利用規約</a></p>
	<p>&copy; stoc.dev 2023</p>
</footer>
