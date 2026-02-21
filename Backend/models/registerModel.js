import { insertUserProfile } from "../modules/registerModelModules.js";

export async function insertPerson({ name, firstname, birth_date, sex, localisation, profil_name, profil_description, mail, password, photo_profil = null, domaines }) {
    const sql = `
        INSERT INTO 
            personne(
                     nom_personne,
                     prenom_personne,
                     datenais,
                     sexe,
                     localisation,
                     nom_profil,
                     description_profil,
                     mail,
                     mot_de_passe,
                     photo_profil )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return insertUserProfile({
        sql,
        params: [name, firstname, birth_date, sex, localisation, profil_name, profil_description, mail, password, photo_profil],
        tableName: 'personne',
        relationTable: 'orienter_pers',
        profilName: profil_name,
        domaines
    });
}

export async function insertOrganisation({ name, creation_date, localisation, profil_name, profil_description, mail, password, photo_profil = null, domaines }) {

    const sql = `
        INSERT INTO 
            organisation(
                         nom_organisation,
                         date_creation,
                         localisation,
                         nom_profil,
                         description_profil,
                         mail,
                         mot_de_passe,
                         photo_profil ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return insertUserProfile({
        sql,
        params: [name, creation_date, localisation, profil_name, profil_description, mail, password, photo_profil],
        tableName: 'organisation',
        relationTable: 'orienter_org',
        profilName: profil_name,
        domaines
    });
}