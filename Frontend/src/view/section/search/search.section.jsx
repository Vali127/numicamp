import React from 'react'
import { SearchViewModel } from '../../../viewmodel/section-vm/search.vm'
import SearchTab from './search.tab'
import PostTab from './post.tab'
import UserTab from './user.tab'
import OrgTab from './org.tab'
import {useGlobalUiContext} from "../../../context/ui.context.jsx";

const SearchSection = ({ prompt }) => {
    console.log("PROMPT RECU : ", prompt)
    const { searchExpanded } = useGlobalUiContext()
    const { currentTab, setCurrentTab, data } = SearchViewModel(prompt)

    return (
        <div className="text-left">
            <div className={ searchExpanded ? "sticky top-40 md:top-12 z-10 bg-neutral-50" : "sticky top-26 md:top-12 z-10 bg-neutral-50" }>
                <div className="flex items-center gap-2 flex-wrap text-base sm:text-lg mb-2 sm:mb-4">
                    <label className="icon_btn text-xl sm:text-2xl">&#xE30C;</label>
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-sm sm:text-base">Resultat pour :</span>
                        <b className='text-lg sm:text-xl md:text-2xl break-all'>{prompt}</b>
                    </div>
                </div>
                <div>
                    <SearchTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
                </div>
            </div>
            <div className='flex-1 rounded-lg overflow-hidden'>
                {currentTab === "posts" && data && <PostTab feeds={data.posts} />}
                {currentTab === "users" && data && <UserTab users={data.users} />}
                {currentTab === "organisations" && data && <OrgTab organisations={data.organisations} />}
            </div>
        </div>
    )
}

export default SearchSection