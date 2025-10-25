

const AlertCardError = ({text}) => {
    return (
        <div className={"w-full text-wrap alert__card text-red-500 border-1 border-red-200 rounded-lg text-left px-10 py-5 mt-5"} >
            <h2 className={"text-[20px]"} > Alerte : <b>Erreur</b></h2>
            <p className={"text-[13px]"} >{text}</p>
        </div>
    )
}

const WarningCard = ({text}) => {
    return (
        <div className={"w-full text-wrap warning__card text-yellow-400 border-1 border-yellow-200 rounded-lg text-left px-10 py-5 mt-5"} >
            <h2 className={"text-[20px]"} > Alerte : <b>Attention !</b></h2>
            <p className={"text-[13px]"} >{text}</p>
        </div>
    )
}

export const AlertCard = ({type, text}) => {
    return (
        <div>
            { type === 'error' && <AlertCardError text={text} /> }
            { type === 'warning' && <WarningCard text={text}  /> }
        </div>
    )
}