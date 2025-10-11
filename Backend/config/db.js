import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    charset: 'utf8mb4'
});

export async function testConnection() {
    let conn;
    try{
        conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT 1 AS ok');
        return {
            ok:true,
            rows
        };
    }
    catch (error) {
        return {
            ok: false,
            error: error.message || error
        };
    }
    finally {
        if (conn) {
            conn.release();
        }
    }
}

//--------------TEST-----------------
// export async function getRole() {
//     let conn;
//     try{
//         conn = await pool.getConnection();
//         const [rows] = await conn.query('SELECT * FROM role');
//         return {
//             ok:true,
//             rows
//         }
//     }
//     catch (error) {
//         return {
//             ok: false,
//             error: error.message || error
//         }
//     }
// }
// //------------------------------------
export  { pool };

