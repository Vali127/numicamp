import { Portal } from './portal.jsx'

export const CommentModal = ({children}) => {
    return (
        <Portal>
            <div
                className={"absolute flex justify-around top-0 left-0 w-screen h-screen z-50 bg-black/50 backdrop-blur-[3px]"}>
                <div className={"relative"}>
                    <div className={"relative flex flex-col w-[95vw] md:w-[70vw] lg:w-[50vw] h-[85vh] md:h-[90vh] m-auto mt-[10vh] md:mt-[8vh] p-2 md:p-3 bg-neutral-50 rounded-lg"}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}