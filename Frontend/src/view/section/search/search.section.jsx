import React from 'react'
import { SearchViewModel } from '../../../viewmodel/section-vm/search.vm'

const SearchSection = ({prompt}) => {
  
  SearchViewModel(prompt)
  
  return (
    <div>Value to search is : {prompt}</div>
  )
}

export default SearchSection