import { useState, useEffect, useRef} from "react";
import {RegisterModel} from "../../model/register.model.js";


export const RegisterValidationVm = () => {
    const { SubmitForm } = RegisterModel()

    const [ response, setResponse ] = useState('')
    const hasRun = useRef(false)

    const HandleModalBehavior = async() => {
        try {
            setResponse('loading')
            const response = await SubmitForm()
            
            if (response.ok) {
                setResponse('success')
            }
            else {
                setResponse('failure')
            }
        } catch (error) {
            setResponse('failure')
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
        response
    }

}