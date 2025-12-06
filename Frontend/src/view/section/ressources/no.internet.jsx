

import React from 'react'

const NoInternet = () => {
  return (
    <div className='text-center'>
        <div className='w-full bg-neutral-200 rounded-sm p-4 flex flex-col gap-2'>
            <div className='icon_btn text-6xl '>&#xE4F2;</div>
            <div className='font-bold text-3xl'>Oups !!</div>
            <div>Il' semble que vous êtes hors ligne !</div>
        </div>
    </div>
  )
}

export default NoInternet