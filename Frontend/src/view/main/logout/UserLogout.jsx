export const UserLogout = ({SetLogout}) => {
    return (
        <button className={"logout flex items-center gap-2"} onClick={() => { SetLogout(true) } } >
            <div className="icon_btn">&#xE42A;</div>
            <div>Deconnexion</div>
        </button>
    )
}