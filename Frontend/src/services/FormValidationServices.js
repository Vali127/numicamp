import { useSignInContext } from "../context/SignInContext.jsx";

//_____________________USAGEFORM__________________________________________________________

export const usageFormValidation = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { typeOfUsage } = useSignInContext()

    const  isAllUsageFormFulFilled = () => {
        return ( typeOfUsage !== '')
    }

    return {
        isAllUsageFormFulFilled
    }

}




//_____________________PERSONFORM__________________________________________________________

export const personFormValidation = ( ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { personForm } = useSignInContext()

    const isAllPersonFormFulFilled = () => { return !Object.values(personForm).includes("") }

    const name = {
        checkExpression : (text) => {
            let regex = /^[a-zA-Z\s]+$/
            if ( text === '' )
                return { type: "warning", message : "* champs obligatoire !" }
            if ( text.match(regex) )
                return { type: null, message : null }
            return { type: "alert", message : "Nom invalide !( pas de caractère spéciaux )" }
        },
        checkLength : () => {
            if ( personForm.name.length >= 60  )
                return { type : "alert", message : "Votre nom est trop long !" }
            return { type: null, message : null }
        },
    }

    const firstname = {
        checkExpression : (text) => {
            let regex = /^[a-zA-Z\s]+$/
            if ( text === '' )
                return { type: "warning", message : "* champs obligatoire !" }
            if ( text.match(regex) )
                return { type: null, message : null }
            return { type: "alert", message : "Prénom invalide !( pas de caractère spéciaux )" }
        },
        checkLength : () => {
            if ( personForm.firstname.length >= 60  )
                return { type : "alert", message : "Votre prénom est trop long !" }
            return { type: null, message : null }
        },
    }

    const birthDate = {
        checkValidity : (text) => {
            const current_date = new Date()
            const date = new Date(text)
            const age = current_date.getFullYear() - date.getFullYear()
            if ( age < 16 )
                return { type : "alert", message : "Vous devez avoir aumoins 16 ans !" }
            return { type: null, message : null }
        }
    }

    return {
        isAllPersonFormFulFilled,
        name,
        firstname,
        birthDate,

    }
}




//__________________ORGANISATIONFORM_______________________________________________________

export const organisationFormValidation = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { organisationForm } = useSignInContext()

    const  isAllOrganisationFormFulFilled = () => { return !Object.values(organisationForm).includes("") }

    const name = {
        checkExpression : (text) => {
            let regex = /^[a-zA-Z0-9\s]+$/
            if ( text === '' )
                return { type: "warning", message : "* champs obligatoire !" }
            if ( text.match(regex) )
                return { type: null, message : null }
            return { type: "alert", message : "Nom invalide !" }
        },
        checkLength : () => {
            if ( organisationForm.name.length >= 60  )
                return { type : "alert", message : "Votre nom est trop long !" }
            return { type: null, message : null }
        }
    }

    return {
        isAllOrganisationFormFulFilled,
        name
    }
}



//_____________________ACCOUNTFORM__________________________________________________________
export const accountFormValidation = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {accountForm } = useSignInContext()

    const isAllAccountFormFulFilled = () => {
        const foo = { username : accountForm.username, mail : accountForm.mail }
        return !Object.values(foo).includes("")
    }

    const username = {
        checkExpression : (text) => {
            let regex = /^[a-zA-Z0-9\s]+$/
            if ( text === '' )
                return { type: "warning", message : "* champs obligatoire !" }
            if ( text.match(regex) )
                return { type: null, message : null }
            return { type: "alert", message : "Nom invalide !( pas de caractère spéciaux )" }
        },
        checkLength : () => {
            if ( accountForm.username.length >= 60  )
                return { type : "alert", message : "Votre nom est trop long !" }
            return { type: null, message : null }
        }
    }

    const mail = {
        checkExpression : (text) => {
            let regex = /^(?=.{1,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if ( text === '' )
                return { type: "warning", message : "* champs obligatoire !" }
            if ( text.match(regex) )
                return { type: null, message : null }
            return { type: "alert", message : "mail invalide !" }
        }
    }

    const password = {
        checkExpression : (text) => {
            if ( text === '' )
                return { type: "warning", message : "* champs obligatoire !" }
            if ( ! /\d/.test(text) )
                return { type: "warning", message : "veuillez inclure des chiffres" }
            if ( ! /[a-zA-Z]/.test(text) )
                return { type: "warning", message : "veuillez inclure des lettres" }
            return { type: null , message : null }
        },
        checkLength : (text) => {
            if ( text.length <= 5  )
                return { type: "warning", message : "choisissez un code à 6 chiffres au moins" }
            return { type: null, message : null }
        }
    }

    return {
        isAllAccountFormFulFilled,
        username,
        mail,
        password,
    }
}
