import {Modal} from "../../components/modal.jsx";
import { ThreeDots } from "react-loader-spinner";
import {RegisterValidationVm} from "../../../viewmodel/registration-vm/register.validation.vm.js";
import {useNavigate} from "react-router-dom";



const SignInValidationLoading = () => {

    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Veuillez <span className="span">patientez !!</span> </h2>
            <p className={"text-[12px]"}>entrain de soumettre votre incription !</p>

            <div className={" flex justify-around"}>
                <ThreeDots color="#1ACD2F" />
            </div>
        </div>
    )
}



const SignInValidationAccepted = () => {

    const navigate = useNavigate()

    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Inscription <span className="span">acceptée !!</span> </h2>
            <p className={"text-[12px] mb-10"}>votre inscription est tériminé avec succèes !!</p>

            <button
                className={" bg-green-500 text-white px-3 py-2 rounded-lg absolute right-2 bottom-2 "}
                onClick={() => { navigate('/') }}
            >se connecter</button>
        </div>
    )
}


const SignInValidationRejected = () => {
    const navigate = useNavigate()
    return (
        <div className={"text-center"}>
            <h2 className={"font-bold text-[20px] md:text-2xl"}>Inscription <b className={"text-red-500"}>rejetée !!</b> </h2>
            <p className={"text-[12px] mb-5"}>votre inscription a echoué !! <br/> Veuillez reesayer !! </p>

            <button
                className={" bg-red-500 text-white px-2 py-2 rounded-lg absolute right-2 bottom-2 "}
                onClick={() => { navigate('/') }}
            >quitter</button>
        </div>
    )
}


export const SignInValidationModal = () => {

    const { FormUploaded, response } = RegisterValidationVm()

        return (
            <Modal>
                { (FormUploaded) && < SignInValidationLoading/>  }
                { ( response === "success" ) && <SignInValidationAccepted/> }
                { ( response === "failure" ) && <SignInValidationRejected/> }
            </Modal>
        )
}