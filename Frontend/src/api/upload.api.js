import { API_CONFIG } from '../config.js'

export const uploadTempProfilePicture = async (file) => {
    try {
        const formData = new FormData() //Natif a JS
        formData.append('profilePicture', file)

        const response = await fetch(`http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/upload/temp-profile-picture`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de l\'upload');
        }
        return data
    } catch (error) {
        console.error('Erreur upload photo:', error)
        throw error;
    }
};
