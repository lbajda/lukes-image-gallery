import axios from 'axios'

export const fetchRandomImage = async (headers) => {
  const url = `https://api.unsplash.com/photos/random`
  const response = await axios.get(url, { headers })
  return [response.data]
}

export const fetchImages = async (searchTerm, headers) => {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&per_page=7`
  const response = await axios.get(url, { headers })
  return response.data.results
}
