import React from 'react'
import { Portal } from './Portal.jsx'

export const LargeModal = ({children}) => {
  return (
    <Portal>
        <div className='absolute top-0 left-0 w-screen h-screen modal-bg'>
            <div className='w-[50vw] h-[80vh] bg-white m-auto mt-[10vh] overflow-hidden  rounded-2xl modal-shadow relative'>
                {children}
            </div>
        </div>
    </Portal>
  )
}
