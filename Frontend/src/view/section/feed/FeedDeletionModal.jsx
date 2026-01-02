import {Modal} from "../../components/modal.jsx";
import {DeletionViewModel} from "../../../viewmodel/feeds-vm/unique.feed.vm.js";
import {ThreeDots} from "react-loader-spinner";
import {useEffect} from "react";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json";
import rejectAnimation from "../../../assets/animations/system-solid-55-error-in-error.json";

export const FeedDeletionModal = ({postId, setModalVisibility, refresh, setRefresh}) => {

    const { status } = DeletionViewModel(postId)

    return (
        <Modal>
            { status === "loading" && <DeletionLoading/> }
            { status === "success" && <DeletionSuccess setVisibility={setModalVisibility} refresh={refresh} setRefresh={setRefresh} /> }
            { status === "error" && <DeletionFailure setVisibility={setModalVisibility}/> }
        </Modal>
    )
}


const DeletionLoading = () => {

    return (
        <div className={"text-center"}>
            <div className={" flex justify-around"}>
                <ThreeDots color="#1ACD2F" />
            </div>
        </div>
    )
}

const DeletionSuccess = ({setVisibility, refresh, setRefresh}) => {

    useEffect(() => {
        setTimeout( () => { setVisibility(false); setRefresh(!refresh) }, 2000 )
    }, []);

    return (
        <div className={"flex items-center gap-3"}>
            <div>
                <Lottie className={" h-10 md:h-12"} animationData={successAnimation} loop={false} />
            </div>
            <div>
                <h2 className={"font-bold text-[16px] md:text-2xl"}>Supression <span className="span">effectué !!</span> </h2>
                <p className={"text-[12px]"}>rafraichir la page</p>
            </div>
        </div>
    )
}

const DeletionFailure = ({setVisibility}) => {

    useEffect(() => {
        setTimeout( () => { setVisibility(false) }, 2000 )
    }, []);

    return (
        <div className={"flex items-center gap-3"}>
            <div>
                <Lottie className={" h-10 md:h-12"} animationData={rejectAnimation} loop={false} />
            </div>
            <div>
                <h2 className={"font-bold text-[16px] md:text-2xl"}>suppression <b className={"text-yellow-300"}>échoué !!</b> </h2>
                <p className={"text-[12px]"}>une erreur s' est produite</p>
            </div>
        </div>
    )
}