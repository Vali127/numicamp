import { pool } from "../config/db.js";
import {
    findUserProfile,
    insertKeywords,
    insertPublicationDomains,
    executePublicationInsertion
} from "../modules/publicationModelModules.js";


export async function createPublication({ title, description, photoPath = null, keywords, domains, userId }) {    
    try {
        const profile = await findUserProfile(userId);
        const publicationData = { title, description, photoPath, profileId: profile.id, isOrganization: profile.isOrganization };
        const publicationId = await executePublicationInsertion(publicationData);
        
        await insertKeywords(keywords, publicationId);
        await insertPublicationDomains(domains, publicationId);

        return { ok: true, message : "publication created successfully." };
    } catch (error) {
        throw new Error("Error creating publication: " + error.message);
    }
}


export async function getUserPublications(userProfileId) {

    const sql = 'SELECT * FROM publication WHERE id_profil_pers = ?';
    try {
        const [rows] = await pool.query(sql, [userProfileId]);
        return {
            ok: true,
            message: "User publications retrieved successfully",
            rows
        };
    } catch (error) {
        throw new Error("Error retrieving user publications: " + error.message);
    }
}


export async function getOrganizationPublications(organizationProfileId) {
    const sql = 'SELECT * FROM publication WHERE id_profil_org = ?';
    
    try {
        const [rows] = await pool.query(sql, [organizationProfileId]);
        return {
            ok: true,
            message: "Organization publications retrieved successfully",
            rows
        };
    } catch (error) {
        throw new Error("Error retrieving organization publications: " + error.message);
    }
}

export async function getSubscribedOrganizationsPublications(userProfileId) {
    const sql = `
        SELECT p.*
        FROM publication p
        WHERE p.id_profil_org IN (
            SELECT a.id_profil_org
            FROM abonner a
            WHERE a.id_profil_pers = ?
        )
        ORDER BY p.date_pub DESC;
    `;

    try {
        const [rows] = await pool.query(sql, [userProfileId]);
        return {
            ok: true,
            message: "Subscribed organizations publications retrieved successfully",
            rows
        };
    } catch (error) {
        throw new Error("Error retrieving subscribed organizations publications: " + error.message);
    }
}


export async function deletePublication(publicationId) {
    try {
        const sql = `DELETE FROM publication WHERE id_pub = ?`;
        const [result] = await pool.query(sql, [publicationId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Error deleting publication: " + error.message);
    }
}

export async function getOrganizationApplicants(organizationId) {
    const sql = `
        SELECT DISTINCT p.*
        FROM publication p
        INNER JOIN comprendre c ON p.id_pub = c.id_pub
        INNER JOIN abonner a ON p.id_profil_pers = a.id_profil_pers
        WHERE a.id_profil_org = ?
        AND c.id_mot_cle = 'MCL-c1656b82bf96'
        ORDER BY p.date_pub DESC;
    `;

    try {
        const [rows] = await pool.query(sql, [organizationId]);
        return {
            ok: true,
            message: "Organization applicants retrieved successfully",
            rows
        };
    } catch (error) {
        throw new Error("Error retrieving organization applicants: " + error.message);
    }
}
