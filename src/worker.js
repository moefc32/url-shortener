import { Hono } from 'hono';
import { getLongURL } from './query.js';

const app = new Hono();

app.get('/:short', async (c) => {
    const env = c.env;
    const longURL = await getLongURL(
        env.D1_URL_SHORTENER,
        c.req.param('short')
    );

    if (longURL) return c.redirect(longURL, 302);
    return c.notFound();
});

app.notFound(async (c) => {
    const response = await c.env.ASSETS.fetch(
        new Request(new URL('/404.html', c.req.url))
    );

    return new Response(response.body, {
        status: 404,
        headers: response.headers,
    });
});

export default app;
