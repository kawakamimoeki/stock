import { error } from '@sveltejs/kit';
import DB from '../../../data/db.json';
import type { PageServerLoad } from './$types.js';
import pkg from 'lodash';

const { compact, uniq, flatten } = pkg;

export function entries() {
	return DB.tags.map((t) => {
		return { slug: t.slug };
	});
}

export const load: PageServerLoad = async ({ params }) => {
	const tag = DB.tags.find((t) => t.slug === params.slug);

	if (!tag) {
		throw error(404);
	}

	const result = DB.docs.filter((doc) => doc.tags.includes(tag.slug));
	const tags = compact(
		uniq(flatten(result.map((d) => d.tags))).map((tag) => DB.tags.find((t) => t.slug === tag))
	).filter((t) => t.slug !== tag.slug);
	return { docs: result, tags, tag };
};
