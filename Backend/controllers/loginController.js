/**
 * param :  req.body contenant password et username
 * retour : res avec resultat du comparaison message et/ou token de checkInfoLoginService
 */

import {checkInfoLoginService} from "../services/loginService.js";

export async function checkInfoLoginController(req,res){
    const result = await checkInfoLoginService(req.body);
    if (result.ok) {
        res.status(200).json({message: result.message, token: result.token });
    } else {
        res.status(400).json({ message: result.message });
    }
}
