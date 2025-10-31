import React from 'react'
import { getListOfInterest } from '../../../context/MainAppContext.jsx'
import { HandleItemSelection } from '../../../utils/UI.js'

const ListOfInterest = () => {

    const data = getListOfInterest()

    const HandleSelection = (e) => HandleItemSelection(e, "interest-list-active")

  return (
    <div className='flex gap-2' >
        {
            data.map(
                (item,index) => (
                    <button key={index} onClick={HandleSelection}  className='interest-list'  >
                        {item}
                    </button>
                )
            )
        }
    </div>
  )
}

export default ListOfInterest