import {pool} from '../config/db.js'


export async function updateProfilModel(data) {
    try {
        // si 'data.sexe' existe, ça veut dire qu'il s'agit d'une personne
        return (data.sexe !== undefined ) ? await updateAccountForPerson(data) : await updateAccountForOrganisation(data)
    }
    catch(error) {
        throw new Error ("PROBLEM : " + error.message)
    }
}


async function updateAccountForPerson(data) {
    try {
        const sql = `
            UPDATE personne
            SET 
                nom_personne = ?,
                prenom_personne = ?,
                datenais = ?,
                sexe = ?,
                localisation = ?,
                nom_profil = ?,
                description_profil = ?,
                mail = ?,
                photo_profil = ?
            WHERE
                id_profil = ?
        `
        await pool.query(sql, [
            data.nom_personne,
            data.prenom_personne,
            data.datenais,
            data.sexe,
            data.localisation,
            data.nom_profil,
            data.description_profil,
            data.mail,
            data.photo_profil,
            data.id_profil
        ])
        return true
    } catch(error) {
        throw new Error("PROFIL UPDATE MODEL : " + error.message)
    }
}


async function updateAccountForOrganisation(data) {
    try {
        const sql = `
            UPDATE organisation
            SET 
                nom_organisation = ?,
                date_creation = ?,
                localisation = ?,
                nom_profil = ?,
                description_profil = ?,
                mail = ?,
                photo_profil = ?
            WHERE
                id_profil = ?
        `
        await pool.query(sql, [
            data.nom_organisation,
            data.date_creation,
            data.localisation,
            data.nom_profil,
            data.description_profil,
            data.mail,
            data.photo_profil,
            data.id_profil
        ])
        return true
    } catch(error) {
        throw new Error("PROFIL UPDATE MODEL : " + error.message)
    }
}