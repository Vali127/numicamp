import {useSignInContext} from "../context/register.context.jsx";
import {RegisterApi} from "../api/register.api.js"

export const RegisterModel = () => {


    const { SendFormForPersonalUsage, SendFormForOrganisationalUsage } = RegisterApi()
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
                password: SignInData.accountForm.password,
                temp_photo: SignInData.accountForm.tempPhotoFilename,
                domaines : SignInData.domain
            }
            return await SendFormForPersonalUsage(object)
        }
        else if ( SignInData.typeOfUsage === "organisational" ) {
             object = {
                 name : SignInData.organisationForm.name ,
                 creation_date : SignInData.organisationForm.creation_date,
                 localisation : SignInData.organisationForm.place,
                 profil_name : SignInData.accountForm.username,
                 profil_description : SignInData.accountForm.bio,
                 mail : SignInData.accountForm.mail,
                 password : SignInData.accountForm.password,
                 temp_photo: SignInData.accountForm.tempPhotoFilename,
                 domaines : SignInData.domain
             }
            return await SendFormForOrganisationalUsage(object)
        }
        if (!object) {
            throw new Error('Objet de données null - vérifiez le typeOfUsage et les données des formulaires')
        }
    }

    return {
        SubmitForm
    }
}