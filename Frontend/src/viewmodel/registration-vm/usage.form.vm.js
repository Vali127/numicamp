import {useSignInContext} from "../../context/register.context.jsx"

export  const UsageFormVm = () => {

    const { setTypeOfUsage, typeOfUsage } = useSignInContext()
    const HandleTypeOfUsage = (e) => { setTypeOfUsage(e.target.value) }

    return {
        typeOfUsage,
        HandleTypeOfUsage
    }
}