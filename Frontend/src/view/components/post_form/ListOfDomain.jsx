import React from 'react'
import { HandleItemSelection } from '../../../utils/UI.js'

const ListOfDomain = ({data}) => {

    const HandleSelection = (e) => HandleItemSelection(e, "domain-list-active")

  return (
    <div className='flex gap-2' >
        {
            data.map(
                (item,index) => (
                    <button key={index} onClick={HandleSelection}  className='domain-list'  >
                        {item.design_domaine}
                    </button>
                )
            )
        }
    </div>
  )
}

export default ListOfDomain