import React from 'react'

const SearchTab = ({currentTab, setCurrentTab}) => {
    const tabs = [
        { id: 'posts', label: 'Publications' },
        { id: 'users', label: 'Utilisateurs' },
        { id: 'organisations', label: 'Organisations' }
    ]

    return (
        <div className='flex gap-2 sm:gap-3 overflow-x-auto scrollbar-none pb-1'>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`
            ${currentTab === tab.id ? 'tab-active' : 'tab'}
            whitespace-nowrap text-sm sm:text-base px-3 sm:px-4 md:px-6 flex-shrink-0
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export default SearchTab