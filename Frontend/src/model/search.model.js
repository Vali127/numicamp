import {searchApi} from "../api/search.api.js"

export const searchModel = () => {
    
    const api = searchApi()
    
    const search = async (obj) => {
        const data = api.searchValueApi(obj)
        return data
    }

    return {
        search
    }

}