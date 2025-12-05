
export const LoadingRessources = () => {
  return (
    <div className='bg-neutral-100 p-3 rounded-lg flex flex-col gap-1 mb-3'>
      <div className='flex gap-2'>
        <div className='flex-1 flex flex-col gap-1'>
          <div className='h-6 w-[65%] bg-neutral-300 rounded-lg animate-pulse-custom delay-1'></div>
          
          <div className="flex gap-3">
            <div className='h-4 w-[25%] bg-neutral-300 rounded-lg animate-pulse-custom delay-2'></div>
            <div className='h-4 w-[20%] bg-neutral-300 rounded-lg animate-pulse-custom delay-2'></div>
          </div>
          
          <div className='flex flex-col gap-0.5'>
            <div className='bg-neutral-300 w-full h-3 rounded-lg animate-pulse-custom delay-3'></div>
            <div className='bg-neutral-300 w-full h-3 rounded-lg animate-pulse-custom delay-4'></div>
            <div className='bg-neutral-300 w-full h-3 rounded-lg animate-pulse-custom delay-4'></div>
          </div>

        </div>
        <div className='bg-neutral-300 h-30 w-30 rounded-lg animate-pulse-custom'></div>
      </div>
      
      <div className='flex justify-between'>
        <div className='bg-neutral-300 w-25 h-5 rounded-lg animate-pulse-custom delay-5'></div>
        <div className='bg-neutral-300 w-5 h-5 rounded-lg animate-pulse-custom delay-6'></div>
      </div>
    </div>
  )
}

export const LoadingSitesRessources = () => {
  return (
    <div className='bg-neutral-100 p-3 rounded-lg flex flex-col gap-1 mb-3'>
      <div className='flex gap-2'>

        <div className='bg-neutral-300 h-12 w-12 rounded-lg animate-pulse-custom'></div>
        
        <div className='flex-1 flex flex-col gap-1'>
          <div className="flex gap-5">
            <div className='h-6 w-[45%] bg-neutral-300 rounded-lg animate-pulse-custom delay-1'></div>
            <div className='h-6 w-[15%] bg-neutral-300 rounded-lg animate-pulse-custom delay-1'></div>
          </div>
          <div className='h-4 w-[20%] bg-neutral-300 rounded-lg animate-pulse-custom delay-2'></div>
          
          <div className='flex flex-col gap-0.5'>
            <div className='bg-neutral-300 w-full h-3 rounded-lg animate-pulse-custom delay-3'></div>
            <div className='bg-neutral-300 w-full h-3 rounded-lg animate-pulse-custom delay-4'></div>
          </div>

        </div>
      </div>
    </div>
  )
}