<script lang="ts">
	import type DB from '../data/db.json';
	export let tag: (typeof DB.tags)[0] | undefined;
</script>

{#if tag}
	<a
		href="/tags/{tag.slug}"
		class="flex items-center space-x-1 px-4 py-1 text-gray-600 text-xs rounded bg-gray-100 hover:bg-gray-200 font-bold"
	>
		{#if tag.icon}
			<img src="/img/tags/{tag.slug}.webp" alt="" width="12px" height="12px" />
		{/if}
		<p>{tag.name}</p>
	</a>
{/if}
