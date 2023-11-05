import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { debounce } from 'lodash'

const Image = React.memo(({ src, alt }) => (
  <div>
    <img className='img-cover aspect-[3/4]' src={src} alt={alt} />
  </div>
))

/**
 * The main component of the image gallery app.
 * @returns {JSX.Element} The App component
 */
const App = () => {
  const [state, setState] = useState({
    img: '',
    res: [],
    hasMore: true,
    page: 1,
  })

  const url = useMemo(() => {
    return state.img
      ? `https://api.unsplash.com/search/photos?page=${state.page}&per_page=6&query=${state.img}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      : `https://api.unsplash.com/photos/random?count=6&page=${state.page}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&auto=format`
  }, [state.img, state.page])

  const fetchData = useCallback(
    async (url) => {
      const data = await fetch(url)
      const dataJ = await data.json()
      const result = state.img ? dataJ.results : dataJ
      if (result.length) {
        setState((prevState) => ({
          ...prevState,
          res: [...prevState.res, ...result],
        }))
      } else {
        setState((prevState) => ({ ...prevState, hasMore: false }))
      }
    },
    [state.img]
  )

  useEffect(() => {
    fetchData(url).catch((error) =>
      console.error('Failed to fetch data:', error)
    )
  }, [url, fetchData])

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData])

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const img = e.target.elements[0].value
      if (!img) {
        console.error('Image value is required')
        return
      }
      setState({ img, res: [], hasMore: true, page: 1 })
      debouncedFetchData(url)
    },
    [debouncedFetchData]
  )

  const handleInputChange = useCallback(
    (e) => {
      setState({ ...state, img: e.target.value })
    },
    [state]
  )

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex items-center justify-center flex-col'>
          <form
            onSubmit={handleFormSubmit}
            className='flex justify-center items-center gap-2 py-4 mt-4'>
            <input
              id='searchInput'
              className='default-input'
              type='text'
              placeholder='Search Anything...'
              value={state.img}
              onChange={handleInputChange}
            />
            <button type='submit' className='btn btn-primary'>
              Search
            </button>
          </form>
          <div className='grid grid-cols-3 gap-4'>
            {state.res.map((val, index) => (
              <Image
                key={`${val.id}-${index}`}
                src={val.urls.small}
                alt={val.alt_description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
