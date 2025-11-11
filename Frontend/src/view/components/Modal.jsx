import numicamp from '../../assets/images/numicamp.png'
import numicampRed from '../../assets/images/numicamp-red.png'
import { Portal } from './Portal.jsx'

export const Modal = ({children, Type = null }) => {
    return (
        <Portal>
            <div
                className={"absolute top-0 left-0 w-screen h-screen z-50"}
                style={{"backgroundColor": "rgb(29, 41, 61, 0.5)"}}>
                <div className={"relative"}>
                    <div className={"relative md:w-100 w-[85vw] m-auto my-50  px-10 py-10 bg-white rounded-lg "} >
                        <img src={ (Type === "red" ) ? numicampRed : numicamp } alt="bumicamp" className={"w-6 h-6 absolute left-2 top-2"} />
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
