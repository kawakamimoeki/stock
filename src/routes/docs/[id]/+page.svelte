<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Tagcard from '$lib/TagCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.doc.title} - stock</title>
</svelte:head>

{#if data.doc.image}
	<div class="p-4">
		<img src={data.doc.image} alt="" width="400px" height="210" class="mx-auto my-8 rounded" />
	</div>
{/if}

<div class="flex items-center space-x-2 p-4">
	{#if data.doc.icon}
		<img src={data.doc.icon} alt="" width="32px" height="32px" />
	{/if}
	<h1 class="font-bold text-3xl sticky">{data.doc.title}</h1>
</div>

<p class="break-all p-4 text-gray-600 text-sm">{data.doc.description}</p>
<div class="flex gap-2 p-4 text-xs items-center flex-wrap">
	{#each data.doc.tags as tag}
		<Tagcard tag={data.tags.find((t) => t.slug === tag)} />
	{/each}
</div>

<div class="text-center p-4">
	<a
		class="gap-2 inline-flex items-center underline text-blue-500 font-bold"
		href={data.doc.url}
		target="_blank"
	>
		<div>VISIT WEBSITE</div>
		<div class="i-lucide-external-link" />
	</a
	>
</div>
