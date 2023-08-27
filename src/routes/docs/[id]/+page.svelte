<script lang="ts">
	import DocCard from '$lib/DocCard.svelte';
	import Tagcard from '$lib/TagCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.doc.title} - stoc.dev</title>
</svelte:head>

<img src={data.doc.image} alt="" width="400px" height="210" class="mx-auto my-8 rounded" />

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
	<a class="bg-green-600 py-2 px-5 hover:bg-green-700 text-white rounded font-bold" href={data.doc.url} target="_blank">VISIT WEBSITE</a>
</div>
