export const UserMenu = ({ section, setSection}) => {
    return (
        <div className={"flex flex-col gap-0 border-b border-b-neutral-400/30"} >

            <button
                onClick={() => setSection("feeds")}
                className={( section === "feeds" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE344;</div> 
                <div>Feeds</div> 
            </button>

            <button
                onClick={() => setSection("notifications")}
                className={( section === "notifications" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE0D0;</div> 
                <div>Notifications</div> 
            </button>

            <button
                onClick={() => setSection("resources")}
                className={( section === "resources" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE28C;</div> 
                <div>Ressources</div> 
            </button>

            <button
                onClick={() => setSection("schools")}
                className={( section === "schools" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE62C;</div> 
                <div>Établissements</div> 
            </button>

            <button
                onClick={() => setSection("settings")}
                className={( section === "settings" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE434;</div> 
                <div>Paramètres</div> 
            </button>
            
        </div>
    )
}