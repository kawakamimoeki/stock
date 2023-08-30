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

<div class="p-4 text-center">
	<h2 class="text-2xl font-bold mb-4">特集</h2>
	<div class="overflow-x-scroll scrollbar-none mx-auto max-w-sm">
		<div class="flex gap-3 font-bold overflow-visible flex-nowrap">
			<a class="hover:text-gray-700 flex-none" href="/tags/history">ウェブの歴史</a>
			<a class="hover:text-gray-700 flex-none" href="/tags/beginners">初学者向け</a>
			<a class="hover:text-gray-700 flex-none" href="/tags/development">開発全般</a>
			<a class="hover:text-gray-700 flex-none" href="/tags/javascript">Javascript</a>
		</div>
	</div>
</div>

<div class="p-4 text-center">
	<div class=" py-2 px-3 rounded inline-flex space-x-2 items-center bg-gray-100">
		<div class="i-lucide-search opacity-30" />
		<input
			class="w-[300px] outline-none bg-gray-100 font-bold"
			placeholder="ドキュメントを検索"
			type="search"
			bind:value={q}
			on:input={search}
		/>
	</div>
</div>

{#if searchResult.length > 0}
	<h2 class="p-4 font-bold text-4xl">"{q}"</h2>
	<div class="p-4">
		{#each searchResult as doc}
			<DocCard {doc} tags={data.tags} />
		{/each}
	</div>
{:else}
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
{/if}

<h2 class="p-4 font-bold text-4xl">Tags</h2>
<div class="flex gap-2 items-center flex-wrap p-4 justify-center">
	{#each data.tags as tag}
		<TagCard {tag} />
	{/each}
</div>
