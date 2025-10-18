import {insertOrganisation, insertPerson} from "../models/registerModel.js";
import bcrypt from 'bcrypt';
import { createUserDirectory, moveProfilePicture, cleanupTempFile } from '../utils/fileManager.js';

export async function registerPersonService(data){
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    let photoPath = null;
    
    try {
        // Créer le dossier personnel de l'utilisateur
        createUserDirectory(data.profil_name);
        
        // Si une photo temporaire existe, la déplacer vers le dossier profile
        if (data.temp_photo) {
            photoPath = moveProfilePicture(data.temp_photo, data.profil_name);
        }
        
        // Insérer la personne avec le chemin de la photo
        const result = await insertPerson({ 
            ...data, 
            password: hashedPassword,
            photo_profil: photoPath
        });
        
        // Nettoyer le fichier temporaire s'il y en avait un
        if (data.temp_photo) {
            cleanupTempFile(data.temp_photo);
        }
        
        return result;
    } catch (error) {
        // En cas d'erreur, nettoyer le fichier temporaire s'il existe
        if (data.temp_photo) {
            cleanupTempFile(data.temp_photo);
        }
        return {
            ok: false,
            error: error.message
        };
    }
}

export async function registerOrganisationService(data){
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    let photoPath = null;
    
    try {
        // Créer le dossier personnel de l'organisation
        createUserDirectory(data.profil_name);
        
        // Si une photo temporaire existe, la déplacer vers le dossier profile
        if (data.temp_photo) {
            photoPath = moveProfilePicture(data.temp_photo, data.profil_name);
        }
        
        // Insérer l'organisation avec le chemin de la photo
        const result = await insertOrganisation({ 
            ...data, 
            password: hashedPassword,
            photo_profil: photoPath
        });
        
        // Nettoyer le fichier temporaire s'il y en avait un
        if (data.temp_photo) {
            cleanupTempFile(data.temp_photo);
        }
        
        return result;
    } catch (error) {
        // En cas d'erreur, nettoyer le fichier temporaire s'il existe
        if (data.temp_photo) {
            cleanupTempFile(data.temp_photo);
        }
        return {
            ok: false,
            error: error.message
        };
    }
}
