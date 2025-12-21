import {pool} from "../../config/db.js";

export function StatsModel() {

    async function UsersStatsData() {
        try {
            const numberOfPerson = await GetNumberOfPerson();
            const numberOfOrganization = await GetNumberOfOrganization();
            const numberOfAdmin = await GetNumberOfAdmin();
            const total = numberOfPerson + numberOfOrganization + numberOfAdmin;

            return {
                number_of_person: numberOfPerson,
                number_of_organization: numberOfOrganization,
                number_of_admin: numberOfAdmin,
                percentage_of_person: total > 0 ? Number(((numberOfPerson * 100)/ total).toFixed(2)) : 0,
                percentage_of_organization: total > 0 ? Number(((numberOfOrganization * 100)/ total).toFixed(2)) : 0,
                percentage_of_admin: total > 0 ? Number(((numberOfAdmin * 100)/ total).toFixed(2)) : 0,
            };
        } catch (err) {
            throw new Error(`Failed to fetch users stats: ${err.message}`);
        }
    }

    async function getDomainStatsData() {
        try {
            const sql = `
                    SELECT 
                        d.design_domaine as domaine,
                        COUNT(DISTINCT combined.id_profil) as utilisateurs
                    FROM domaine d
                    LEFT JOIN (
                        SELECT id_profil, id_domaine FROM orienter_pers
                        UNION
                        SELECT id_profil, id_domaine FROM orienter_org
                        ) combined ON d.id_domaine = combined.id_domaine
                    GROUP BY d.id_domaine, d.design_domaine
                    ORDER BY utilisateurs DESC`

            const [rows] = await pool.query( sql )
            return rows

        }  catch (err) {
            throw Error()
        }
    }

    async function getPostsStatsData() {
        try {
            const sql = `
                SELECT 
                    'personne' as user, 
                    COUNT(*) as number 
                FROM publication p
                INNER JOIN personne ps ON p.id_profil_pers = ps.id_profil
                WHERE ps.id_role != 'admin' OR ps.id_role IS NULL
      
                UNION ALL
      
                SELECT 
                    'organisation' as user, 
                    COUNT(*) as number 
                FROM publication p
                INNER JOIN organisation o ON p.id_profil_org = o.id_profil
      
                UNION ALL
      
                SELECT 
                    'admin' as user, 
                    COUNT(*) as number 
                FROM publication p
                INNER JOIN personne ps ON p.id_profil_pers = ps.id_profil
                WHERE ps.id_role = 'admin'`

            const [res] = await pool.query( sql )
            return res

        } catch (err) {
            throw Error()
        }
    }

    return {
        UsersStatsData,
        getDomainStatsData,
        getPostsStatsData,
    }

}


async function GetNumberOfPerson() {
    const sql = `SELECT COUNT(*) as numberOfUser FROM personne;`;
    try {
        const [res] = await pool.query(sql);
        return res[0].numberOfUser;
    } catch (err) {
        throw new Error(`Failed to count persons: ${err.message}`);
    }
}

async function GetNumberOfOrganization() {
    const sql = `SELECT COUNT(*) as numberOfOrg FROM organisation;`;
    try {
        const [res] = await pool.query(sql);
        return res[0].numberOfOrg;
    } catch (err) {
        throw new Error(`Failed to count organizations: ${err.message}`);
    }
}

async function GetNumberOfAdmin() {
    const sql = `SELECT COUNT(*) as numberOfAdmin FROM personne WHERE id_role = "admin";`;
    try {
        const [res] = await pool.query(sql);
        return res[0].numberOfAdmin;
    } catch (err) {
        throw new Error(`Failed to count admins: ${err.message}`);
    }
}