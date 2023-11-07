import React from 'react'
import GithubLink from './components/GithubLink'
import SearchForm from './components/SearchForm'
import ImageDisplay from './components/ImageDisplay'
import { useImageSearch } from './useImageSearch'

/**
 * Renders the main App component.
 * @returns {JSX.Element} The App component
 */
function App() {
  const {
    searchTerm,
    images,
    handleFormSubmit,
    handleInputChange,
    handleClear,
  } = useImageSearch()

  return (
    <div>
      <div className='container mx-auto'>
        <div className='flex items-center justify-center flex-col'>
          <GithubLink />
          <SearchForm
            searchTerm={searchTerm}
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
            handleClear={handleClear}
          />
          <div className='flex flex-wrap gap-4 px-6'>
            <ImageDisplay images={images} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(App)
