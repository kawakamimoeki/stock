import RSS from 'rss';
import DB from '../../data/db.json';
import _ from 'lodash';

export async function GET() {
	const feed = new RSS({
		title: 'stoc.dev',
		description: '開発者が有益な情報へ効率的にたどり着くためのリンク集',
		feed_url: 'https://stoc.dev/feed',
		site_url: 'https://stoc.dev',
		image_url: 'https://stoc.dev/ogp.png',
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
			url: `https://stoc.dev/docs/${doc.id}`
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
