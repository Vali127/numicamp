import {Modal} from "../../components/modal.jsx";
import {ThreeDots} from "react-loader-spinner";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json"
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json"
import Lottie from "lottie-react";
import {UserModalViewModel} from "../../../viewmodel/section-vm/user.modal.vm.js";

export const DeleteModal = ({user = "", userId = null, modalVisibility}) => {
    const { status, DeleteUser, response } = UserModalViewModel();
    return (
        <Modal>
            { status === "normal" && <Confirmation user={user} userId={userId} action={DeleteUser} modalVisibility={modalVisibility} /> }
            { status === "loading" && <Loading /> }
            { status === "success" && <Success message={response.message} modalVisibility={modalVisibility} /> }
            { status === "failed" && <Fail message={response.message} modalVisibility={modalVisibility} /> }
        </Modal>
    )
}

const Confirmation = ({user = "", userId = null, modalVisibility, action}) => {
    return (
        <div className="flex flex-col gap-3">
            <div>Confirmation du <b className="text-red-500" >suppression</b> de l' utilisateur <b className="text-indigo-500" >{user}</b></div>
            <button
                onClick={() => { action(userId) }}
                className="btn w-full" >Confirmer</button>
            <button
                onClick={() => { modalVisibility(false) }}
                className="py-2 rounded-md w-full bg-gray-200">
                Annuler
            </button>
        </div>
    )
}

const Loading = () => {
    return (
        <div className="flex flex-col justify-around gap-2 items-center" >
            <ThreeDots height={12}/>
            <div>Veuillez patienter !</div>
        </div>
    )
}

const Success = ({message, modalVisibility}) => {
    setTimeout( () => { modalVisibility(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={successAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}

const Fail = ({message, modalVisibility}) => {
    setTimeout( () => { modalVisibility(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={errorAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}