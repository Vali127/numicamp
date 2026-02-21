import {UserProfileViewModel} from "../../../viewmodel/section-vm/user.profile.vm.js";
import ProfilePosts from "./profile.posts.jsx";
import {useGlobalUiContext} from "../../../context/ui.context.jsx";
import Loading from "../../components/loading.jsx";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {useEffect} from "react";


export const    Profile = ({id}) => {

    const { profileData, loaded, posts, ownership, fetchData, fetchPosts } = UserProfileViewModel(id)
    const { refresh } = useGlobalUiContext();

    useEffect(() => {
        fetchData()
        fetchPosts()
    }, [refresh])

    if (!loaded) return <div className="my-2 mx-2 sm:mx-3"><Loading/></div>

    if (!profileData?.user_data) return <div className="mx-2 sm:mx-3">Erreur: données non disponibles</div>

    return (
        <div className="h-full pt-3 overflow-y-auto scrollbar-none bg-gradient-to-b from-gray-50 to-white">
            <ProfileContent
                avatar={profileData.user_data?.photo_profil || ""}
                username={profileData.user_data?.nom_profil || ""}
                name={profileData.user_data?.nom_personne || profileData.user_data?.nom_organisation || ""}
                firstname={profileData.user_data?.prenom_personne || ""}
                date={profileData.user_data?.datenais || profileData.user_data?.date_creation || ""}
                follow={profileData?.follow || 0}
                domains={profileData?.domains || []}
                bio={profileData.user_data?.description_profil || ""}
                type={profileData.user_type || ""}
                owner={profileData.owner || false}
                mail={profileData.user_data?.mail || ""}
                address={profileData.user_data?.localisation || "" }/>
            <div className="mx-2 sm:mx-3 mt-4">
                <div className="font-semibold text-sm sm:text-base px-3 sm:px-4 rounded py-1 bg-violet-500/20 text-violet-600 flex items-center gap-2 w-fit">
                    <span className="icon_btn text-lg sm:text-xl">&#xe344;</span>
                    <span>Publications</span>
                </div>
            </div>
            <ProfilePosts
                data={posts}
                ownership={ownership}
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
        <div className="md:mx-2 sm:mx-3 mt-3 text-left">
            <AvatarHeader
                avatar={avatar}
                username={username}
                type={type}
                follow={follow}
                owner={owner}
            />
            <div className="bg-white shadow-lg border border-gray-100 overflow-hidden relative md:-mt-10 z-5 -mt-8 rounded-b-2xl">
                <div className="pt-5 px-3 sm:px-4 pb-4">
                    <FollowBlock type={type} follow={follow} />
                    <NameBlock name={name} firstname={firstname} username={username} />
                    <DomainList domains={domains} />
                    <BioBlock bio={bio} />
                    <InfoBlock mail={mail} address={address} />
                    <OwnerFooter owner={owner} type={type} date={date} />
                </div>
            </div>
        </div>
    )
}

//_____________MINI COMPONENTS_____________//

const Domain = ({data}) => {
    return (
        <span className="inline-flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-indigo-100 hover:shadow-sm transition-all">
            {data}
        </span>
    )
}

const NameBlock = ({name = "", firstname = "", username = ""}) => {
    const fullName = `${name} ${firstname}`.trim()
    if (!fullName) return null

    return (
        <div className="pb-2 mb-4 border-b-2 border-gray-100">
            <h2 className="font-bold text-xl sm:text-2xl text-gray-900 break-words leading-tight" title={fullName}>
                {fullName}
            </h2>
            <div className="text-xs sm:text-sm font-bold text-violet-500">@{username}</div>
        </div>
    )
}

const AvatarHeader = ({avatar="", username="", type="", owner=false}) => {
    const { setCurrentSection } = useGlobalUiContext()

    return (
        <div className="relative">
            {/* Cover background avec pattern */}
            <div className="h-32 sm:h-40 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative rounded-xl sm:rounded-2xl shadow-xl">
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-20 rounded-xl sm:rounded-2xl" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                {/* Type badge */}
                <div className="absolute right-2 sm:right-3 top-2 sm:top-3 z-10">
                    <span className="inline-block bg-white/25 backdrop-blur-lg text-white text-[10px] sm:text-xs font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border border-white/30 capitalize">
                        {type}
                    </span>
                </div>

                {/* Settings button */}
                {owner && (
                    <button
                        onClick={() => setCurrentSection('settings')}
                        className="absolute bottom-10 sm:bottom-12 right-2 sm:right-3 z-10 bg-white/25 backdrop-blur-lg text-white hover:bg-white/40 transition-all px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg border border-white/30 icon_btn text-base sm:text-lg"
                        title="Paramètres"
                    >
                        &#xE434;
                    </button>
                )}
            </div>

            {/* Avatar card floating */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-14 sm:top-18 z-6">
                <div className="flex flex-col items-center gap-2">
                    {/* Avatar with gradient border + Zoom */}
                    <div className="relative z-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-50"></div>
                        <div className="relative bg-white p-0.5 rounded-full shadow-2xl z-5">
                            <Zoom zoomMargin={40}>
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center z-5 cursor-zoom-in">
                                    {avatar ? (
                                        <img loading="lazy" src={avatar} alt={username} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400 text-3xl sm:text-4xl icon_btn">&#xe7fd;</span>
                                    )}
                                </div>
                            </Zoom>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DomainList = ({domains = []}) => {
    if (!Array.isArray(domains) || domains.length === 0) return null

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {domains.map((item, index) => (
                    <Domain key={item?.design_domaine || index} data={item?.design_domaine || "—"} />
                ))}
            </div>
        </div>
    )
}

const BioBlock = ({bio = ""}) => {
    if (!bio) return null

    return (
        <div className="mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="icon_btn text-indigo-600 text-xs sm:text-sm">&#xe4c4;</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800">Biographie</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-9 sm:pl-10 whitespace-pre-wrap break-words">
                {bio}
            </p>
        </div>
    )
}

const InfoBlock = ({mail = "", address = ""}) => {
    if (!mail && !address) return null

    return (
        <div className="mb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="icon_btn text-indigo-600 text-xs sm:text-sm">&#xe2ce;</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800">Informations</h3>
            </div>
            <div className="space-y-0.5 pl-9 sm:pl-10">
                {mail && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 group">
                        <span className="icon_btn text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0">&#xe218;</span>
                        <span className="truncate min-w-0" title={mail}>{mail}</span>
                    </div>
                )}
                {address && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 group">
                        <span className="icon_btn text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0">&#xe316;</span>
                        <span className="truncate min-w-0" title={address}>{address}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

const OwnerFooter = ({owner=false, type="", date=""}) => {
    if (!owner) return null

    return (
        <div className="pt-4 flex flex-wrap gap-2 sm:gap-3 items-center">
            <div className="flex gap-1.5 sm:gap-2 items-center text-[10px] sm:text-xs text-gray-500 bg-gray-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                <span className="icon_btn text-indigo-500 text-xs sm:text-sm">&#xe780;</span>
                <span>{type === "personal" ? "Né(e) le" : "Créé le"}</span>
                <span className="font-semibold text-gray-700 break-all">{date || "—"}</span>
            </div>
            <div className="flex gap-1.5 sm:gap-2 items-center text-[10px] sm:text-xs bg-purple-50 text-purple-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-purple-200">
                <span className="icon_btn text-xs sm:text-sm">&#xe40c;</span>
                <span className="font-medium whitespace-nowrap">Information privée</span>
            </div>
        </div>
    )
}

const FollowBlock = ({type, follow}) => {
    return (
        <div className="mt-8 sm:mt-10">
            <div className="text-xs sm:text-sm text-gray-600">
                <span className="font-normal">{type === "personal" ? "Abonnements" : "Abonnés"}</span>
                <span className="font-bold text-indigo-600 ml-1.5">{follow}</span>
            </div>
        </div>
    )
}