
import React from 'react'

const SearchTab = ({currentTab, setCurrentTab}) => {
  return (
    <div className='flex gap-2'>
      
      <button
        onClick={() => { setCurrentTab("posts") }} 
        className={(currentTab === "posts") ? 'tab-active' : 'tab'}>
        Publications
      </button>
      
      <button 
        onClick={() => { setCurrentTab("users") }}
        className={(currentTab === "users") ? 'tab-active' : 'tab'}>
        Utilisateurs
      </button>
      
      <button 
        onClick={() => { setCurrentTab("organisations") }}
        className={(currentTab === "organisations") ? 'tab-active' : 'tab'}>
        Organisations
      </button>
    
    </div>
  )
}

export default SearchTab