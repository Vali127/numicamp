import { useSignInContext } from "../context/register.context.jsx"
import { RegisterApi } from "../api/register.api.js"

export const RegisterModel = () => {
    const { SendFormForPersonalUsage, SendFormForOrganisationalUsage } = RegisterApi()
    const { typeOfUsage, personForm, organisationForm, accountForm, domain } = useSignInContext()

    const commonAccountFields = {
        profil_name: accountForm.username,
        profil_description: accountForm.bio,
        mail: accountForm.mail,
        password: accountForm.password,
        temp_photo: accountForm.tempPhotoFilename,
        domaines: domain
    }

    const SubmitForm = async () => {
        if (typeOfUsage === "personal") {
            return SendFormForPersonalUsage({
                name: personForm.name,
                firstname: personForm.firstname,
                birth_date: personForm.birth_date,
                sex: personForm.sex,
                localisation: personForm.place,
                ...commonAccountFields
            })
        }
        if (typeOfUsage === "organisational") {
            return SendFormForOrganisationalUsage({
                name: organisationForm.name,
                creation_date: organisationForm.creation_date,
                localisation: organisationForm.place,
                ...commonAccountFields
            })
        }
        throw new Error('Objet de données null - vérifiez le typeOfUsage et les données des formulaires')
    }

    return { SubmitForm }
}