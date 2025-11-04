import {getAccountInfo, getUserDomains} from "../models/accountInfoModel.js";


export async function accountInfoService(data) {

    const id_profil = data.user.id || data.user.id_profil
    try {
        const res = await getAccountInfo(id_profil)
        return res
    }
    catch (error) {
        console.log(error)
        throw error;
    }
    
}

export async function userDomainsService(data) {

    const id_user = data.user.id || data.user.id_profil
    try {
        const res = await getUserDomains(id_user)
        return res
    }
    catch (error) {
        console.log(error)
        throw error;
    }   
}
