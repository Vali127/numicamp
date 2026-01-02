import React from 'react'
import {SearchX} from 'lucide-react'

const NotFound = () => {
    return (
        <div className='flex flex-col gap-3 text-neutral-600 items-center
                    bg-neutral-200 rounded-lg
                    py-6 sm:py-8 md:py-10
                    mx-4 sm:mx-8 md:mx-20 lg:mx-40
                    px-4 sm:px-6'>
            <div>
                <SearchX className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'/>
            </div>
            <div className='text-sm sm:text-base md:text-lg text-center'>
                Aucun contenu trouvé
            </div>
        </div>
    )
}

export default NotFound