export async function getLongURL(db, short) {
    const result = await db
        .prepare(`
            UPDATE URL_Shortener
            SET hit = hit + 1
            WHERE short = ?
            RETURNING long;
        `)
        .bind(short)
        .first();

    return result.results;
}
