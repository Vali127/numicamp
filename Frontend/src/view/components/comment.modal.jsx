import { Portal } from './portal.jsx'
import { useEffect } from 'react'

export const CommentModal = ({children}) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset' };
    }, []);

    return (
        <Portal>
            <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 bg-black/50 backdrop-blur-[3px] overflow-hidden">
                <div className="relative w-[95vw] sm:w-[90vw] md:w-[70vw] lg:w-[50vw]
                                h-[85vh] sm:h-[88vh] md:h-[90vh]
                                flex flex-col p-2 bg-neutral-50
                                rounded-lg shadow-2xl
                                max-h-screen overflow-hidden
                                mb-1 sm:mb-0">
                    {children}
                </div>
            </div>
        </Portal>
    )
}