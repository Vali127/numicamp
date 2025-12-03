

import { createContext, useContext, useState } from 'react'

//CONTEXT
const  PostFormContext = createContext(null)

//PROVIDER
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

//HOOKS
// eslint-disable-next-line react-refresh/only-export-components
export const usePostCreationContext = () => {
    return useContext(PostFormContext)
}