

import React, { Children, createContext, useContext, useState } from 'react'

const  PostFormContext = createContext(null)

export const PostCreationContextProvider = ({Children}) => {

    const [ interest, setInterest ] = useState([])
    
    const value = {
        interest,
        setInterest
    }

  return (

    <PostFormContext.Provider value={value} >
        {Children}
    </PostFormContext.Provider>
    
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePostCreationContext = () => {
    return useContext(PostFormContext)
}