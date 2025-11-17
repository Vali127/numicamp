import {LoginValidationVm} from "../../../viewmodel/login-vm/login.validation.vm.js";
import {ThreeDots} from "react-loader-spinner";
import {Modal} from "../../components/Modal.jsx";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json"
import rejectAnimation from "../../../assets/animations/system-solid-55-error-in-error.json"
import errorAnimation from "../../../assets/animations/system-solid-21-bug-hover-bug-2.json"
import {useLoginContext} from "../../../context/login.context.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const LogInValidationLoading = () => {

    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Veuillez <span>patientez !!</span> </h2>
            <p className={"text-[12px]"}>entrain de verifier votre informations !</p>

            <div className={" flex justify-around"}>
                <ThreeDots color="#1ACD2F" />
            </div>
        </div>
    )
}


const LogInValidationVerified = ({message}) => {
    const navigate = useNavigate()

    useEffect( () => { setTimeout( () => { navigate('/Main') }, 2500 ) } , [])

    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Connexion <span>acceptée !!</span> </h2>
            <p className={"text-[12px] mb-2"}>{message}</p>
            <div>
                <Lottie className={" h-20 md:h-30 mb-4"} animationData={successAnimation} loop={false} />
            </div>
        </div>
    )
}

const LogInValidationWrong = ({message}) => {
    const loginContext = useLoginContext()
    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Connexion <b className={"text-yellow-300"}>Rejetée !!</b> </h2>
            <p className={"text-[12px] mb-2"}>{message}</p>
            <div>
                <Lottie className={" h-20 md:h-30 mb-4"} animationData={rejectAnimation} loop={false} />
            </div>
            <button
                onClick={() => { loginContext.setShowLogInValidationModal(false) }}
                className={" bg-slate-800 text-white px-3 py-2 rounded-lg absolute right-2 bottom-2 "}>
                réessayer</button>
        </div>
    )
}

const LogInValidationError = () => {
    const loginContext = useLoginContext()
    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Une <b className={"text-red-500"}>Erreur</b> s' est produite</h2>
            <p className={"text-[12px] mb-2"}>Vous avez rencontrer une erreur , veuillez réessayer plus tard !</p>
            <div>
                <Lottie className={" h-20 md:h-30 mb-4"} animationData={errorAnimation} loop={false} />
            </div>
            <button
                onClick={() => { loginContext.setShowLogInValidationModal(false) }}
                className={" bg-red-500 text-white px-3 py-2 rounded-lg absolute right-2 bottom-2 "}>
                fermer</button>
        </div>
    )
}


export const LogInValidationModal = () => {
    const { message, result, formUploaded,} = LoginValidationVm()
    return (
        <Modal>
            { formUploaded  && <LogInValidationLoading /> }
            { (result === 'success') && <LogInValidationVerified message={message} /> }
            { (result === 'failed' ) && <LogInValidationWrong message={message} /> }
            { (result === 'error') && <LogInValidationError/> }
        </Modal>
    )
}