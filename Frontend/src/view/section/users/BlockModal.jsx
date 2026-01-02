import {Modal} from "../../components/modal.jsx";
import {ThreeDots} from "react-loader-spinner";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json"
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json"
import Lottie from "lottie-react";
import {userModalViewModel} from "../../../viewmodel/section-vm/user.modal.vm.js";

export const BlockModal = ({user = "", userId = null, isBlocked, modalVisibility}) => {
    //ViewModel
    const { status, response, BlockUser, UnblockUser } = userModalViewModel()

    return (
        <Modal>
            { status === "normal" && !isBlocked && <BlockageConfirmation user={user} userId={userId} action={BlockUser} modalVisibility={modalVisibility} /> }
            { status === "normal" && isBlocked && <DeBlockageConfirmation user={user} userId={userId} action={UnblockUser} /> }
            { status === "loading" && <Loading/> }
            { status === "failed" && <Fail message={response.message} modalVisibility={modalVisibility}/>}
            { status === "success" && <Success message={response.message} modalVisibility={modalVisibility}/>}
        </Modal>
    )
}

const BlockageConfirmation = ({user = "", userId = null, action, modalVisibility}) => {
    return (
        <div className="flex flex-col gap-3">
            <div>Confirmation de <b className="text-yellow-500" >blocage</b> de l' utilisateur <b className="text-indigo-500" >{user}</b></div>
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

const DeBlockageConfirmation = ({user = "", userId = null, action}) => {
    return (
        <div className="flex flex-col gap-3">
            <div>Confirmation de <b className="text-yellow-500" >déblocage</b> de l' utilisateur <b className="text-indigo-500" >{user}</b></div>
            <button
                onClick={() => { action(userId) }}
                className="btn w-full" >Confirmer</button>
        </div>
    )
}

const Loading = ( ) => {
    return (
        <div className="flex flex-col justify-around gap-2 items-center" >
            <ThreeDots height={12}/>
            <div>Veuillez patienter</div>
        </div>
    )
}

const Success = ({message, modalVisibility}) => {
    setTimeout(() => { modalVisibility(false) }, 2000)
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={successAnimation} className="h-12" loop={false} />
            <div>{message}</div>
        </div>
    )
}

const Fail = ({message, modalVisibility}) => {
    setTimeout(() => { modalVisibility(false) }, 2000)
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={errorAnimation} className="h-12" loop={false} />
            <div>{message}</div>
        </div>
    )
}