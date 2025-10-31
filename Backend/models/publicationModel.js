/**
 * param : titre,description,nom_profil (auteur) de la publication, photopath
 * retour : succes ou echec
 *
 */
import {pool} from "../config/db.js";

export async function insertPublication({ title, description, profil_name ,photoPath = null}) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [rowPers] = await connection.query(
            "SELECT id_profil FROM personne WHERE nom_profil = ?",
            [profil_name]
        );
        const [rowOrg] = await connection.query(
            "SELECT id_profil FROM organisation WHERE nom_profil = ?",
            [profil_name]
        );

        let idProfil = null;
        let isOrg = false;

        //si trouve dans table personne
        if (rowPers.length > 0) {
            idProfil = rowPers[0].id_profil;
        }
        //si trouve dans table organisation
        else if (rowOrg.length > 0) {
            idProfil = rowOrg[0].id_profil;
            isOrg = true;
        }
        else {
            throw new Error("Profil introuvable !");
        }

        //Insertion dans la table publication
        const sql = `
      INSERT INTO publication (titre_pub, description_pub, photo_pub, id_profil_pers, id_profil_org)
      VALUES (?, ?, ?, ?, ?);
    `;
        await connection.query(sql, [
            title,
            description,
            photoPath,
            isOrg ? null : idProfil,
            isOrg ? idProfil : null
        ]);

        await connection.commit();

        return{
            ok: true
        }
        // console.log(" Publication ajoutée avec succès !");

    } catch (err) {

        await connection.rollback();
        throw new Error("Erreur lors de l’insertion : " + err.message);

    } finally {
        connection.release();
    }
}

//pour recuperer les publications de l' utilisateur
export async function getPubDescriptionUser(idProfil){

    const sql = 'SELECT * FROM publication WHERE id_profil_pers = ?';
    try{
        const [rowsPub] = await pool.query(sql, [idProfil]);
        return {
            ok:true,
            message:"Publications récupérées avec succès",
            rowsPub
        };
    }catch (err){
        throw new Error("Erreur dans le model :"+err.message);
    }

}

//pour recuperer les publications des organisations suivis par l user
export async function getPubDescriptionOrg(idProfil) {

           const sql = `
            SELECT p.*
            FROM publication p
            WHERE p.id_profil_org IN (
                   SELECT a.id_profil_org
                   FROM abonner a
                   WHERE a.id_profil_pers = ?
               )
            ORDER BY p.date_pub DESC;
        `;

    try {
        const [rows] = await pool.query(sql, [idProfil]);
        return {
            ok:true,
            message:"Publications récupérées avec succès",
            rows
            };

    } catch (err) {
        throw new Error("Erreur dans le modèle : " + err.message);
    }
}


