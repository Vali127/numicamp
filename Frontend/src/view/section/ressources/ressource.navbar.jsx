

import React from 'react'

const ResourceNavBar = ({section, setSection}) => {
  return (
      <div className="sticky z-10 top-12 bg-neutral-50">
          <div className="mx-2 sm:mx-3 flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold"><label className="icon_btn">&#xE28C;</label><label>Ressources</label></div>
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
      </div>
  )
}

export default ResourceNavBar