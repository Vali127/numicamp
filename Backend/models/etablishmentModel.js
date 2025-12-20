import {pool} from "../config/db.js";

//pour recuperer les publications des organisations suivis par l user
export async function getEtablishment() {

    const sql = `SELECT * FROM etablissement`;

    try {
        const [rows] = await pool.query(sql);
        return {
            ok:true,
            message:"Etablissement récupérées avec succès",
            rows
        };

    } catch (err) {
        throw new Error("Erreur dans le modèle : " + err.message);
    }
}


