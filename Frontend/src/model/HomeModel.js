import {AccountApi} from "../api/AccountApi.js";

export const HomeModel = () => {
    const getAccountInfo = async () => {
        return await AccountApi().accountInfoApi()
    }

    return {
        getAccountInfo,
    }
}