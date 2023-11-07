import { useState, useCallback, useMemo, useEffect } from 'react'
import { fetchRandomImage, fetchImages } from './api'

/**
 * A custom hook for searching images using Unsplash API.
 * @returns {Object} An object containing searchTerm, images, handleFormSubmit, and handleInputChange.
 */
export const useImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [images, setImages] = useState([])
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY

  const headers = useMemo(
    () => ({
      Authorization: `Client-ID ${accessKey}`,
    }),
    [accessKey]
  )

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const images = await fetchImages(searchTerm, headers)
      setImages(images)
    },
    [searchTerm, headers]
  )

  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleClear = useCallback(async () => {
    setSearchTerm('')
    const image = await fetchRandomImage(headers)
    setImages(image)
  }, [headers])

  useEffect(() => {
    const fetchInitialImage = async () => {
      const image = await fetchRandomImage(headers)
      setImages(image)
    }
    fetchInitialImage()
  }, [headers])

  return {
    searchTerm,
    images,
    handleFormSubmit,
    handleInputChange,
    handleClear,
  }
}
