<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Tagcard from '$lib/TagCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.tag.name} - stoc.dev</title>
</svelte:head>

<div class="flex items-center space-x-2 p-4">
	{#if data.tag.iconFormat}
		<img src="/img/tags/{data.tag.slug}.{data.tag.iconFormat}" alt="" width="32px" height="32px" />
	{/if}
	<h1 class="font-bold text-3xl sticky">{data.tag.name}</h1>
</div>

<div class="flex gap-2 items-center flex-wrap p-4">
	{#each data.tags as tag}
		<Tagcard {tag} />
	{/each}
</div>

<div class="p-4">
	{#each data.docs as doc}
		<DocCard {doc} tags={data.tags} />
	{/each}
</div>
