import React, {useEffect} from 'react'
import { Portal } from './portal.jsx'

export const LargeModal = ({children}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset' };
    }, []);

    return (
        <Portal>
            <div className='fixed inset-0 z-[100] w-screen h-[100dvh] modal-bg backdrop-blur-[3px] flex flex-col items-center p-1 md:pt-12 overflow-hidden'>
                <div className='w-full md:w-[70vw]
                            h-full md:h-[85vh]
                            bg-white
                            m-0 md:m-0
                            overflow-hidden
                            rounded-lg md:rounded-2xl
                            modal-shadow
                            relative'>
                    {children}
                </div>
            </div>
        </Portal>
    )
}