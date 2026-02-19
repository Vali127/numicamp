import bcrypt from 'bcrypt';
import {generateToken} from '../modules/loginModules.js';
import dotenv from 'dotenv';
import { getAccountUsage, getLoginInfo, isUserBlocked } from '../models/loginModel.js';
import { createLogger } from '../utils/logger.js';
import { reCAPTCHA } from './recaptchaCheck.js';

dotenv.config();

export async function checkInfoLoginService(data) {
    try {
        const LOG = createLogger();

        // CHECK IF BLOCKED
        if (await isUserBlocked(data.username)) {
            return { ok: false, message: "Vous avez été bloqué par l'administrateur !" };
        }

        // CHECK reCAPTCHA
        if (process.env.NODE_ENV === 'production') {
            const reCAPTCHAResponse = await reCAPTCHA(data);
            if (!reCAPTCHAResponse.ok) {
                return { ok: false, message: reCAPTCHAResponse.text };
            }
        }

        const userInfo = await getLoginInfo(data.username);
        if (!userInfo) {
            return { ok: false, message: 'Utilisateur introuvable' };
        }

        // CHECK PASSWORD
        const isPasswordValid = await bcrypt.compare(data.password, userInfo.mot_de_passe );
        if (!isPasswordValid) {
            return { ok: false, message: 'Mot de passe incorrect' };
        }

        // LOG ADMINS
        const usage = await getAccountUsage(data.username);
        if (usage === 'admin') { LOG.logIn(data.username); }

        return {
            ok: true,
            message: 'Connexion réussie',
            usage,
            token: generateToken(userInfo)
        };

    } catch (error) {
        throw new Error(`Erreur dans le service: ${error.message}`);
    }
}