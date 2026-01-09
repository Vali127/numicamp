import {pool} from "../config/db.js";
import {schoolInsertionResult} from "./administration/utils/shoolModelUtils.js";
import {deleteFile} from "../utils/fileManager.js";

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

export async function deleteEtablishment(id){
    try {
        const file_path = await getFilePath(id);
        const fileIsDeleted = deleteFile(file_path, "SchoolImages")
        if(!fileIsDeleted){ console.log("Couldn't delete <<", fileIsDeleted ,">> from the server") }
        const sql = `DELETE FROM etablissement WHERE code_etab = ? `;
        const [result] = await pool.query(sql, [id]);
        return {
            ok : result.affectedRows > 0 ,
            message: (result.affectedRows > 0) ? "Établissement supprimé" : "Établissement non supprimé",
        }
    } catch (err) {
        throw Error(err)
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
        throw Error(err);
    }
}


async function getFilePath(id) {
    try {
        const sql = `SELECT photo_etab FROM etablissement WHERE code_etab = ?`;
        const [result] = await pool.query(sql, [id]);
        return result[0].photo_etab ;
    } catch (err) {
        throw Error(err);
    }
}