import React from 'react'

/**
 * SearchForm component that renders a form with an input field and a submit button.
 * @param {Object} props - The props object containing img, handleFormSubmit and handleInputChange.
 * @returns {JSX.Element} - A JSX element representing the SearchForm component.
 */
const SearchForm = ({ img, handleFormSubmit, handleInputChange }) => {
  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex justify-center items-center gap-2 py-4 mt-4'>
      <input
        id='searchInput'
        className='default-input'
        type='text'
        placeholder='Search Anything...'
        value={img}
        onChange={handleInputChange}
      />
      <button type='submit' className='btn btn-primary'>
        Search
      </button>
    </form>
  )
}

export default SearchForm
