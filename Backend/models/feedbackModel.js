import {pool} from "../config/db.js";
import {getAccountUsage, getAccountUsageById} from "./loginModel.js";


export function FeedbackModel () {

    const selection_query = `SELECT * FROM feedback`
    const person_selection_query = `SELECT * FROM feedback WHERE id_profil_pers = ? `
    const organization_selection_query = `SELECT * FROM feedback WHERE id_profil_org = ? `
    const person_feedback_registration_query = `INSERT INTO feedback (id_profil_pers, contenu) VALUES (?, ?)`
    const organisation_feedback_registration_query = `INSERT INTO feedback (id_profil_org, contenu) VALUES (?, ?)`

    async  function GetFeedBacks(id_user) {
        try {
            const usage = await getAccountUsageById(id_user)
            let sql, params

            if (usage === "admin") { sql = selection_query; params = [] }
            else if (usage === "personal") { sql = person_selection_query; params = [id_user] }
            else if (usage === "organisational") { sql = organization_selection_query ; params = [id_user] }

            const [result] = await pool.query( sql, params )
            return {result : result, usage : usage }
        } catch (err) {
            throw Error()
        }
    }

    async function registerFeedback (id_profil, content) {
        try {
            const usage = await getAccountUsageById(id_profil)
            const sql = ( usage === "organisational" ) ? organisation_feedback_registration_query : person_feedback_registration_query
            const [res] = await pool.query(sql, [id_profil, content])
            return res.affectedRows > 0

        } catch (err) {
            throw Error(err)
        }
    }

    return {
        GetFeedBacks,
        registerFeedback,
    }
}