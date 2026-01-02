import {pool} from "../../config/db.js";


export async function verifyAdmin(id) {
    try {
        const sql = `SELECT * FROM personne WHERE id_profil = ? AND id_role ="admin";`
        const [result] = await  pool.query(sql, [id]);
        return result.length > 0
    } catch (e) {
        console.error(e);
        throw Error(e);
    }
}