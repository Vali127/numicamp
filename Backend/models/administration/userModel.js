import {pool} from '../../config/db.js'
import { deletionResult, selectionResult } from './utils/userModelUtils.js'


export function userModel() {
    
    const global_selection_query = `SELECT * FROM personnes`
    const unique_selection_query = `SELECT * FROM personnes WHERE id_personne = ?`
    const deletion_query = `DELETE FROM personnes WHERE id_personne = ? `
    
    
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
            const query_result = await pool.query( deletion_query, [id] )
            return deletionResult(query_result)
        } catch (error) {
            throw Error()
        }
    }

    

    return {
        getAllUser,
        getUser,
        removeUser
    }

}