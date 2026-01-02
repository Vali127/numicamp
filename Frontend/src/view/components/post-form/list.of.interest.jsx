import React from 'react'
import { getListOfInterest } from '../../../context/random.context.jsx'
import { HandleItemSelection } from '../../../utils/ui.js'

const ListOfInterest = ({setPostData, postData}) => {

    const data = getListOfInterest()

    const HandleSelection = (e) => HandleItemSelection(
        e,
        "interest-list-active",
        () => { setPostData({...postData, keywords : [ ...postData.keywords, e.target.value ]}) },
        () => { setPostData({...postData, keywords : (postData.keywords).filter( kw => kw != e.target.value )}) }
    )

    return (
        <div className='flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5'>
            {
                data.map(
                    (item,index) => (
                        <button
                            key={index}
                            onClick={HandleSelection}
                            value={item}
                            className='interest-list text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5'  >
                            {item}
                        </button>
                    )
                )
            }
        </div>
    )
}

export default ListOfInterest