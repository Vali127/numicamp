import {Modal} from "../../components/modal.jsx";
import {ThreeDots} from "react-loader-spinner";
import {SchoolDeletionVM} from "../../../viewmodel/section-vm/admin.school.section.vm.js";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json";
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json";

export const SchoolDeletionModal = ({ element, setShowDeletionModal, Refresh }) => {
    const { status, message, DeleteSchool } = SchoolDeletionVM()

    return (
        <Modal>
            {status === "normal" && <DeletionConfirmation name={element.name} modalVisibility={setShowDeletionModal} action={DeleteSchool} id={element.id} />}
            {status === "loading" && <Loading />}
            {status === "success" && <DeletionSuccess message={message} modalVisibility={setShowDeletionModal} Refresh={Refresh} />}
            {status === "error" && <DeletionFail message={message} modalVisibility={setShowDeletionModal} />}
        </Modal>
    )
}

const DeletionConfirmation = ({modalVisibility, name, action, id}) => {
    return (
        <div>
            <div>
                <h2 className="font-bold">Vous voulez supprimer <b className="text-red-500">{name}</b> ?</h2>
                <p className="font-light">veuillez confirmer !</p>
            </div>
            <div className="flex justify-between gap-2 mt-2">
                <button
                    onClick={() => action(id)}
                    className="btn w-full">Confirmer</button>
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
        <div className="flex flex-col justify-around gap-2 items-center">
            <ThreeDots height={12}/>
            <div>Suppression en cours...</div>
        </div>
    )
}

const DeletionSuccess = ({message, modalVisibility, Refresh}) => {
    setTimeout(() => {
        Refresh();
        modalVisibility(false)
    }, 2000)

    return (
        <div className="flex gap-1 items-center justify-center">
            <Lottie animationData={successAnimation} className="h-12" loop={false} />
            <div>{message}</div>
        </div>
    )
}

const DeletionFail = ({message, modalVisibility}) => {
    setTimeout(() => { modalVisibility(false) }, 2000)
    return (
        <div className="flex gap-1 items-center justify-center">
            <Lottie animationData={errorAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}