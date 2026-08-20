export async function getLongURL(db, short) {
    const result = await db
        .prepare(`
            UPDATE URL_Shortener
            SET hit = hit + 1
            WHERE short_url = ?
            RETURNING long_url;
        `)
        .bind(short)
        .first();

    return result?.long_url;
}
