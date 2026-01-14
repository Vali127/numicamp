import {Modal} from "../../components/modal.jsx"
import {ThreeDots} from "react-loader-spinner";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json";
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json";
import {useEffect} from "react";

export const SchoolFormModal = ({status, sendData, setShowModal, message, setRefresh, refresh}) => {
    useEffect(() => { sendData() }, [])
    const RefreshList = () => setRefresh(!refresh)
    return (
        <Modal>
            { status === "loading" && <Loading/>}
            { status === "error" && <SchoolRegistrationFail setShowModal={setShowModal} message={message} /> }
            { status === "success" && <SchoolRegistrationSuccess setShowModal={setShowModal} message={message} refresh={RefreshList} /> }
        </Modal>
    )
}

const Loading = () => {
    return (
        <div className="flex flex-col justify-around gap-2 items-center" >
            <ThreeDots height={12}/>
            <div>Inscription d'école en cours !</div>
        </div>
    )
}

const SchoolRegistrationSuccess = ({message, setShowModal, refresh}) => {
    setTimeout( () => { refresh() ;setShowModal(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={successAnimation} className="h-12" loop={false} />
            <div>{message} </div>
        </div>
    )
}

const SchoolRegistrationFail = ({message, setShowModal}) => {
    setTimeout( () => { setShowModal(false) }, 2000 )
    return (
        <div className="flex gap-1 items-center justify-center" >
            <Lottie animationData={errorAnimation} className="h-12" loop={false} />
            <div>{message} !</div>
        </div>
    )
}