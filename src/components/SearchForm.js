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
  return (
    <div className='relative isolate overflow-hidden py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none '>
          <div className='max-w-xl lg:max-w-lg mx-auto'>
            <form onSubmit={handleFormSubmit} className='flex max-w-md gap-x-4'>
              <label htmlFor='searchInput' className='sr-only'>
                Search for an image
              </label>
              <input
                id='searchInput'
                className='default-input'
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Search Anything...'
              />
              <button type='submit' className='btn btn-primary'>
                Search
              </button>
              <button
                type='button'
                onClick={handleClear}
                className='btn btn-secondary p-2.5'>
                <ClearIcon fontSize='medium' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
