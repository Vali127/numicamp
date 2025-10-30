
export const UserCard = ({ profile, name, firstname, user}) => {
    console.log("info : " ,user, " ", firstname, " ", user)
    return (
        <div className={ "bg-white flex gap-2 rounded-lg shadow p-3" } >
            <div className={"w-12 h-12 rounded-full bg-gray-500 overflow-hidden"} >
                <img src={profile} alt="image" className="w-full h-full"  />
            </div>
            <div className={"text-left"} >
                <b className={"text-[20px]"} >{name} {firstname}</b>
                <div className={"text-[12px] font-light text-gray-500"} >@{user}</div>
            </div>
        </div>
    )
}