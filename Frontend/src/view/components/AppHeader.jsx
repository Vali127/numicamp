import { Search } from "lucide-react";
import numicamp from "../../assets/images/numicamp.png";
import { UserProfile } from "./account/UserProfile.jsx";
import {useGlobalUiContext} from "../../context/ui.context.jsx";

export const AppHeader = ({ userInfo, setSection, searchContent, setSearchContent, searched, setSearched }) => {

    const { searchExpanded, setSearchExpanded, userType } = useGlobalUiContext()

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchContent !== "") { setSection("search"); setSearched(!searched); }
    };

    return (
        <div className="w-full">
            <div className="flex h-10 w-full gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                    <UserProfile profile={userInfo.photo_profil || numicamp} setSection={setSection} />
                    <img src={numicamp} alt="numicamp" className="w-8 sm:w-10" />
                    <div className="font-bold text-indigo-500 text-2xl sm:text-3xl md:text-[34px] big-title whitespace-nowrap">
                        Numicamp
                    </div>
                </div>

                {
                    userType === "organisational" ?
                        <div className="pr-3 hidden md:block">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="relative">
                                    <input
                                        value={searchContent}
                                        onChange={(e) => setSearchContent(e.target.value)}
                                        type="text"
                                        className="text_input input__shadow rounded-2xl w-[25vw] pr-10 py-2 px-4"
                                        placeholder="rechercher ici ..."
                                        autoFocus
                                    />
                                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Search className="text-gray-700 w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        : <div></div>
                }
                <button
                    onClick={() => setSearchExpanded(!searchExpanded)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                    aria-label="Toggle search">
                    <Search className="text-gray-700 w-5 h-5"/>
                </button>
            </div>

            {searchExpanded && (
                <div className="mt-3 pb-2">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                            <input
                                value={searchContent}
                                onChange={(e) => setSearchContent(e.target.value)}
                                type="text"
                                className="text_input input__shadow rounded-2xl w-full pr-10 py-2 px-4"
                                placeholder="rechercher ici ..."
                                autoFocus
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Search className="text-gray-700 w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};