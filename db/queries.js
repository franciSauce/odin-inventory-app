const pool = require('./pool');

const getAllManga = async () => {
    const { rows } = await pool.query("SELECT * FROM manga");
    return rows;
}

const getMangaDetailById = async (id) => {
    const { rows: [manga] } = await pool.query('SELECT * FROM manga WHERE id = $1', [id]);
    const { rows: staff } = await pool.query(`
        SELECT s.*, ms.role_id AS roleid, r.title AS role
        FROM staff s
        LEFT JOIN manga_staff ms ON ms.staff_id = s.id
        LEFT JOIN roles r ON r.id = ms.role_id
        WHERE ms.manga_id = $1
        `, [id]);
    const { rows: genres } = await pool.query(`
        SELECT g.* FROM genres g
        LEFT JOIN manga_genres mg ON mg.genre_id = g.id
        WHERE mg.manga_id = $1
        `, [id]);
    return {
        ...manga,
        staff,
        genres,
    }
}