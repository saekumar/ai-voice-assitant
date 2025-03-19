import axios from 'axios'

const newsapi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': 'b8abf97cf84d49bf9d01d14054efc5a3',
  },
})

export const getTopHeadlines = async (params) => {
  try {
    const response = await newsapi.get('/top-headlines', { params })
    return response.data.articles
  } catch (error) {
    console.error('Error fetching top headlines:', error)
    return []
  }
}

export const getEverything = async (params) => {
  try {
    const response = await newsapi.get('/everything', { params })
    return response.data.articles
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export const getSources = async (params) => {
  try {
    const response = await newsapi.get('/sources', { params })
    return response.data.sources
  } catch (error) {
    console.error('Error fetching sources:', error)
    return []
  }
}
