import {Modal} from "../../components/modal.jsx"
import {ThreeDots} from "react-loader-spinner";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json";
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json";
import {useEffect} from "react";

export const FormModal = ({result, action, modalVisibility}) => {

    useEffect(() => { action() }, []);

    return (
        <Modal>
            { (result.status === "loading") && <Loading/> }
            { (result.status === "error") && <RegistrationFail message={result.message} modalVisibility={modalVisibility} /> }
            { (result.status === "success") && <RegistrationSuccess message={result.message} modalVisibility={modalVisibility} /> }
        </Modal>
    )
}

const Loading = () => {
    return (
        <div className="flex flex-col justify-around gap-2 items-center" >
            <ThreeDots height={12}/>
            <div>Inscription en cours !</div>
        </div>
    )
}

const RegistrationSuccess = ({message, modalVisibility}) => {
    setTimeout( () => { modalVisibility(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={successAnimation} className="h-12" loop={false} />
            <div>{message} </div>
        </div>
    )
}

const RegistrationFail = ({message, modalVisibility}) => {
    setTimeout( () => { modalVisibility(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={errorAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}