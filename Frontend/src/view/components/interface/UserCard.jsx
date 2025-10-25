import defaultpfp from "../../../assets/images/default-pfp.jpg"

export const UserCard = () => {
    return (
        <div className={ "bg-white flex gap-2 rounded-lg shadow p-3" } >
            <div className={"w-12 h-12 rounded-full bg-gray-500 overflow-hidden"} >
                <img src={defaultpfp} alt="image" />
            </div>
            <div className={"text-left"} >
                <b className={"text-[20px]"} >Jhon Doe</b>
                <div className={"text-[12px] font-light text-gray-500"} >@j.Doe</div>
            </div>
        </div>
    )
}