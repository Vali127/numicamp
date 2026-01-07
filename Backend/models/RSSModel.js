import { pool } from "../config/db.js"
import {deletionResult, insertionResult} from "./administration/utils/resourceModelUtils.js";



export async function registerResource (data) {
    const insertion_query = `INSERT INTO ?? (lien, design_res, description_res) VALUES (?,?,?)`
    const table = (data.type === "news" ) ? "ressource" : "ressoure_2";
    try {
        const [result] = await pool.query(insertion_query, [table, data.link, data.name, data.description])
        return insertionResult(result)
    } catch (error) {
        throw Error(error);
    }
}

export async function deleteResource (link, type) {
    const deletion_query = `DELETE from ?? WHERE lien = ?`
    const table = (type === "news" ) ? "ressource" : "ressource_2";
    try {
        const [result] = await pool.query(deletion_query, [table, link])
        return deletionResult(result)
    } catch (error) {
        throw Error(error);
    }
}

export async function getResourceList() {
    try {
        const selection_query = `
            SELECT
                r.lien,
                r.design_res,
                r.description_res,
                d.design_domaine,
                'news' AS type
            FROM ressource r
                     INNER JOIN posseder p ON r.lien = p.lien
                     INNER JOIN domaine d ON p.id_domaine = d.id_domaine

            UNION ALL

            SELECT
                r2.lien,
                r2.design_res,
                r2.description_res,
                d.design_domaine,
                'site' AS type
            FROM ressource_2 r2
                     INNER JOIN posseder_2 p2 ON r2.lien = p2.lien
                     INNER JOIN domaine d ON p2.id_domaine = d.id_domaine
        `
        const [result] = await pool.query(selection_query)
        return result
    } catch (error) {
        console.error(error)
        throw Error(error)
    }
}


export async function getUserRessourcePages(user_id) {
    try {
        const domains_id = await getUserDomain(user_id)
        let response = []
        for (  const domain_id of domains_id ) {
            const foo = await getDomainsResources(domain_id)
            response.push(...foo)
        }
    
        return response
    }
    catch (err) {
        console.log("Error : ", err)
        throw new Error ("Error from the Model")
    }
}


export async function getUserRSSLinkList(user_id) {
    try {
        
        const domains_id = await getUserDomain(user_id)
        let response = []

        for ( const domain_id of domains_id ) {
            const foo = await getDomainRSS(domain_id)
            response.push(...foo.map(r => r.lien))
        }
        
        return response
    }
    catch (error) {
        console.log(error)
        throw new Error("ERROR ON RSS MODEL " + error.message)
    }
}


async function getUserDomain(id) {
    
    const sql = `
            SELECT dom.id_domaine
            FROM domaine dom,orienter_pers op
            WHERE ( op.id_profil = ? ) AND ( dom.id_domaine = op.id_domaine )
        `
    try {
        const [res] = await pool.query(sql, [id])
        return res.map(r => r.id_domaine)
    } catch (error) {
        console.log(error) 
        throw new  Error("Error getting domains : " + e)
    }
}

async function getDomainRSS(domain_id) {
    try {
        const sql = `
            SELECT lien
            FROM posseder
            WHERE posseder.id_domaine = ?
            ORDER BY RAND()
            LIMIT 5
        `
        const [res] = await pool.query(sql, [domain_id])
        return res
    }
    catch (error) {
        console.log(error)
        throw new  Error("Error getting domains : " + error )
    }
}


async function getDomainsResources(id) {
    try {
        
        const sql = `
            SELECT r.lien, r.design_res , r.description_res, d.design_domaine
            FROM ressource_2 r, posseder_2 p, domaine d
            WHERE r.lien = p.lien AND d.id_domaine = p.id_domaine AND  p.id_domaine = ?
        `
        const [res] = await pool.query( sql, [id] )
        return res

    } catch (error) {
        console.log("Error on getting domains ressources : ", error)
    }
}