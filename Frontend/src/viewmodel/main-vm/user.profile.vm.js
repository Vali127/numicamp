import {useEffect} from "react";


export const userProfileViewModel = (owner, id) => {

    const fetchData = () => {
        const data = {
            owner : owner,
            user_id : id
        }

        console.log("Data to send", data)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(
        () => { fetchData() }, []
    )

    return {

    }
}