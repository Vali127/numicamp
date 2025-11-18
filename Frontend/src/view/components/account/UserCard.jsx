
export const UserCard = ({ setSection,profile, name, firstname, user, postModalIsVisible}) => {

    return (
        <div 
            className="flex flex-col gap-2 py-3 border-b border-b-neutral-500/20" >
            
            <div
                onClick={() => setSection("profile")}
                className={ "flex gap-2 cursor-pointer" } >
                
                <div 
                    className={"w-12 h-12 rounded-[14px] bg-gray-500 overflow-hidden"} >
                    <img 
                        src={profile} 
                        alt="image" 
                        className="w-full h-full"  />
                </div>

                <div className={"text-left"} >
                    <b className={"text-[20px]"} >{name} {firstname}</b>
                    <div className={"text-[12px] font-light text-gray-500"} >@{user}</div>
                </div>
        
            </div>
            
            <div>
                <button 
                    onClick={() => { postModalIsVisible(true) }}  
                    className="bg-slate-950 w-full  text-white text-[14px]  px-5 py-1 rounded flex justify-center items-center gap-2 cursor-pointer">
                    <div className="icon_btn text-lg font-bold ">&#xE34C;</div> 
                    <div className="flex items-center">Publication</div>
                </button>
            </div
            >
        </div>
    )
}