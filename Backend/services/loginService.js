import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getLoginInfo } from '../models/loginModel.js';
import dotenv from 'dotenv';

dotenv.config();

export async function checkInfoLoginService(data) {
    try {
        const res = await getLoginInfo(data.username)

        //si resultat obtenu => comparaison
         if(res) {
            const isMatch = await bcrypt.compare(data.password, res.mot_de_passe);
            if (!isMatch) {
                return {
                    ok: false, message: 'Mot de passe incorrect'
                };
            }

            const token = jwt.sign(
                {
                    id: res.id_profil,
                    role: res.id_role,
                    email: res.mail
                },
                process.env.JWT_SECRET
            );

            return {
                ok: true,
                message: 'Connexion réussie',
                token
            };
        }
         else {
             return {
                 ok: false,
                 message: 'Utilisateur introuvable'
             }
         }

    } catch (error) {
        return { ok: false, message: error.message };
    }
}
