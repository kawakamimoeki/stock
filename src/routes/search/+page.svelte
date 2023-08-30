<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';
	import pkg from 'lodash';
	import TagCard from '$lib/TagCard.svelte';

	const { orderBy, shuffle } = pkg;

	export let data: PageData;

	export let q: string = '';
	export let searchResultDocs: any = shuffle(data.docs).slice(0, 10);
	export let searchResultTags: any = shuffle(data.tags).slice(0, 10);

	const fuseDoc = new Fuse(data.docs, { keys: ['title', 'description', 'url'] });
	const fuseTag = new Fuse(data.tags, { keys: ['name', 'slug'] });

	const search = () => {
		if (q) {
			searchResultDocs = orderBy(
				fuseDoc.search(q).map((t) => t.item),
				'refIndex',
				'desc'
			).slice(0, 10);
			searchResultTags = orderBy(
				fuseTag.search(q).map((t) => t.item),
				'refIndex',
				'desc'
			);
		} else {
			searchResultDocs = shuffle(data.docs).slice(0, 10);
			searchResultTags = shuffle(data.tags).slice(0, 10);
		}
	};
</script>

<svelte:head>
	<link href="https://stoc.dev/feed" rel="alternate" title="stoc.dev" type="application/rss+xml" />
</svelte:head>

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

{#if q}
	<h2 class="p-4 font-bold text-4xl">"{q}"</h2>
{:else}
	<h2 class="p-4 font-bold text-4xl">Random</h2>
{/if}

<div class="flex gap-2 items-center flex-wrap p-4 justify-center">
	{#each searchResultTags as tag}
		<TagCard {tag} />
	{/each}
</div>

<div class="p-4">
	{#each searchResultDocs as doc}
		<DocCard {doc} tags={data.tags} />
	{/each}
</div>
