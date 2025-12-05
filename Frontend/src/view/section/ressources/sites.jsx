

import {useState} from 'react'
import globe from "../../../assets/images/globe.png"

const Sites = ({favicon,name,domain,link,description}) => {
  const [faviconError, setFaviconError] = useState(false)

  return (
    <div className='bg-neutral-100 p-3 rounded-lg flex flex-col gap-1 mb-2 text-left border border-neutral-300/50 mx-3'>
      <div className='flex gap-2'>

        <div className='h-8 w-8 rounded-2xl overflow-hidden relative flex items-center justify-around'>
          <img src={!faviconError && favicon ? favicon : globe} className='w-full h-full' onError={() => setFaviconError(true)}  alt="fav" />
        </div>
        
        <div className='flex-1 flex flex-col gap-1'>
          
          <div className="flex justify-between">
            <div className='font-bold text-2xl'>{name}</div>
            <button className='px-3 text-violet-600 bg-violet-600/20 rounded-2xl text-[13px]'>{domain}</button>
          </div>
          
          <div className='text-[12px]'><a href={link}>{link}</a></div>
          
          <div className='font-light text-justify text-sm'>
            {description}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Sites