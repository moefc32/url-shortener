import { json, error, redirect } from '@sveltejs/kit';
import model from '$lib/model/urls';

export async function GET({ params, request }) {
    try {
        const { page } = params;
        const ref = request.headers.get('referer') || 'direct';
        const agent = request.headers.get('user-agent') || '';
        const ip = request.headers.get('client-ip')
            || request.headers.get('x-forwarded-for')
            || (request.socket ? request.socket.remoteAddress : undefined);

        const result = await model.getEntry(page, { ref, agent, ip });

        if (result) {
            return new Response(null, {
                status: 302,
                headers: {
                    location: result.long,
                },
            });
        }

        throw error(404, 'Not Found');
    } catch (e) {
        console.error(e);
        throw error(500, e);
    }
}
