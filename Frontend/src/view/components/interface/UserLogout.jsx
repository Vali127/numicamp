export const UserLogout = ({SetLogout}) => {
    return (
        <button className={"logout"} onClick={() => { SetLogout(true) } } >
            Deconnexion
        </button>
    )
}