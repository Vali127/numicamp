
import { Portal } from './Portal.jsx'

export const CommentModal = ({children}) => {
    return (
        <Portal>
            <div
                className={"absolute flex justify-around top-0 left-0 w-screen h-screen z-50 "}
                style={{"backgroundColor": "rgb(29, 41, 61, 0.5)"}}>
                <div className={"relative"}>
                    <div className={"relative flex flex-col w-[50vw] h-[90vh] m-auto mt-[8vh] p-3 bg-neutral-50 rounded-lg"} >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
