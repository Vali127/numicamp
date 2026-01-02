import {UserModel} from "../../model/usersModel.js";
import {useEffect, useState} from "react";


export const UsersViewModel = () => {
    //MODEL
    const MODEL = UserModel();

    //STATES
    const [listStatus, setListStatus] = useState('');
    const [userList, setUserList] = useState([]);
    const [showBlockageModal, setShowBlockageModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);

    //FUNCTIONS
    const FetchUserList = async () => {
        try {
            setListStatus('loading');
            const result = await MODEL.getUsers()
            console.log("Result : ", result)
            if (result.ok) {
                setUserList(result.rows)
                setListStatus('success');
            } else {
                setListStatus('unauthorized');
            }
        } catch (error) {
            console.log(error)
        }
    }

    //EFFECT
    useEffect(() => { FetchUserList() }, []);

    return {
        FetchUserList,
        listStatus,
        userList,
        showBlockageModal,
        showDeletionModal,
        setShowDeletionModal,
        setShowBlockageModal
    }
}