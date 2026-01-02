import {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {PersonUiVm} from "../../../viewmodel/user-ui-vm/person.ui.vm.js";
import {AlertCard} from "../../components/alert.card.jsx";
import {UserCard} from "../../components/account/UserCard.jsx";
import {UserMenu} from "./menu/user.menu.jsx";
import {UserLogout} from "../../accessibility/logout/user.logout.jsx";
import PostModal from "../../components/post-form/post.modal.jsx";
import {LogoutModal} from "../../accessibility/logout/logout.modal.jsx";
import {Search} from "lucide-react";
import {OrgSuggestion} from "./suggestion/org.suggestion.jsx";
import {Feeds} from "../../section/feed/feeds.jsx";
import {Notification} from "../../section/notification/notification.jsx";
import {Resources} from "../../section/ressources/resources.jsx";
import {Schools} from "../../section/school/schools.jsx";
import {Setting} from "../../section/setting/setting.jsx";
import {Profile} from "../../section/profile/profile.jsx";
import SearchSection from "../../section/search/search.section.jsx";
import { GlobalUiContextProvider, useGlobalUiContext } from "../../../context/ui.context.jsx";
import {MobileMenu} from "./menu/MobileMenu.jsx";
import {AppHeader} from "../../components/AppHeader.jsx";


// Left Sidebar Component
const LeftSidebar = ({ userInfo, section, setSection, logout, setLogout, setPostModalVisibility }) => (
    <div className="w-[20vw] hidden md:flex h-screen sticky top-0 p-2 flex-col justify-between">
        <div className="flex flex-col gap-10">
            <UserCard
                setSection={setSection}
                profile={userInfo.photo_profil}
                name={userInfo.nom_personne}
                firstname={userInfo.prenom_personne}
                user={userInfo.nom_profil}
                postModalIsVisible={setPostModalVisibility}
            />
            <UserMenu section={section} setSection={setSection} />
        </div>

        <div className="w-full pb-5">
            <UserLogout SetLogout={setLogout} />
            {logout && <LogoutModal Type="red" SetLogout={setLogout} />}
        </div>
    </div>
);


// Main Content Area Component
const MainContent = ({
                         section,
                         setSection,
                         userInfo,
                         setLogout,
                         userProfilId,
                         searchContent,
                         setSearchContent,
                         searched,
                         setSearched
                     }) => (

    <div className="flex-1 md:px-0 px-2">
        <div className="bg-neutral-50 shadow-neutral-50 shadow-2xl pt-2 sticky top-0 z-20">
            <AppHeader
                setSection={setSection}
                userInfo={userInfo}
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                searched={searched}
                setSearched={setSearched}
            />
            <div className="block md:hidden">
                <MobileMenu section={section} setSection={setSection} />
            </div>
        </div>

        <div>
            <Routes>
                <Route path="feeds" element={<Feeds />} />
                <Route path="notifications" element={<Notification />} />
                <Route path="ressources" element={<Resources />} />
                <Route path="schools" element={<Schools />} />
                <Route path="settings" element={<Setting setLogout={setLogout} />} />
                <Route path="profile" element={<Profile owner={true} id={userInfo.id_profil} />} />
                <Route path="profileVisit" element={<Profile owner={false} id={userProfilId} />} />
                <Route path="search" element={<SearchSection prompt={searchContent} refresh={searched} />} />
            </Routes>
        </div>
    </div>
);


// Right Sidebar Component
const RightSidebar = ({ searchContent, setSearchContent, searched, setSearched, setSection }) => {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchContent !== "") {
            setSection("search");
            setSearched(!searched);
        }
    };

    return (
        <div className="w-[25vw] mx-2 h-screen hidden md:block sticky top-0 text-left overflow-scroll scrollbar-none">
            <div className="p-2 bg-neutral-50 sticky top-0">
                <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                        <input
                            value={searchContent}
                            onChange={(e) => setSearchContent(e.target.value)}
                            type="text"
                            className="text_input input__shadow rounded-2xl w-full pr-8"
                            placeholder="rechercher ici ..."
                        />
                        <button type="submit">
                            <Search className="text-gray-700 scale-90 absolute right-2 top-1.5" />
                        </button>
                    </div>
                </form>
                <div className="font-bold text-lg mt-15 mb-3 text-left">Suggestions</div>
            </div>
            <OrgSuggestion />
        </div>
    );
};


const HomeContents = () => {
    const {
        logout,
        setLogout,
        userInfo,
        postModalVisibility,
        setPostModalVisibility,
        searchContent,
        setSearchContent,
        searched,
        setSearched
    } = PersonUiVm();

    const {
        currentSection: section,
        setCurrentSection: setSection,
        setUserType,
        userProfilId,
        refresh
    } = useGlobalUiContext();

    // Section par défaut
    useEffect(() => {
        setSection("feeds");
    }, []);


    // Vider les bar de recherche quand on change de section
    useEffect(() => {
        if (section !== 'search') {
            setSearchContent("");
            setSearched(false);
        }
    }, [section, setSearchContent, setSearched]);

    // Info dont on a besoin dans le contexte
    useEffect(() => {
        if (userInfo.sexe) {
            setUserType(userInfo.sexe ? "personal" : "organisational");
        }
    }, [userInfo]);

    return (
        <div className="w-full flex relative">
            {postModalVisibility && (
                <PostModal
                    profil={userInfo.photo_profil}
                    name={userInfo.nom_personne}
                    firstname={userInfo.prenom_personne}
                    username={userInfo.nom_profil}
                    domains={userInfo.domains}
                    setModalVisibility={setPostModalVisibility}
                />
            )}

            <LeftSidebar
                userInfo={userInfo}
                section={section}
                setSection={setSection}
                logout={logout}
                setLogout={setLogout}
                setPostModalVisibility={setPostModalVisibility}
            />

            <MainContent
                section={section}
                setSection={setSection}
                userInfo={userInfo}
                setLogout={setLogout}
                userProfilId={userProfilId}
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                searched={searched}
                setSearched={setSearched}
            />

            <RightSidebar
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                searched={searched}
                setSearched={setSearched}
                setSection={setSection}
            />

            {/* Floating Create Post Button for Mobile */}
            <button
                onClick={() => setPostModalVisibility(true)}
                className="md:hidden fixed bottom-6 right-6 bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors z-30"
                aria-label="Create post"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
        </div>
    );
};


export const PersonHome = () => {
    const { authenticated } = PersonUiVm();

    return (
        <div>
            {authenticated ? (
                <GlobalUiContextProvider>
                    <HomeContents />
                </GlobalUiContextProvider>
            ) : (
                <AlertCard
                    type="error"
                    text="Accès interdite !! veuillez vous reconnecter"
                />
            )}
        </div>
    );
};