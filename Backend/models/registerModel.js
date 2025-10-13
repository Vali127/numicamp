/**
 * fonction insertPersonne et insertOrganisation
 * param : data de services a inserer ou modifier la base
 * retour : succes ou echec
 */

import { pool } from '../config/db.js';


export async function insertPerson({ name, firstname, birth_date, sex, localisation, profil_name, profil_description, mail,password }) {

    const sql = `
        INSERT INTO personne(nom_personne, prenom_personne, datenais, sexe, localisation, nom_profil, description_profil,mail, mot_de_passe)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    try{
        const [result] = await pool.query(sql, [
            name,
            firstname,
            birth_date,
            sex,
            localisation,
            profil_name,
            profil_description,
            mail,
            password

        ]);

        return {
                ok: true,
                result
        };

    }catch (error) {
        return {
            ok: false,
            error: error.message,
        }
    }

}

export async function insertOrganisation({name,creation_date,localisation, profil_name, profil_description, mail,password}) {
    const sql = `
                        INSERT INTO organisation(nom_organisation,date_creation,localisation,nom_profil,description_profil,mail,mot_de_passe) 
                        VALUES (?,?,?,?,?,?,?);
    `;
    try{
        const [result] = await pool.query(sql,[
           name,
           creation_date,
           localisation,
           profil_name,
           profil_description,
           mail,
           password
        ]);
        return {
            ok: true,
            result
        };
    }
    catch (error) {
        return {
            ok: false,
            error: error.message,
        }
    }
}