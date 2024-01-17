import { Router } from 'itty-router';

const router = Router();

router.post('/:key/:event',  async (request) => {
	const { params } = request
	const formData = await request.formData()
	const json = formData.get('payload')
	const response = await fetch(`https://maker.ifttt.com/trigger/${params.event}/json/with/key/${params.key}`, {
		method: 'POST',
		body: json
	})
	return new Response(await response.text(), {
		headers: { 'Content-Type': 'application/json' },
		status: response.status
	})
});

router.all('*', () => Response.redirect('https://github.com/deadlynjdj/plex', 302));

export default {
	fetch: router.handle,
};
