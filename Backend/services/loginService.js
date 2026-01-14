import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getAccountUsage, getLoginInfo, isUserBlocked} from '../models/loginModel.js';
import dotenv from 'dotenv';
import {createLogger} from "../utils/logger.js";

dotenv.config();

export async function checkInfoLoginService(data) {
    try {

        const LOG = createLogger()

        const userIsBlocked = await isUserBlocked(data.username)
        if (userIsBlocked) {
            return {
                ok : false,
                message : "Vous avez été bloquer par l' administrateur !",
            }
        }

        const res = await getLoginInfo(data.username)
        const usage = await  getAccountUsage(data.username);

        if ( usage ===  "admin" ) { LOG.logIn(data.username) }

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
                usage: usage,
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
        throw new Error("Erreur dans le service :"+error.message) ;
    }
}