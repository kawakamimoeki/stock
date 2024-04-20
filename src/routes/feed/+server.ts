import RSS from 'rss';
import DB from '../../data/db.json';
import _ from 'lodash';

export async function GET() {
	const feed = new RSS({
		title: 'stock',
		description: 'About
Links to help developers reach useful information efficiently',
		feed_url: 'https://stock-dev.vercel.app/feed',
		site_url: 'https://stock',
		managingEditor: 'moeki.kawakami@icloud.com',
		webMaster: 'moeki.kawakami@icloud.com',
		copyright: '2024 Moeki Kawakami',
		language: 'ja'
	});

	_.orderBy(DB.docs, 'createdAt', 'desc').forEach((doc) => {
		feed.item({
			title: doc.title,
			description: doc.title,
			date: new Date(doc.createdAt),
			url: `https://stock-dev.vercel.app/docs/${doc.id}`
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
