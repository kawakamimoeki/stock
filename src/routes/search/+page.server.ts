import DB from '../../data/db.json';
import type { PageServerLoad } from './$types.js';
import _ from 'lodash';

export const load: PageServerLoad = async () => {
	return { docs: DB.docs, tags: DB.tags };
};
