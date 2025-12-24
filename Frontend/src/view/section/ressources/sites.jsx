import {useState} from 'react'
import globe from "../../../assets/images/globe.png"

const Sites = ({favicon,name,domain,link,description}) => {
    const [faviconError, setFaviconError] = useState(false)

    return (
        <div className='bg-neutral-100 p-3 rounded-lg flex flex-col gap-1 mb-2 text-left border border-neutral-300/50'>
            <div className='flex gap-2'>

                <div className='h-6 w-6 sm:h-8 sm:w-8 rounded-2xl overflow-hidden relative flex items-center justify-around flex-shrink-0'>
                    <img src={!faviconError && favicon ? favicon : globe} className='w-full h-full' onError={() => setFaviconError(true)}  alt="fav" />
                </div>

                <div className='flex-1 flex flex-col gap-1 min-w-0'>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div className='font-bold text-lg sm:text-xl md:text-2xl break-words'>{name}</div>
                        <button className='px-2 sm:px-3 text-violet-600 bg-violet-600/20 rounded-2xl text-[11px] sm:text-[13px] whitespace-nowrap flex-shrink-0 w-fit'>{domain}</button>
                    </div>

                    <div className='text-[11px] sm:text-[12px] break-all'><a href={link}>{link}</a></div>

                    <div className='font-light text-justify text-xs sm:text-sm'>
                        {description}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sites