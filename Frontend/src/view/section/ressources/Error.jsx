

import React from 'react'

const Error = () => {
  return (
    <div className='text-center'>
        <div className='w-full bg-neutral-200 rounded-sm p-4 flex flex-col gap-2'>
            <div className='icon_btn text-6xl '>&#xE5F6;</div>
            <div className='font-bold text-3xl'>Oups !!</div>
            <div>Une Erreur s' est produite, réesayez plus tard !</div>
        </div>
    </div>
  )
}

export default Error