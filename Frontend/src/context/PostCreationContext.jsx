

import React, { Children, createContext, useContext, useState } from 'react'

const  PostCreationContext = createContext(null)

export const PostCreationContextProvider = ({Children}) => {

    const [ interest, setInterest ] = useState([])
    
    const value = {
        interest,
        setInterest
    }

  return (

    <PostCreationContext.Provider value={value} >
        {Children}
    </PostCreationContext.Provider>
    
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePostCreationContext = () => {
    return useContext(PostCreationContext)
}