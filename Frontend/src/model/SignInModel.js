import {useSignInContext} from "../context/SignInContext.jsx";
import { SignInFormApi } from "../api/SignInFormApi.js"

export const SignInModel = () => {


    const { SendFormForPersonalUsage } = SignInFormApi()
    const SignInData = useSignInContext()

    const SubmitForm = async () => {

        let object = null
        if ( SignInData.typeOfUsage === "personal" ) {
            object = {
                name: SignInData.personForm.name,
                firstname: SignInData.personForm.firstname,
                birth_date: SignInData.personForm.birth_date,
                sex: SignInData.personForm.sex,
                localisation: SignInData.personForm.place,
                profil_name: SignInData.accountForm.username,
                profil_description: SignInData.accountForm.bio,
                mail: SignInData.accountForm.mail,
                password: SignInData.accountForm.password
            }
        }
        else if ( SignInData.typeOfUsage === "organisation" ) {
            // object = { }
        }

        if (!object) {
            throw new Error('Objet de données null - vérifiez le typeOfUsage et les données des formulaires')
        }

        return await SendFormForPersonalUsage(object)
    }

    return {
        SubmitForm
    }
}