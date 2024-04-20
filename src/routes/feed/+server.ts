import RSS from 'rss';
import DB from '../../data/db.json';
import _ from 'lodash';

export async function GET() {
	const feed = new RSS({
		title: 'stock',
		description: '開発者が有益な情報へ効率的にたどり着くためのリンク集',
		feed_url: 'https://stock-dev.vercel.app/feed',
		site_url: 'https://stock',
		image_url: 'https://stock-dev.vercel.app/ogp.png',
		managingEditor: 'hello@moeki.dev',
		webMaster: 'hello@moeki.dev',
		copyright: '2023 Moeki Kawakami',
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
