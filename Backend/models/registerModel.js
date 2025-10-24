/**
 * fonction insertPersonne et insertOrganisation
 * param : data de services a inserer ou modifier la base
 * retour : succes ou echec
 */

import { pool } from '../config/db.js';


export async function insertPerson({ name, firstname, birth_date, sex, localisation, profil_name, profil_description, mail, password, photo_profil = null,domaines}) {
    console.log("debut model")

    const connection = await pool.getConnection();

    try{

        //debut de la transaction
        await connection.beginTransaction();

        const sqlPerson = `
        INSERT INTO personne(nom_personne, prenom_personne, datenais, sexe, localisation, nom_profil, description_profil, mail, mot_de_passe, photo_profil)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        await connection.query(sqlPerson, [
            name,
            firstname,
            birth_date,
            sex,
            localisation,
            profil_name,
            profil_description,
            mail,
            password,
            photo_profil
        ]);

        const [profilRow] = await connection.query(
            "SELECT id_profil FROM personne WHERE nom_profil = ?",
            [profil_name]
        );
        if (profilRow.length === 0) {
            throw new Error("Profil introuvable");
        }

        const idProfil = profilRow[0].id_profil;

        if (!Array.isArray(domaines) || domaines.length === 0) {
            throw new Error("Aucun domaine fourni");
        }
        const [domainesRows] = await connection.query(
            `SELECT id_domaine FROM domaine WHERE design_domaine IN (${domaines.map(() => '?').join(',')})`,
            domaines
        );
        if (domainesRows.length === 0) {
            throw new Error("Aucun domaine trouvé");
        }

        //Insérer les relations dans orienter
        const sqlOrienter = `INSERT INTO orienter (id_profil, id_domaine)VALUES (?, ?)`;
        for (const domain of domainesRows) {
            await connection.query(sqlOrienter, [idProfil, domain.id_domaine]);
        }

        await connection.commit();

        return {
                ok: true
        };

    }catch (error) {
        await connection.rollback(); // annule tout si erreur
        throw new Error("erreur modele "+error.message);
    }finally {
        connection.release();        // rend la connexion au pool
    }
}

export async function insertOrganisation({name,creation_date,localisation, profil_name, profil_description, mail, password, photo_profil = null, domaines}) {
    const connection = await pool.getConnection()
    try{
        await connection.beginTransaction()
        const sqlOrganisation = `
                        INSERT INTO organisation(nom_organisation,date_creation,localisation,nom_profil,description_profil,mail,mot_de_passe,photo_profil) 
                        VALUES (?,?,?,?,?,?,?,?);
    `;
        await connection.query(sqlOrganisation,[
           name,
           creation_date,
           localisation,
           profil_name,
           profil_description,
           mail,
           password,
           photo_profil
        ]);

        const [profilRow] = await connection.query(
            "SELECT id_profil FROM organisation WHERE nom_profil = ?",
            [profil_name]
        );
        if (profilRow.length === 0) {
            throw new Error("Profil introuvable");
        }

        const idProfil = profilRow[0].id_profil;
        if (!Array.isArray(domaines) || domaines.length === 0) {
            throw new Error("Aucun domaine fourni");
        }
        const [domainesRows] = await connection.query(
            `SELECT id_domaine FROM domaine WHERE design_domaine IN (${domaines.map(() => '?').join(',')})`,
            domaines
        );
        if (domainesRows.length === 0) {
            throw new Error("Aucun domaine trouvé");
        }

        //Insérer les relations dans orienter
        const sqlOrienter = `INSERT INTO orienter (id_profil, id_domaine)VALUES (?, ?)`;
        for (const domain of domainesRows) {
            await connection.query(sqlOrienter, [idProfil, domain.id_domaine]);
        }

        await connection.commit();

        return {
            ok: true
        };
    }
    catch (error) {
        await connection.rollback(); // annule tout si erreur
        throw new Error("erreur modele "+error.message);
    }finally {
        await connection.release()
    }
}