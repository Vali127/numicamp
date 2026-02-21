import numicamp from '../../assets/images/numicamp.png'
import numicampRed from '../../assets/images/numicamp-red.png'
import { Portal } from './portal.jsx'

export const Modal = ({children, Type = null }) => {
    return (
        <Portal>
            <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[3px] overflow-y-auto">
                <div className="relative min-h-screen flex items-center justify-center p-4">
                    <div className="relative md:w-100 w-[85vw] px-10 py-10 bg-white rounded-lg">
                        <img src={(Type === "red") ? numicampRed : numicamp} alt="numicamp" className="w-6 h-6 absolute left-2 top-2" />
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}