import React from 'react'
import { SearchViewModel } from '../../../viewmodel/section-vm/search.vm'
import SearchTab from './search.tab'
import PostTab from './post.tab'
import UserTab from './user.tab'
import OrgTab from './org.tab'

const SearchSection = ({prompt}) => {
  
  const {
    currentTab,
    setCurrentTab,
    data
  } = SearchViewModel(prompt)
  
  return (
    <div className='mx-2 h-full flex flex-col gap-2'>
      <SearchTab
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}/>
      
      <div className='flex-1 overflow-scroll scrollbar-none rounded-lg'>
        { (currentTab === "posts") && (data) && <PostTab feeds={data.posts} /> }
        { (currentTab === "users") && (data) && <UserTab users={data.users} /> }
        { (currentTab === "organisations") && (data) && <OrgTab organisations={data.organisations}/> }
      </div>
    
    </div>
  )
}

export default SearchSection