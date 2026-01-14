import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// CE MODULES NE CONTIENT QUE DES MANIPULATION DU DOSSIER/FICHIER DE L' UTILISATEUR

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERS_DIR = path.join(__dirname, '..', 'Users')
const TEMP_DIR = path.join(USERS_DIR, 'temp')

export function createUserDirectory(username) {
    const userDir = path.join(USERS_DIR, username)
    const profileDir = path.join(userDir, 'profile')
    
    try {
        if (!fs.existsSync(userDir))
            fs.mkdirSync(userDir, { recursive: true })
        
        // Créer le sousdossier profile
        if (!fs.existsSync(profileDir))
            fs.mkdirSync(profileDir, { recursive: true })
        
        return userDir
    } catch (error) {
        console.error('Erreur lors de la création du dossier utilisateur:', error)
        throw error
    }
}

export function moveProfilePicture(tempFilename, username) {
    const tempFilePath = path.join(TEMP_DIR, tempFilename)
    const userProfileDir = path.join(USERS_DIR, username, 'profile')
    const finalFilePath = path.join(userProfileDir, tempFilename)
    
    try {
        // Vérifier que le fichier temporaire existe
        if (!fs.existsSync(tempFilePath))
            throw new Error(`Fichier temporaire non trouvé: ${tempFilename}`)
        
        // Créer le dossier profile s'il n'existe pas
        if (!fs.existsSync(userProfileDir))
            fs.mkdirSync(userProfileDir, { recursive: true })
        
        // Déplacer le fichier (ceci supprime automatiquement le fichier temp)
        fs.renameSync(tempFilePath, finalFilePath)
        
        // Retourner le chemin relatif depuis le dossier Users
        return path.join('Users', username, 'profile', tempFilename)
    } catch (error) {
        console.error('Erreur lors du déplacement de la photo:', error)
        throw error // Propager l'erreur
    }
}

export function cleanupTempFile(tempFilename) {
    const tempFilePath = path.join(TEMP_DIR, tempFilename);
    
    try {
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
    } catch (error) {
        console.error('Erreur lors du nettoyage du fichier temporaire:', error)
    }
}

// Not mine (-_-)...
export function generateUniqueFilename(originalName, type) {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = path.extname(originalName)
    const header = type
    
    return `${header}_${timestamp}_${random}${extension}`
}

export function deleteFile(filepath, directoryName) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const directory = path.join(__dirname, '..', 'Users', directoryName)

    const parts = filepath.split('/')
    const filename = parts[parts.length - 1]
    const filePath = path.join(directory, filename)

    try {
        fs.unlinkSync(filePath);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
