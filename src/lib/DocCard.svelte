<script lang="ts">
	import type DB from '../data/db.json';
	import Tagcard from './TagCard.svelte';
	export let doc: (typeof DB.docs)[0];
	export let tags: typeof DB.tags;
</script>

<div class="mb-12">
	<div class="flex items-center space-x-1">
		{#if doc.icon}
			<img
				src={doc.icon || `https://source.boringavatars.com/bauhaus?&name=stoc`}
				class="w-[16px] h-[16px] object-cover"
				width="16px"
				height="16px"
				alt=""
			/>
		{/if}
		<p class="text-gray-500 font-bold text-sm">{doc.host}</p>
	</div>
	<h2 class="font-bold text-xl break-all text-gray-800">
		<a href="/docs/{doc.id}" class="cursor-pointer hover:underline">{doc.title}</a>
	</h2>
	<p class="break-all text-gray-600 text-sm mb-3">{doc.description}</p>
	<div class="flex gap-2 text-xs items-center flex-wrap">
		{#each doc.tags as tag}
			<Tagcard tag={tags.find((t) => t.slug === tag)} />
		{/each}
	</div>
</div>
