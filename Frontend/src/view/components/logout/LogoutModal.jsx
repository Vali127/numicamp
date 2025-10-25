import {Modal} from "../interface/Modal.jsx";
import {HomeViewModel} from "../../../viewmodel/main/HomeViewModel.js";
import {useNavigate} from "react-router-dom";

export const LogoutModal = ({SetLogout}) => {
    const navigate = useNavigate();
    const HandleLogout = () => {
        navigate("/");
        localStorage.clear('token')
    }

    return (
        <Modal>
            <h2 className={"font-bold text-[20px] md:text-2xl"}><span>Deconnexion</span> </h2>
            <p className={"text-[12px]"}>Vous voulez vraiment vous deconnecter ?</p>
            <div className={"pt-4 flex flex-col gap-2"}>
                <button className={"bg-green-400 text-white w-full rounded py-1"} onClick={HandleLogout} >oui</button>
                <button className={" border border-green-400 text-green-400 w-full rounded py-1"} onClick={() => { SetLogout(false) }} >Non</button>
            </div>
        </Modal>
    )
}