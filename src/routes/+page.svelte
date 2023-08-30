<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';
	import pkg from 'lodash';
	import TagCard from '$lib/TagCard.svelte';

	const { orderBy, shuffle } = pkg;

	export let data: PageData;

	export let q: string = '';
	export let searchResult: any = [];

	const fuse = new Fuse(data.docs, { keys: ['title', 'description', 'url'] });

	const search = () => {
		if (q) {
			searchResult = orderBy(
				fuse.search(q).map((t) => t.item),
				['refIndex']
			);
		} else {
			searchResult = [];
		}
	};

	export let random = shuffle(data.docs).slice(0, 10);
</script>

<svelte:head>
	<link href="https://stoc.dev/feed" rel="alternate" title="stoc.dev" type="application/rss+xml" />
</svelte:head>

<h2 class="p-4 font-bold text-4xl">Latest</h2>
<div class="p-4">
	{#each data.latest as doc}
		<DocCard {doc} tags={data.tags} />
	{/each}
</div>

<h2 class="p-4 font-bold text-4xl">Random</h2>
<div class="p-4">
	{#each random as doc}
		<DocCard {doc} tags={data.tags} />
	{/each}
</div>

<h2 class="p-4 font-bold text-4xl">Tags</h2>
<div class="flex gap-2 items-center flex-wrap p-4 justify-center">
	{#each data.tags as tag}
		<TagCard {tag} />
	{/each}
</div>
