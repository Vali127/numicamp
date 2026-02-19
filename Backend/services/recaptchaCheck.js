import axios from "axios"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

//le retries et une mesure de securité face au race condition du réseau.
async function verifyReCAPTCHA(token, retries = 3, retryDelay = 50) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_RECAPTCHA}&response=${token}`
            )
            if (response.data.success) return true
        } catch (err) {
            if (i === retries - 1) throw err
        }
        await delay(retryDelay * (i + 1))
    }
    return false
}

export async function reCAPTCHA(data) {
    if (!data.recaptchaToken) {
        return { ok: false, text: "Veuillez passer le test de reCAPTCHA" }
    }

    try {
        const success = await verifyReCAPTCHA(data.recaptchaToken, 10)
        return success
            ? { ok: true }
            : { ok: false, text: "Test de reCAPTCHA invalide, veuillez réessayer" }
    } catch (err) {
        throw new Error(`Erreur reCAPTCHA: ${err.message}`)
    }
}