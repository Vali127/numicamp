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
    <div 
        className='flex gap-2 flex-wrap' >
        
        {
            data.map(
                (item,index) => (
                    <button 
                        key={index} 
                        onClick={HandleSelection} 
                        value={item.design_domaine}  
                        className='domain-list'  >
                        {item.design_domaine}
                    </button>
                )
            )
        }
        
    </div>
  )
}

export default ListOfDomain