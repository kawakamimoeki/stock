<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';
	import { orderBy } from 'lodash';
	import TagCard from '$lib/TagCard.svelte';
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
</script>

<nav class="text-center">
	<div class=" py-2 px-3 text-sm rounded inline-flex space-x-2 items-center bg-gray-100">
		<div class="i-lucide-search opacity-30" />
		<input
			class="w-[300px] outline-none bg-gray-100 font-bold"
			placeholder="ドキュメントを検索"
			type="search"
			bind:value={q}
			on:input={search}
		/>
	</div>
</nav>

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
{/if}

<h2 class="p-4 font-bold text-4xl">Tags</h2>
<div class="flex gap-2 items-center flex-wrap p-4">
	{#each data.tags as tag}
		<TagCard {tag} />
	{/each}
</div>
