import {getAccountInfo, getUserDomains} from "../models/accountInfoModel.js";


export async function accountInfoService(data) {

    const id_profil = data.user.id || data.user.id_profil
    const usage = data.query.usage

    try {
        return await getAccountInfo(id_profil, usage)
    }
    catch (error) {
        console.log(error)
        throw Error(error);
    }
    
}

export async function userDomainsService(data) {

    const id_user = data.user.id || data.user.id_profil
    const usage = data.query.usage
    try {
        return await getUserDomains(id_user, usage)
    }
    catch (error) {
        console.log(error)
        throw Error(error);
    }   
}

export async function organisationInfoService(data) {
    const id_org = data.query.id_org
    try {
        return await getAccountInfo(id_org, "organisational")
    }
    catch (error) {
        console.log(error)
        throw Error(error);
    }
}

export async function personInfoService(data) {
    const id_person = data.query.id_person
    try {
        return await getAccountInfo(id_person, "personal")
    }
    catch (error) {
        console.log(error)
        throw Error(error);
    }
}

