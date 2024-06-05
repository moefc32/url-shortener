import { VITE_APP_NAME } from "$env/static/private";
import checkCookies from '$lib/checkCookies';

export async function load({ fetch, cookies }) {
    try {
        const token = cookies.get('access_token');
        const isLoggedIn = checkCookies(token);

        if (!isLoggedIn) throw new Error();

        const response = await fetch('middleware');
        const { data } = await response.json();

        return {
            appName: VITE_APP_NAME,
            isLoggedIn,
            urls: data,
        };
    } catch (e) {
        console.error(e);

        return {
            appName: VITE_APP_NAME,
            isLoggedIn: false,
            urls: [],
        };
    }
}
