import {AccountApi} from "../api/AccountApi.js";

export const HomeModel = () => {
    const getAccountInfo = async () => {
        return await AccountApi().accountInfoApi()
    }
    const getUserDomains = async () => {
        return await AccountApi().userDomainApi()
    }

    return {
        getAccountInfo,
        getUserDomains
    }
}