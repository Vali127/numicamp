const VALID_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
const MAX_IMAGE_SIZE = 10 * 1024 * 1024

export const ImageServices = () => ({
    isImageSizeValid: (size) => size < MAX_IMAGE_SIZE,
    isImageTypeValid: (type) => VALID_IMAGE_TYPES.includes(type),
})