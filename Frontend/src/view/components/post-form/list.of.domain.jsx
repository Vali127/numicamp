import React from 'react'
import { HandleItemSelection } from '../../../utils/ui.js'

const ListOfDomain = ({data, postData, setPostData}) => {

    const HandleSelection = (e) => HandleItemSelection(
        e,
        "domain-list-active",
        () => { setPostData({...postData, domains : [ ...postData.domains, e.target.value ]}) },
        () => { setPostData({...postData, domains : (postData.domains).filter( kw => kw != e.target.value )}) }
    )

    return (
        <div className='flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5'>
            {
                data.map(
                    (item,index) => (
                        <button
                            key={index}
                            onClick={HandleSelection}
                            value={item.design_domaine}
                            className='domain-list text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5'  >
                            {item.design_domaine}
                        </button>
                    )
                )
            }
        </div>
    )
}

export default ListOfDomain