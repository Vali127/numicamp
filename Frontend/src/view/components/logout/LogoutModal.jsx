import {Modal} from "../interface/Modal.jsx";
import {HomeViewModel} from "../../../viewmodel/main/HomeViewModel.js";
import {useNavigate} from "react-router-dom";

export const LogoutModal = ({SetLogout, Type}) => {
    const navigate = useNavigate();
    const HandleLogout = () => {
        navigate("/");
        localStorage.clear('token')
    }

    return (
        <Modal Type={"red"} >
            <h2 className={"font-bold text-[20px] md:text-2xl text-red-700"}>Deconnexion</h2>
            <p className={"text-[12px]"}>Vous voulez vraiment vous deconnecter ?</p>
            <div className={"pt-4 flex flex-col gap-2"}>
                <button className={"bg-red-700 text-white w-full rounded py-1"} onClick={HandleLogout} >oui</button>
                <button className={" border border-red-700 text-red-700 w-full rounded py-1"} onClick={() => { SetLogout(false) }} >Non</button>
            </div>
        </Modal>
    )
}