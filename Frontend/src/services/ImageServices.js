

export function ImageServices() {

    const isImageSizeValid = (size) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return size < maxSize
    }

    const isImageTypeValid = (type) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        return validTypes.includes(type)
    }

    return {
        isImageSizeValid,
        isImageTypeValid
    }

}