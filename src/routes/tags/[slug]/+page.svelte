<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Tagcard from '$lib/TagCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.tag.name} - stock</title>
</svelte:head>

<div class="flex items-center space-x-2 p-4">
	{#if data.tag.icon}
		<img src="/img/tags/{data.tag.slug}.webp" alt="" width="32px" height="32px" />
	{/if}
	<h1 class="font-bold text-3xl sticky">{data.tag.name}</h1>
</div>

<div class="flex gap-2 items-center flex-wrap p-4">
	{#each data.relatedTags as tag}
		<Tagcard {tag} />
	{/each}
</div>

<div class="p-4">
	{#each data.docs as doc}
		<DocCard {doc} tags={data.allTags} />
	{/each}
</div>
