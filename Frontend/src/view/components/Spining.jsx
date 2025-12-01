import React from "react"

export const Spinning = ({size = 5}) => {

    const className = " w-"+ size +" h-"+ size +" border-5 border-white/20 rounded-full animate-rotate border-t-white "

    return (
        <div>
            <div className={className} >
            </div>
        </div>
    )
}