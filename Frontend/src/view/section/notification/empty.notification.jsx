
import React from 'react'

const EmptyNotification = () => {
  return (
    <div className='bg-neutral-200 rounded text-left px-3 py-4 mx-2 mt-3'>
        <div><label></label><b>Vous n' avez pas de notification</b></div>
        <div className='text-[13px]'>Vos notification vont apparaitre ici</div>
    </div>
  )
}

export default EmptyNotification