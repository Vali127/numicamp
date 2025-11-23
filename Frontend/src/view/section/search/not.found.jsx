

import React from 'react'
import {SearchX} from 'lucide-react'

const NotFound = () => {
  return (
    <div className='flex flex-col gap-3 text-neutral-600 items-center bg-neutral-200 rounded-lg py-5 mx-40'>
        <div>
            <SearchX size={"40px"}/>
        </div>
        <div>
            Aucun contenu trouvé
        </div>
    </div>
  )
}

export default NotFound