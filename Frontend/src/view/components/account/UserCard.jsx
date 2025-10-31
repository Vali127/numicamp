
export const UserCard = ({ profile, name, firstname, user, postModalIsVisible}) => {

    return (
        <div className="bg-white flex flex-col gap-2 rounded-lg shadow p-3" >
            <div className={ "flex gap-2" } >
                <div className={"w-12 h-12 rounded-full bg-gray-500 overflow-hidden"} >
                    <img src={profile} alt="image" className="w-full h-full"  />
                </div>
                <div className={"text-left"} >
                    <b className={"text-[20px]"} >{name} {firstname}</b>
                    <div className={"text-[12px] font-light text-gray-500"} >@{user}</div>
                </div>
            </div>
            <div>
                <button onClick={() => { postModalIsVisible(true) }}  className="border border-slate-800 w-full  text-slate-800 text-[14px]  px-5 py-1 rounded "> + Publication</button>
            </div>
        </div>
    )
}