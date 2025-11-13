export const UserMenu = () => {
    return (
        <div className={"flex flex-col gap-0 border-b border-b-neutral-400/30"} >
            <button className={"menu menu-active"} > 
                <div className="icon_btn text-lg">&#xE344;</div> 
                <div>Feeds</div> 
            </button>
            <button className={"menu"} > 
                <div className="icon_btn text-lg">&#xE0D0;</div> 
                <div>Notifications</div> 
            </button>
            <button className={"menu"} > 
                <div className="icon_btn text-lg">&#xE28C;</div> 
                <div>Ressources</div> 
            </button>
            <button className={"menu"} > 
                <div className="icon_btn text-lg">&#xE62C;</div> 
                <div>Établissements</div> 
            </button>
            <button className={"menu"} > 
                <div className="icon_btn text-lg">&#xE434;</div> 
                <div>Paramètres</div> 
            </button>
            
        </div>
    )
}