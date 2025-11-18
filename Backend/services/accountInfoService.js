import {getAccountInfo, getUserDomains} from "../models/accountInfoModel.js";


export async function accountInfoService(data) {

    const id_profil = data.user.id || data.user.id_profil
    const usage = data.query.usage
    try {
        const res = await getAccountInfo(id_profil, usage);
        return res
    }
    catch (error) {
        console.log(error)
        throw error;
    }
    
}

export async function userDomainsService(data) {

    const id_user = data.user.id || data.user.id_profil
    const usage = data.query.usage
    try {
        const res = await getUserDomains(id_user, usage)
        return res
    }
    catch (error) {
        console.log(error)
        throw error;
    }   
}

export async function organisationInfoService(data) {
    const id_org = data.query.id_org
    try {
        const res = await getAccountInfo( id_org, "organisational" )
        return res
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

export async function personInfoService(data) {
    const id_person = data.query.id_person
    try {
        const res = await getAccountInfo( id_person, "personal" )
        return res
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

