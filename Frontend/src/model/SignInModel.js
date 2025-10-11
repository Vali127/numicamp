import {useSignInContext} from "../context/SignInContext.jsx";
import {SignInFormApi} from "../api/SignInFormApi.js";


const SignInModel = () => {
    const { typeOfUsage , personForm, organisationForm, accountForm } = useSignInContext();
    const { SendFormForPersonalUsage, SendFormForOrganisationalUsage } = SignInFormApi()

    const submitSignInForm = async () => {
        let response;
        
        if ( typeOfUsage === "personal" ) {
            try {
                response = await SendFormForPersonalUsage({ type_of_usage : typeOfUsage,  person_form : personForm,  account_form : accountForm });
            } catch (error) {
                response = error.response || error;
            }
            return response;
        }
        else if ( typeOfUsage === "organisation" ) {
            try {
                response = await SendFormForOrganisationalUsage({ type_of_usage : typeOfUsage, organisation_form : organisationForm, account_form : accountForm });
            } catch (error) {
                response = error.response || error;
            }
            return response;
        }
        
        // Cas par défaut si typeOfUsage n'est ni "personal" ni "organisation"
        return { error: "Type d'usage non valide" };
    }

    return { submitSignInForm }
}