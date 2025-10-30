import axios from "axios";

export const AccountApi = () => {

    const accountInfoApi = async () => {
        const response = await axios.get("http://localhost:3000/api/account/accountInfo", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response.data
    }

    return {
        accountInfoApi
    }
}