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
    <div 
        className='flex gap-2' >

        {
            data.map(
                (item,index) => (
                    <button 
                        key={index} 
                        onClick={HandleSelection} 
                        value={item}  
                        className='interest-list'  >
                        {item}
                    </button>
                )
            )
        }
        
    </div>
  )
}

export default ListOfInterest