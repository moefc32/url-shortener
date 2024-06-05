import { VITE_APP_NAME } from '$env/static/private'
import { json, error } from '@sveltejs/kit';
import model from '$lib/model/urls';

export async function GET({ url }) {
    try {
        const page = url.searchParams.get('page') || 1;
        const pageSize = url.searchParams.get('pageSize') || 10;
        const result = await model.getData(page, pageSize);

        return json({
            application: VITE_APP_NAME,
            data: result,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}

export async function POST({ request }) {
    try {
        const {
            title = '',
            short = '',
            long = '',
        } = await request.json() || {};

        if (title && short && long) {
            const created_at = new Date(due);
            const data = {
                title,
                short,
                long,
                created_at,
                clicks: [],
            };
            const result = await model.createData(data);

            return json({
                application: VITE_APP_NAME,
                data: result,
            });
        }

        error(400, e);
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}

export async function PATCH({ url, request }) {
    try {
        const id = url.searchParams.get('id');
        const {
            title = '',
            short = '',
            long = '',
        } = await request.json() || {};

        const data = {};
        if (title) data.title = title;
        if (short) data.short = short;
        if (long) data.long = long;

        const result = await model.editData(id, data);

        return json({
            application: VITE_APP_NAME,
            data: result,
        });
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}

export async function DELETE({ url }) {
    try {
        const id = url.searchParams.get('id');

        if (id) {
            const result = await model.deleteData(id);

            return json({
                application: VITE_APP_NAME,
                data: result,
            });
        }

        error(400, e);
    } catch (e) {
        console.error(e);
        error(500, e);
    }
}
