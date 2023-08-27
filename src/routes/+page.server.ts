import DB from '../data/db.json';
import type { PageServerLoad } from './$types.js';
import _ from 'lodash';

export const load: PageServerLoad = async () => {
	const latest = _.orderBy(DB.docs, 'createdAt', 'desc').slice(0, 10);
	const tags = _.orderBy(DB.tags, 'name', 'asc');
	return { docs: DB.docs, latest, tags };
};
