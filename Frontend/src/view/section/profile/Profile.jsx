import {userProfileViewModel} from "../../../viewmodel/section-vm/user.profile.vm.js";
import ProfilePosts from "./ProfilePosts.jsx";


export const Profile = ({id}) => {

    const { profileData, loaded, posts } = userProfileViewModel(id)

    if (!loaded) return <div>Loading...</div>
    
    if (!profileData?.user_data) return <div>Erreur: données non disponibles</div>

    return (
        <div className="h-full overflow-scroll scrollbar-none">
            <ProfileContent
                avatar={profileData.user_data?.photo_profil || ""}
                username={profileData.user_data?.nom_profil || ""}
                name={profileData.user_data?.nom_personne || profileData.user_data?.nom_organisation || ""}
                firstname={profileData.user_data?.prenom_personne || ""}
                date={profileData.user_data?.datenais || profileData.user_data?.date_creation || ""}
                follow={profileData.follow || 0}
                domains={profileData?.domains || []}
                bio={profileData.user_data?.description_profil || ""}
                type={profileData.user_type || ""}
                owner={profileData.owner || false}
                mail={profileData.user_data?.mail || ""}
                address={profileData.user_data?.localisation || "" }/>
            <div className="font-bold text-lg bg-white rounded shadow-md mt-2 mx-2 text-left pl-3 flex items-center gap-1"><b className="icon_btn">&#xe344;</b>Publication</div>
            <ProfilePosts
                data={posts}
                isEmpty={(posts.length === 0 )}/>
        </div>
    )
}


const ProfileContent = (props) => {
    const {
        avatar="", username="", name="", firstname="", date="",
        type="", bio="", follow=0, mail="", address="", domains=[], owner=false
    } = props

    return (
        <div className=" bg-white shadow-md rounded mx-2 px-3 py-2 text-left ">
            <AvatarHeader
                avatar={avatar}
                username={username}
                name={name}
                firstname={firstname}
                type={type}
                follow={follow}
                owner={owner}
            />
            <div className={"h-18"}></div>
            <DomainList domains={domains} />
            <BioBlock bio={bio} />
            <InfoBlock mail={mail} address={address} />
            <OwnerFooter owner={owner} type={type} date={date} />
        </div>
    )
}

//_____________MINI COMPONENTS_____________//

const Domain = ({data}) => {
    return (
        <button 
            className={"text-gray-500 text-md bg-gray-200 px-3 py-0 rounded font-light"} >
            {data}
        </button>
    )
}

const AvatarHeader = ({avatar="", username="", name="", firstname="", type="", follow=0, owner=false}) => {
    return (
        <div className={"bg-gray-950 h-25 my-2 rounded-md relative"}>
            <button
                className={"text-purple-400 bg-purple-600/50 px-3 py-1 rounded-2xl absolute right-2 top-2"}
                disabled>
                {type}
            </button>
            {owner && <button className={" text-white text-lg font-bold absolute bottom-2 right-5 icon_btn"}> &#xE434; </button>}
            <div className={"w-full h-full flex"}>
                <div className={"w-32 relative"}>
                    <div className={"flex flex-col justify-around items-center gap-1 w-full absolute bottom-[-82%]"}>
                        <div className={" bg-gray-500 w-20 h-20 rounded-full overflow-hidden flex items-center justify-around"}>
                            <img src={avatar || ""} alt="avatar" className="h-full w-full" />
                        </div>
                        <div className={"w-20 h-[42px] text-left"}>
                            <div className={"font-bold"}>{name} {firstname}</div>
                            <div className={"text-[12px]"} >@{username}</div>
                        </div>
                    </div>
                </div>
                <div className={"flex-1 flex flex-col justify-end my-2 ml-2"}>
                    <div className={"text-left text-white text-[12px]"}>
                        { (type === "personal") ? "following : " : "follower(s) : " } <b>{follow}</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DomainList = ({domains = []}) => {
    return (
        <div className={"flex flex-wrap gap-2 py-2"}>
            {
                Array.isArray(domains) && domains.length > 0 ?
                domains.map((item, index) => (
                    <div key={item?.design_domaine || index}>
                        <Domain data={item?.design_domaine || "—"} />
                    </div>
                ))
                :
                <div className="text-gray-400 text-sm">Aucun domaine</div>
            }
        </div>
    )
}

const BioBlock = ({bio = ""}) => (
    <div className={"border-b border-b-neutral-300 py-2"}>
        <h3 className="flex items-center gap-1"><b className="icon_btn">&#xe4c4;</b><b>bio</b></h3>
        <div className={"text-sm text-justify font-light bg-neutral-100/30 rounded-md p-2 pl-2"}>{bio}</div>
    </div>
)

const InfoBlock = ({mail = "", address = ""}) => (
    <div className={"border-b border-b-neutral-300 py-2"}>
        <h3 className="flex items-center gap-1"><b className="icon_btn">&#xe2ce;</b><b>Information</b></h3>
        <div className={"text-sm text-justify font-light pl-2"}>
            <div className="flex items-center gap-1"><label className="icon_btn">&#xe218;</label>{mail || "—"}</div>
            <div className="flex items-center gap-1"><label className="icon_btn">&#xe316;</label>{address || "—"}</div>
        </div>
    </div>
)

const OwnerFooter = ({owner=false, type="", date=""}) => {
    if (!owner) return null
    return (
        <div className={"py-2 flex gap-2 items-center"}>
            <div className={"text-sm flex gap-1 items-center"}><label className="icon_btn">&#xe780;</label>{(type === "personal") ? "né(e) le " : "créé le "}{date || "—"}</div>
            <div className={"text-[12px] text-purple-700 flex gap-1"}><b className="icon_btn">&#xe40c;</b>cette information est privée</div>
        </div>
    )
}