import {pool} from "../config/db.js";


export async function  getProfileData(user_id) {

      try {
        
        const user_type = await getUserType(user_id)
        const user_data = await getUserData(user_id, user_type)
        const domains = await getUserDomain(user_id, user_type)
        const following = await getUserFollowNumber(user_id, user_type)

        return {
            user_type : user_type,
            user_data : user_data,
            domains : domains,
            follow : following
        }

      } 
      catch (error) {
        throw new Error("Erreur de données : " + error)
      }

}


async  function getUserType(id) {
    const sql = `SELECT nom_personne FROM personne WHERE id_profil = ?`
    try {
        const res = await pool.query(sql, [id])
        return ( res.length > 0 ) ? "personal" : "organisational"
    }
    catch (e) {
        throw new  Error("Error getting profile usage : " + e)
    }
}


async  function getUserData(id, usage) {
    const sql = ( usage === "personal" ) ? `SELECT * FROM personne WHERE id_profil = ?` : `SELECT * FROM organisation WHERE id_profil = ?`
    try {
        const [row] = await pool.query(sql, [id])

        if ( !row )
            throw new  Error("user dataset not found")

        return row[0]
    } catch (e) {
        throw new  Error("Error getting profile data : " + e)
    }
}


async function getUserDomain(id, usage) {
    const sql = (usage === "personal") ?
        `
            SELECT design_domaine
            FROM domaine dom,orienter_pers op
            WHERE ( op.id_profil = ? ) AND ( dom.id_domaine = op.id_domaine )
        ` :
        `
            SELECT design_domaine
            FROM domaine dom, orienter_org oo
            WHERE ( oo.id_profil = ? ) AND ( dom.id_domaine = oo.id_domaine )
        `
    try {
        const [res] = await pool.query(sql, [id])
        return res
    } catch (e) {
        throw new  Error("Error getting profile domain : " + e)
    }
}


async function getUserFollowNumber(id, usage) {
    const sql = (usage === "personal") ?
        ` 
            SELECT COUNT(*) as following 
            FROM abonner, personne 
            WHERE ( id_profil_pers = id_profil ) AND ( id_profil_pers = ? )
        ` :
        `
            SELECT COUNT(*) as follower
            FROM abonner, organisation
            WHERE ( id_profil_org = id_profil ) AND ( id_profil_org = ? )
        `
    try {
        const [res] = await pool.query(sql, [id])
        return res[0].following
    }
    catch (e) {
        throw new  Error("Error getting follower/following number : " + e)
    }
}