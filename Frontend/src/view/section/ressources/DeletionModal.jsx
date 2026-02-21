import {Modal} from "../../components/modal.jsx";
import {ResourceDeletionModalVM} from "../../../viewmodel/section-vm/admin.resource.vm.js";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json";
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json";
import {ThreeDots} from "react-loader-spinner";

export const DeletionModal = ({id, type, modalVisibility}) => {
    const { message, status, DeleteResource } = ResourceDeletionModalVM()


    return (
        <Modal>
            { status === "idle" && <Confirmation modalVisibility={modalVisibility} id={id} type={type} action={DeleteResource}/>}
            { status === "loading" && <Loading /> }
            { status === "success" && <DeletionSuccess message={message} modalVisibility={modalVisibility} /> }
            { status === "error" && <DeletionFail message={message} modalVisibility={modalVisibility} /> }
        </Modal>
    )
}


const Confirmation = ({modalVisibility, action, id, type}) => {
    return (
        <div>
            <div>
                <h2 className="font-bold">Vous voulez supprimez cette ressource ?</h2>
                <p className="font-light" >veuillez confirmer !</p>
            </div>
            <div className="flex justify-between gap-2 mt-2">
                <button
                    onClick={ () => action(id, type) }
                    className="btn w-full" >Confirmer</button>
                <button
                    onClick={() => { modalVisibility(false) }}
                    className="py-2 rounded-md w-full bg-gray-200">
                    Annuler
                </button>
            </div>
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

const DeletionSuccess = ({message, modalVisibility}) => {

    setTimeout( () => { modalVisibility(false) }, 2000 )

    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={successAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}

const DeletionFail = ({message, modalVisibility}) => {
    setTimeout( () => { modalVisibility(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={errorAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}