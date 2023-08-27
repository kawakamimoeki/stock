#!/usr/bin/env node

import { v4 as uuidv4 } from 'uuid';
import cac from 'cac';
import { join } from 'node:path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

export const parseOGP = async ({ body, url }) => {
	const document = new JSDOM(body).window.document;

	const title = document.querySelector('title').textContent;
	let description = document
		.querySelector('meta[property="og:description"]')
		?.getAttribute('content');
	const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
	let icon = document.querySelector('link[rel="icon"]')?.getAttribute('href');
	const host = new URL(url).hostname;
	const origin = new URL(url).origin;

	if (!icon) {
		icon = document.querySelector('link[rel="shortcut icon"]')?.getAttribute('href');
	}

	if (icon && !icon.match('http')) {
		icon = new URL(icon, origin).href;
	}

	if (!description) {
		description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
	}

	return {
		title: title || '',
		description: description || '',
		icon: icon || '',
		host: host || '',
		image: image || ''
	};
};

const cli = cac();
cli
	.command('doc <url>', 'Add document')
	.option('--tags <tags>', 'Document tags')
	.action(async (url, options) => {
		const tags = options.tags ? options.tags.split(',') : [];
		const db = new Low(new JSONFile(join('src', 'data', 'db.json')), {});
		await db.read();

		if (db.data.docs?.find((d) => d.url === url)) {
			console.log(`${url} already exists.`);
			return;
		}

		const res = await fetch(url);
		const body = await res.text();
		const ogp = await parseOGP({ url, body });

		db.data.docs.push({
			id: uuidv4(),
			url,
			tags,
			...ogp,
			createdAt: new Date()
		});
		console.log(`${url} is added to docs list.`);

		tags.forEach((tag) => {
			if (!db.data.tags.find((t) => t.slug === tag)) {
				db.data.tags.push({ slug: tag, name: tag, iconFormat: '', createdAt: new Date() });
				console.log(`${tag} is added to tags list.`);
			}
		});
		await db.write();
	});

cli.command('tag <slug> <name>', 'Add tag').action(async (slug, name) => {
	const db = new Low(new JSONFile(join('src', 'data', 'db.json')), {});
	await db.read();
	if (db.data.tags.find((t) => t.slug === slug)) {
		console.log(`${slug} already exists.`);
		return;
	}
	db.data.tags.push({ slug, name, iconFormat: '', createdAt: new Date() });
	console.log(`${slug} is added to tags list.`);
	await db.write();
});

cli.help();

cli.parse();
