import bcrypt from 'bcrypt';
import path from 'path';
import { createUserDirectory, moveProfilePicture, cleanupTempFile } from '../utils/fileManager.js';

async function processPhotoPath(tempPhoto, profilName) {

    if (!tempPhoto) return null;

    const photoPath = moveProfilePicture(tempPhoto, profilName);
    const parts = photoPath.split(path.sep);
    const userIndex = parts.indexOf('Users');
    return parts.slice(userIndex + 1).join(path.sep);

}

export async function registerUser(data, insertFunction) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
        createUserDirectory(data.profil_name);
        const photoPath = await processPhotoPath(data.temp_photo, data.profil_name);

        return await insertFunction({
            ...data,
            password: hashedPassword,
            photo_profil: photoPath
        });
    } catch (error) {
        if (data.temp_photo) { cleanupTempFile(data.temp_photo) } //cleaning up file server dir for error
        throw new Error(`Erreur services: ${error.message}`);
    }
}