import {insertOrganisation, insertPerson} from "../models/registerModel.js";
import bcrypt from 'bcrypt';
import { createUserDirectory, moveProfilePicture, cleanupTempFile } from '../utils/fileManager.js';
import path from 'path'

export async function registerPersonService(data){
    console.log("debut service")

    const hashedPassword = await bcrypt.hash(data.password, 10);
    let real_path = null;
    let photoPath = null;

    try {
        // Créer le dossier personnel de l'utilisateur
        createUserDirectory(data.profil_name);

        // déplacer le fichier temporaire vers le dossier profile
        if (data.temp_photo) {
            photoPath = moveProfilePicture(data.temp_photo, data.profil_name)
            const parts = photoPath.split(path.sep)
            const head = parts.indexOf('Users')
            real_path = parts.slice( head + 1 ).join(path.sep)
        }

        // Insérer la personne avec le chemin de la photo
        const result = await insertPerson({
            ...data,
            password: hashedPassword,
            photo_profil: real_path
        })

        // Note: Le fichier temporaire a déjà été supprimé par moveProfilePicture()
        return result;
    } catch (error) {
        //suppression du fichier temporaire s'il existe
        if (data.temp_photo)
            cleanupTempFile(data.temp_photo);
        throw new Error("Erreur services "+error.message);
    }
}

// Da same pattern as the one above
export async function registerOrganisationService(data){
    const hashedPassword = await bcrypt.hash(data.password, 10)
    let photoPath = null
    let real_path = null

    try {
        createUserDirectory(data.profil_name)

        if (data.temp_photo) {
            photoPath = moveProfilePicture(data.temp_photo, data.profil_name)
            const parts = photoPath.split(path.sep)
            const head = parts.indexOf('Users')
            real_path = parts.slice(head + 1 ).join(path.sep)
        }

        const result = await insertOrganisation({
            ...data,
            password: hashedPassword,
            photo_profil: real_path
        })

        // Note: Le fichier temporaire a déjà été supprimé par moveProfilePicture()
        return result;
    } catch (error) {

        if (data.temp_photo)
            cleanupTempFile(data.temp_photo);
        throw new Error("Erreur services "+error.message);
    }
}