

import { createContext, useContext, useState } from 'react'

//CONTEXT
const  PostFormContext = createContext(null)

//PROVIDER
export const PostCreationContextProvider = ({children}) => {

    const [ interest, setInterest ] = useState([])
    
    const value = {
        interest,
        setInterest
    }

  return (

    <PostFormContext.Provider value={value} >
        {children}
    </PostFormContext.Provider>
    
  )
}

//HOOKS
// eslint-disable-next-line react-refresh/only-export-components
export const usePostCreationContext = () => {
    return useContext(PostFormContext)
}