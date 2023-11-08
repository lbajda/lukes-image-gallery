import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'

/**
 * Renders a search form component.
 * @param {Object} props - The props object.
 * @param {string} props.searchTerm - The search term value.
 * @param {function} props.handleFormSubmit - The function to handle form submission.
 * @param {function} props.handleInputChange - The function to handle input change.
 * @param {function} props.handleClear - The function to handle clear button click.
 * @returns {JSX.Element} - The search form component.
 */
function SearchForm({
  searchTerm,
  handleFormSubmit,
  handleInputChange,
  handleClear,
}) {
  const isSearchTermEmpty = searchTerm === ''

  return (
    <div className='relative px-6 py-16 self-stretch'>
      <form
        onSubmit={handleFormSubmit}
        className='flex w-full max-w-lg mx-auto gap-x-4'>
        <label htmlFor='searchInput' className='sr-only'>
          Search for an image
        </label>
        <input
          id='searchInput'
          className='default-input flex-auto w-full'
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          placeholder='Search Anything...'
        />
        <button type='submit' className='btn btn-primary'>
          Search
        </button>
        {isSearchTermEmpty ? null : (
          <button
            type='button'
            onClick={handleClear}
            className='btn btn-secondary p-2.5'>
            <ClearIcon fontSize='medium' />
          </button>
        )}
      </form>
    </div>
  )
}

export default SearchForm
