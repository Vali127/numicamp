import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getLoginInfo } from '../models/loginModel.js';
import dotenv from 'dotenv';

dotenv.config();

export async function checkInfoLoginService(data) {
    try {
        const res = await getLoginInfo(data.username);
        const infodb = res.row;

        //si aucun resultat
        if (res.ok&&infodb.length === 0) {
            return {
                ok: false,
                message: 'Utilisateur introuvable'
            };
        }
        //si resultat obtenu => comparaison
         if(infodb.length !== 0) {
            const isMatch = await bcrypt.compare(data.password, infodb.mot_de_passe);

            if (!isMatch) {
                return {
                    ok: false, message: 'Mot de passe incorrect'
                };
            }

            const token = jwt.sign(
                {
                    id: infodb.id_profil,
                    role: infodb.id_role,
                    email: infodb.mail
                },
                process.env.JWT_SECRET
            );

            return {
                ok: true,
                message: 'Connexion réussie',
                token
            };
        }
         //si resultat non obtenue
        if(!res.ok){
            return {
                ok: false,
                message: res.message
            }
        }

    } catch (error) {
        return { ok: false, message: error.message };
    }
}
