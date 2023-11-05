import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { debounce } from 'lodash'
import Image from './components/Image'
import SearchForm from './components/SearchForm'

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
          page: prevState.page + 1,
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
          <SearchForm
            img={state.img}
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
          />
          <div className='grid grid-cols-3 gap-4'>
            {state.res.map((val) => (
              <Image
                key={val.id}
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
