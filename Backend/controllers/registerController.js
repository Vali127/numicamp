// POUR registerPersonn et registerOrganisation
//body devrait contenir ses propriete name, firstname, birth_date, sex, localisation, profil_name, profil_description, mail,password

import { registerService } from '../services/registerService.js';

export async function registerPersonController(req, res) {
    try {
        const result = await registerService(req.body);

        if(result.ok){
            res.status(201).json({ message: 'Inscription réussie' });
        }
        else{
            res.status(500).json({message: result.error});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export async function registerOrganisationController(req, res) {

}