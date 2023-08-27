import { error } from '@sveltejs/kit';
import DB from '../../../data/db.json';
import type { PageServerLoad } from '../[slug]/$types.js';
import pkg from 'lodash';

const { compact, uniq, flatten } = pkg;

export function entries() {
	return DB.docs.map((t) => {
		return { id: t.id };
	});
}

export const load: PageServerLoad = async ({ params }) => {
	const doc = DB.docs.find((t) => t.id === params.id);

	if (!doc) {
		throw error(404);
	}

	const tags = DB.tags;

	return { doc, tags };
};
