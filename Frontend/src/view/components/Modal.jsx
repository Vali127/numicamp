import numicamp from '../../assets/images/numicamp.png'
import { Portal } from './Portal.jsx'

export const Modal = ({children}) => {
    return (
        <Portal>
            <div
                className={"absolute top-0 left-0 w-screen h-screen z-50"}
                style={{"backgroundColor": "rgb(29, 41, 61, 0.5)"}}>
                <div className={"relative mx-120 my-50 m-auto px-10 py-10 bg-amber-50 rounded-lg "} >
                    <img src={numicamp} alt="bumicamp" className={"w-6 h-6 absolute left-2 top-2"} />
                    {children}
                </div>
            </div>
        </Portal>
    )
}
