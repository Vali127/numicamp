/**
 * param :  req.body contenant password et username
 * retour : res avec resultat du comparaison message et/ou token de checkInfoLoginService
 */

import {checkInfoLoginService} from "../services/loginService.js";

export async function checkInfoLoginController(req,res){
    try {
        const result = await checkInfoLoginService(req.body);
        if (result.ok) {
            res.status(200).json({message: result.message, ok : result.ok, token: result.token, usage: result.usage });
        } else {
            res.status(200).json({ message: result.message,  ok : result.ok, });
        }
    } catch (error) {
        res.status(error.status||500).json({ message: error.message });
    }
}
