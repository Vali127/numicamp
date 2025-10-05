import {useEffect} from "react"
import {useSignInContext} from "../context/SignInViewModel"
import {useNavigate} from "react-router-dom"


export  const UsageViewModel = () => {
    const  navigate = useNavigate()
    useEffect(() => {
        const nextButton = document.getElementById("nextFormular")
        if (nextButton) {
            nextButton.style.display = 'block'
        }
    }, [])

    const GetTypeOfUsage = () => {
        const checkedBox = document.querySelector('input[name="typeOfUsage"]:checked')
        return checkedBox ? checkedBox.value : null
    }

    const { SetTypeOfUsage } = useSignInContext()
    const HandleTypeOfUsage = (usage) => { SetTypeOfUsage(usage) }

    useEffect(() => {
        const buttonNext = document.getElementById("nextFormular")
        if (buttonNext) {
            const handleClick = () => {
                const usage = GetTypeOfUsage()
                if (usage == null) {
                    alert('Please select the type of usage')
                    return
                }
                HandleTypeOfUsage(usage)

                if ( usage === 'personal' )
                    navigate("/personalForm")
                else
                navigate("/OrganisationalForm")
            }
            
            buttonNext.addEventListener('click', handleClick)
            
            // Cleanup function to remove event listener
            return () => {
                buttonNext.removeEventListener('click', handleClick)
            }
        }
    }, [])
}