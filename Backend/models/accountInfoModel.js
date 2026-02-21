import { pool } from '../config/db.js';

export async function getAccountInfo(user_id, usage) {
    try {
        const table = (usage === 'personal' || usage === 'admin') ? 'personne' : 'organisation';
        const [rows] = await pool.query(
            `SELECT * FROM ${table} WHERE id_profil = ?`,
            [user_id]
        );

        if (rows.length === 0) {
            throw new Error('Données introuvables');
        }

        return { ok: true, data: rows[0] };
    } catch (error) {
        throw new Error(`Erreur dans getAccountInfo Model: ${error.message}`);
    }
}

export async function getUserDomains(id_user, usage) {
    try {
        const relationTable = usage === 'personal' ? 'orienter_pers' : 'orienter_org';
        const sql = `
            SELECT design_domaine 
            FROM domaine 
            INNER JOIN ${relationTable} ON domaine.id_domaine = ${relationTable}.id_domaine 
            WHERE ${relationTable}.id_profil = ?
        `;

        const [rows] = await pool.query(sql, [id_user]);
        return { ok: true, data: rows };
    } catch (error) {
        throw new Error(`Erreur de récupération de domaine: ${error.message}`);
    }
}