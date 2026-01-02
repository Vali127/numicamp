import {pool} from '../../config/db.js'
import {blockageResult, deblockageResult, deletionResult, selectionResult} from './utils/userModelUtils.js'
import {getAccountUsageById} from "../loginModel.js";


export function userModel() {
    
    const global_selection_query = globalSelection()
    const unique_selection_query = `SELECT * FROM personne WHERE id_personne = ?`
    const deletion_query = `DELETE FROM ?? WHERE id_profil = ? `
    const block_query = `UPDATE ?? SET etat_profil = "bloque" WHERE id_profil = ?`
    const unblock_query = `UPDATE ?? SET etat_profil = "normal" WHERE id_profil = ?`
    
    
    async function getAllUser() {
        try {
            const query_result = await pool.query( global_selection_query )
            return selectionResult(query_result)
        } catch (error) {
            throw Error()
        }
    }

    async function getUser(id) {
        try {
            const query_result = await pool.query( unique_selection_query, [id] )
            return selectionResult(query_result)
        } catch (error) {
            throw Error()
        }
    }

    async function removeUser(id) {
        try {
            const usage = await getAccountUsageById(id)
            const table = (usage === "organisational") ? "organisation" : "personne";
            const query_result = await pool.query( deletion_query, [table, id] )
            return deletionResult(query_result)
        } catch (error) {
            throw Error()
        }
    }

    async function blockUser(id) {
        try {
            const usage = await getAccountUsageById(id)
            const table = (usage === "organisational") ? "organisation" : "personne";
            const query_result = await pool.query( block_query, [table, id] )
            return blockageResult(query_result)
        } catch (error) {
            throw Error()
        }
    }

    async function unblockUser(id) {
        try {
            const usage = await getAccountUsageById(id)
            const table = (usage === "organisational") ? "organisation" : "personne";
            const query_result = await pool.query( unblock_query, [table, id] )
            return deblockageResult(query_result)
        } catch (error) {
            throw Error()
        }
    }

    return {
        getAllUser,
        getUser,
        removeUser,
        blockUser,
        unblockUser,
    }

}


export const globalSelection = () => {
    return `
    SELECT 
    id_profil,
    NULL as nom_personne,
    NULL as prenom_personne,
    NULL as datenais,
    NULL as sexe,
    nom_organisation,
    date_creation,
    localisation,
    nom_profil,
    description_profil,
    etat_profil,
    mot_de_passe,
    mail,
    id_role,
    photo_profil
FROM organisation

UNION ALL

SELECT 
    id_profil,
    nom_personne,
    prenom_personne,
    datenais,
    sexe,
    NULL as nom_organisation,
    NULL as date_creation,
    localisation,
    nom_profil,
    description_profil,
    etat_profil,
    mot_de_passe,
    mail,
    id_role,
    photo_profil
FROM personne;
    `
}