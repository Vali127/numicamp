
const AccountIndex = ({name, firstname = "", username, profile, description, id, type, GoToProfile}) => {
    
  return (
    <div
        onClick={() => { GoToProfile(id) }}
         className='my-1 p-1 bg-neutral-100 flex text-left gap-3 border border-neutral-200/80 rounded-lg hover:bg-neutral-200 cursor-pointer'>
        <div className='flex items-center justify-around'>
            <div className='w-13 h-13 bg-neutral-300 rounded-2xl overflow-hidden flex items-center'>
                <img src={profile} alt="pfp" className='w-full h-full' />
            </div>
        </div>
        <div className='flex-1'>
            <div className='flex items-center gap-2' id={id}>
                <div className='font-bold text-lg'>{name} {firstname}</div>
                <div className='text-sm text-green-300'>{username}</div>
            </div>
            <div className='text-justify text-sm font-light text-neutral-500'>
                {description}
            </div>
        </div>
        {
            (type === "organisation") &&
            <div className='px-3 flex flex-col items-center justify-around'>
                <button className='bg-slate-900 text-white py-1 px-3 rounded text-sm font-bold flex items-center gap-2'><label className='icon_btn'>&#xE5E8;</label><label>suivre</label></button>
            </div>
        }
    </div>
  )
}

export default AccountIndex