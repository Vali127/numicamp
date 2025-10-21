import {useEffect} from "react";
import {ITDomain, useSignInContext} from "../../../context/SignInContext.jsx";

export const DomainForm = ({CurrentPage, isButtonNextDisabled}) => {
    const { domain, setDomain } = useSignInContext()

    const HandleSelection = (e)=>{
        const currentclasses = e.target.className;
        if ( currentclasses.includes("selection_btn_selected") ) {
            e.target.classList.remove("selection_btn_selected");
            setDomain(domain.filter( domain => domain !== e.target.value )); // parce que react est immuable
        } else {
            e.target.classList.add("selection_btn_selected");
            setDomain([...domain, e.target.value]); // parce que react est immuable
        }
    }

    useEffect(() => { if (CurrentPage) { CurrentPage('accountForm') } }, [])
    useEffect( () => { ( domain.length >= 1 ) ? isButtonNextDisabled(false) : isButtonNextDisabled(true)  }, [domain] )

    const data = ITDomain()

    return (
        <div className={"text-left mx-8 md:mx-20"}>
            <h2 className={" text-[20px] md:text-2xl font-bold mb-5"}>Quelles<span> domaines</span> vous interresses ?</h2>
            <div className={"flex gap-4 flex-wrap overflow-scroll h-105 md:h-auto"}>
                {
                    data.map((domain, index) => (
                        <button
                            className={"selection_btn"}
                            onClick={HandleSelection}
                            value={domain}
                            key={index} >
                            {domain}</button>
                    ))
                }
            </div>
        </div>
    )
}