import {HomeViewModel} from "../../../viewmodel/main/HomeViewModel.js";
import {AlertCard} from "../interface/AlertCard.jsx";
import {UserCard} from "../interface/UserCard.jsx";
import {UserMenu} from "../interface/UserMenu.jsx";
import {UserLogout} from "../interface/UserLogout.jsx";
import {LogoutModal} from "../logout/LogoutModal.jsx";


const HomeContents = () => {
    const { logout, setLogout } = HomeViewModel()
    return (
        <div className={" w-full h-auto flex px-3"}>

            <div className={"relative flex flex-col w-[16%] h-auto mt-3 gap-10"} >
                <UserCard/>
                <UserMenu/>
                <div className={"absolute w-full bottom-5"}>
                    <UserLogout SetLogout={setLogout}/>
                    { logout && <LogoutModal SetLogout={setLogout} /> }
                </div>
            </div>

            <div className={"flex flex-col w-[60%] h-screen"} >
            </div>
            <div className={"flex flex-col w-[20vw] h-screen"} >

            </div>
        </div>
    )
}

export const Home = () => {
    const { authenticated } = HomeViewModel()
    return (
        <div>
            {
                authenticated ?
                    <HomeContents/>
                    :
                    <AlertCard
                        type="error"
                        text="Accès interdite !! veuillez vous reconnecter"
                    />
            }
        </div>
    )
}