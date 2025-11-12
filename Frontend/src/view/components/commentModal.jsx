
import { Portal } from './Portal.jsx'

export const CommentModal = ({children}) => {
    return (
        <Portal>
            <div
                className={"absolute flex justify-around top-0 left-0 w-screen h-screen z-50"}
                style={{"backgroundColor": "rgb(29, 41, 61, 0.5)"}}>
                <div className={"relative"}>
                    <div className={"relative flex flex-col w-[85vw] h-[90vh] m-auto mt-[10vh] p-3 bg-white rounded-lg"} >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
