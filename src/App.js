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
          <div className='flex items-center justify-end w-full px-4 mt-3'>
            <a
              href='https://github.com/lbajda/lukes-image-gallery'
              className='text-slate-800 text-xs flex justify-center items-center gap-2 border border-slate-800 rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white transition-colors duration-300 ease-in-out'
              target='_blank'>
              <span>View on Github</span>
              <svg
                className='w-5 h-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 98 96'>
                <g clip-path='url(#a)'>
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052 3.9821-1.0773 8.0888-1.6254 12.214-1.63 4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0Z'
                    clip-rule='evenodd'
                  />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h98v96H0z' />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
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
