import axios from "axios"

export async function reCAPTCHA(data) {

    if (data.recaptchaToken === "" || !data.recaptchaToken || data.recaptchaToken === null ) {
        return {
            ok : false,
            text : "veuillez passer le teste de reCAPTCHA"
        }
    }

    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.SECRET_KEY_RECAPTCHA + "&response=" + data.recaptchaToken
        )

        if (!response.data.success) {
            return {
                ok : false,
                text : "teste de reCAPTCHA invalide, veuillez réesayer"
            }
        }
        return {
            ok : true,
            value : "valid"
        }
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}