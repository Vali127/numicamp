import {useEffect, useState} from "react";
import {HomeModel} from "../../model/home.model.js";

export const OrgUiVm = () => {
    //MODEL
    const model = HomeModel()

    //STATE
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [postModalVisibility, setPostModalVisibility] = useState(false)


    //FUNCTION
    const HandleAccountInformation = async () => {
        try {
            const user_data = await  model.getAccountInfo()
            const user_domains = await model.getUserDomains()
            setUserInfo({...user_data, domains : user_domains.data })
        } catch (error) {
            console.log(error)
        }
    }


    //EFFECT
    useEffect(() => { setAuthenticated(isUserAuthenticated())}, [])
    useEffect( () => { HandleAccountInformation() }, [] )


    //RETURN
    return {
        authenticated,
        postModalVisibility,
        setPostModalVisibility,
        userInfo,
    }

}


const isUserAuthenticated = () => {
    return localStorage.getItem("token")
}