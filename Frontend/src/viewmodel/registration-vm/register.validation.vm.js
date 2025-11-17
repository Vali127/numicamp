import { useState, useEffect, useRef} from "react";
import {RegisterModel} from "../../model/register.model.js";


export const RegisterValidationVm = () => {
    const { SubmitForm } = RegisterModel()

    const [ FormUploaded, setFormUploaded ] = useState(true)
    const [ response, setResponse ] = useState('')
    const hasRun = useRef(false) // Protection contre les appels multiples

    const HandleModalBehavior = async() => {
        try {
            const response = await SubmitForm()
            
            if (response.status === 200 ) {
                setFormUploaded(false)
                setResponse('success')
            }
            else {
                setResponse('failure')
            }
        } catch (error) {
            setResponse('failure')
            setFormUploaded(false)
            console.log(error)
        }
    }
    
    useEffect(() => {
        // Protection contre la double exécution en StrictMode(eviter d envoyer la requete deux fois)
        if (hasRun.current) {
            return
        }
        
        hasRun.current = true
        HandleModalBehavior()
    }, [])

    return {
        FormUploaded,
        response
    }

}