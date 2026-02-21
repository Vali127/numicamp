import React from 'react'

const AccountIndex = ({name, firstname = "", username, profile, description, id, type, GoToProfile}) => {

    return (
        <div
            onClick={() => { GoToProfile(id) }}
            className='group my-2 p-2 sm:p-4 bg-white flex text-left gap-3 sm:gap-4
                   border border-neutral-200 rounded-lg hover:shadow-lg hover:border-indigo-200
                   cursor-pointer transition-all duration-300 ease-in-out'
        >
            {/* Profile Image & Name Section */}
            <div className='flex gap-3 items-start flex-1 min-w-0'>
                <div className='flex-shrink-0'>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-100 to-purple-100
                                rounded-lg overflow-hidden flex items-center justify-center
                                ring-2 ring-neutral-100 group-hover:ring-indigo-200 transition-all duration-300'>
                        <img loading="lazy" src={profile} alt={`${name} profile`} className='w-full h-full object-cover' />
                    </div>
                </div>

                {/* Content */}
                <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-2 mb-1' id={id}>
                        <div className='font-bold text-base sm:text-lg text-neutral-900'>
                            {name} {firstname}
                        </div>
                        <div className='text-xs sm:text-sm text-indigo-500 font-medium'>
                            @{username}
                        </div>
                    </div>
                    <div className='text-sm text-neutral-600 line-clamp-2 leading-relaxed'>
                        {description}
                    </div>
                </div>
            </div>

            {/* Follow Button */}
            {type === "organisation" && (
                <div className='flex items-start pt-1'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add follow logic here
                        }}
                        className='bg-gradient-to-r from-indigo-600 to-indigo-700
                               hover:from-indigo-700 hover:to-indigo-800
                               text-white py-2 px-4 sm:px-5 rounded-md
                               text-xs sm:text-sm font-semibold
                               flex items-center gap-2
                               shadow-sm hover:shadow-md
                               transition-all duration-200
                               active:scale-95
                               whitespace-nowrap'
                    >
                        <span className='icon_btn text-base'>&#xE5E8;</span>
                        <span>Suivre</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default AccountIndex