
import React from 'react'

const SettingEntries = () => {
  return (
    <div className='flex flex-col'>
        
        
        <button className='btn-entry text-left flex flex-col w-full'>
            <b className='flex items-center gap-2'><label className='icon_btn font-normal'>&#xE2CE;</label><label>Informations personnelles</label></b>
            <label className='text-[12px]'>Gerez vos informations personnelles</label>
        </button>

        <button className='btn-entry text-left flex flex-col w-full'>
            <b className='flex items-center gap-2'><label className='icon_btn font-normal'>&#xE63C;</label><label>FeedBacks</label></b>
            <label className='text-[12px]'>Envoyez des feedbacks à l' admin pour ameliorer la plateformes</label>
        </button>

        <button className='btn-entry text-left flex flex-col w-full'>
            <b className='flex items-center gap-2 text-red-500'><label className='icon_btn font-normal'>&#xE4A6;</label><label>Suppressions</label></b>
            <label className='text-[12px]'>Suppréssion de votre compte et de vos données</label>
        </button>


    </div>
  )
}

export default SettingEntries