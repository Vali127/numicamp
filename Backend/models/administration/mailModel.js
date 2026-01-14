import { pool } from "../../config/db.js";
import { getAccountUsageById } from "../loginModel.js";



export async function getAdminsMail() {
    const sql = "SELECT mail FROM personne WHERE id_role = 'admin' ";
    try {
        const [result] = await pool.query(sql)
        return result.map( item => item.mail )
    } catch (err) {
        console.log(err)
    }
}

export async function getUsername(id) {
    try {
        const usage = await getAccountUsageById(id);
        const table = (usage === "organisational") ? "organisation" : "personne";
        const sql  = "SELECT nom_profil FROM ?? WHERE id_profil = ? ";
        const [result] = await pool.query(sql, [table, id]);
        return result[0].nom_profil;
    } catch (err) {
        throw Error(err)
    }
}