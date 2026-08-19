import { getLongURL } from './query.js';

export default {
    async email(message, env, ctx) {
        const blocked = await getLongURL(
            env.D1_URL_SHORTENER,
            message.from.trim().toLowerCase()
        );

        if (blocked) return;
    }
}
