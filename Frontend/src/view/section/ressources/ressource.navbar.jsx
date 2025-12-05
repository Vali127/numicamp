

import React from 'react'

const RessourceNavBar = ({section, setSection}) => {
  return (
    <div className='flex gap-3 mx-3 my-2'>
        
        <button
            onClick={() => { setSection("news") }} 
            className={ ( section  === "news") ? 'tab-active' : 'tab' } >
            Actus
        </button>

        <button 
            onClick={() => { setSection("sites") }} 
            className={ ( section  === "sites") ? 'tab-active' : 'tab' }>
            Sites
        </button>

    </div>
  )
}

export default RessourceNavBar