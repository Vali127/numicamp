import { pool } from "../config/db.js";

/**
les /**
 * param : titre,description,nom_profil (auteur) de la publication, photopath
 * traitement : insertion pub, insertion association comprendre mot cle, insertion association concener domaine
 * retour : succes ou echec
 *
 */
import {pool} from "../config/db.js";

export async function insertPublication({ title, description,photoPath=null,keywords,domains,id}) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [rowPers] = await connection.query(
            "SELECT id_profil FROM personne WHERE id_profil  = ?",
            [id]
        );
        const [rowOrg] = await connection.query(
            "SELECT id_profil FROM organisation WHERE id_profil = ?",
            [id]
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
        const sqlPub = `
      INSERT INTO publication (titre_pub, description_pub, photo_pub, id_profil_pers, id_profil_org)
      VALUES (?, ?, ?, ?, ?);
    `;
        await connection.query(sqlPub, [
            title,
            description,
            photoPath,
            isOrg ? null : idProfil,
            isOrg ? idProfil : null
        ]);
        const [[{ id_pub }]] = await connection.query(`SELECT @last_id_pub AS id_pub`);

        //inserer dans mot cle les mots cles
        for (const mot of keywords) {
            // Vérifier s’il existe déjà
            const [exist] = await connection.query(
                `SELECT id_mot_cle FROM mot_cle WHERE mot_cle = ?`,
                [mot]
            );

            let id_mot_cle;
            if (exist.length > 0) {
                // Mot déjà existant
                id_mot_cle = exist[0].id_mot_cle;
            } else {
                await connection.query(
                    `INSERT INTO mot_cle (mot_cle) VALUES (?)`,
                    [mot]
                );
                 [[{ id_mot_cle }]] = await connection.query(`SELECT @last_mot_cle AS id_mot_cle`);
            }
            // Insérer dans comprendre
            await connection.query(
                `INSERT INTO comprendre (id_pub, id_mot_cle) VALUES (?, ?)`,
                [id_pub, id_mot_cle]
            );
        }

        //insertion des domaines
        if (!Array.isArray(domains) || domains.length === 0) {
            throw new Error("Aucun domaine fourni");
        }
        const [domainsRows] = await connection.query(
            `SELECT id_domaine FROM domaine WHERE design_domaine IN (${domaines.map(() => '?').join(',')})`,
            domains
        );
        if (domainsRows.length === 0) {
            throw new Error("Aucun domaine trouvé");
        }

        //Insérer les relations dans concerner
        const sqlConcerner = `INSERT INTO concerner (id_pub, id_domaine)VALUES (?, ?)`;
        for (const domain of domainsRows) {
            await connection.query(sqlConcerner, [id_pub, domain.id_domaine]);
        }

        await connection.commit();

        return{
            ok: true
        }

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


