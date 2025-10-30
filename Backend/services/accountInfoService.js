import {getAccountInfo} from "../models/accountInfoModel.js";


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
