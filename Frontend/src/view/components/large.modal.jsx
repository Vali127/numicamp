import React from 'react'
import { Portal } from './portal.jsx'

export const LargeModal = ({children}) => {
  return (
    <Portal>
        <div className='absolute top-0 left-0 z-100 w-screen h-screen modal-bg backdrop-blur-[3px]'>
            <div className='w-[50vw] h-[83vh]  bg-white m-auto mt-[10vh] overflow-hidden  rounded-2xl modal-shadow relative'>
                {children}
            </div>
        </div>
    </Portal>
  )
}
