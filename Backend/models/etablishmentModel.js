import {pool} from "../config/db.js";
import {schoolInsertionResult} from "./administration/utils/shoolModelUtils.js";

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

export async function insertNewEtablishment(data) {
    const insertion_query = `INSERT INTO etablissement (nom_etab,description_etab,province,ville,quartier,photo_etab,site_etablissement) VALUES(?,?,?,?,?,?,?)`
    try {
        const [result] = await pool.query(insertion_query, [
            data.name,
            data.description,
            data.province,
            data.city,
            data.neighborhood,
            data.image,
            data.site
        ]);

        return schoolInsertionResult(result);
    } catch (err) {
        throw Error();
    }
}


