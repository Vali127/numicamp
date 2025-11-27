import { Children, createContext, useContext, useState } from "react";

//Context
const UiGlobalUiContext = createContext(null)

//Provider
export const GlobalUiContextProvider = ({children}) => {


    const [currentSection, setCurrentSection] = useState('feeds')


    const value = {
        currentSection,
        setCurrentSection
    }

    return (
        <UiGlobalUiContext.Provider value={value} >
            {children}
        </UiGlobalUiContext.Provider>
    )

}

//hooks
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalUiContext = () => {
    return useContext(UiGlobalUiContext)
}