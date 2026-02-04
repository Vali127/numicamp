// POUR registerPersonn et registerOrganisation
//body devrait contenir ses propriete name, firstname, birth_date, sex, localisation, profil_name, profil_description, mail,password

import { registerPersonService,registerOrganisationService } from '../services/registerService.js';

export async function registerPersonController(req, res) {
    try {
        const result = await registerPersonService(req.body);
        res.status(200).json({ ok : result.ok, message: 'Inscription réussie' });
    } catch (error) {
        res.status(error.status||500).json({ message: error.message });
    }
}

export async function registerOrganisationController(req, res) {
    try {
        const result = await registerOrganisationService(req.body);
        res.status(200).json({ ok : result.ok ,message: 'Inscription réussie'});
    } catch (error) {
        res.status(error.status||500).json({ message: error.message });
    }
}
