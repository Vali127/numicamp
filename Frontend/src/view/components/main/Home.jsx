import {HomeViewModel} from "../../../viewmodel/main/HomeViewModel.js";
import {AlertCard} from "../interface/AlertCard.jsx";
import {UserCard} from "../interface/UserCard.jsx";
import {UserMenu} from "../interface/UserMenu.jsx";
import {UserLogout} from "../interface/UserLogout.jsx";
import {LogoutModal} from "../logout/LogoutModal.jsx";
import numicamp from "../../../assets/images/numicamp.png"
import {Search} from "lucide-react";


const HomeContents = () => {
    const { logout, setLogout } = HomeViewModel()
    return (
        <div className={" w-full h-screen flex px-3 gap-4"}>

            <div className={"relative flex flex-col w-[16%] h-auto mt-3 gap-10"} >
                <UserCard/>
                <UserMenu/>
                <div className={"absolute w-full bottom-5"}>
                    <UserLogout SetLogout={setLogout}/>
                    { logout && <LogoutModal Type={"red"} SetLogout={setLogout} /> }
                </div>
            </div>

            <div className={"flex flex-col w-[60%] mt-3 h-auto"} >
                <div className={"flex h-10 w-full gap-2"} >
                    <img src={numicamp} alt="numicamp" />
                    <div className={"font-bold text-green-400 text-[34px]"} >Numicamp</div>
                </div>
            </div>

            <div className={"flex flex-col w-[20vw] h-auto mt-3"} >
                <div className={"relative"} >
                    <input type={"text"} className={"text_input input__shadow rounded-2xl relative w-full pr-8"} placeholder={"rechercher ici ..."} />
                    <Search className={"text-gray-700 scale-90 absolute right-1 top-1"} />
                </div>
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