import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const NewsDetailComponent = ({ newsItems }) => {
  const { id } = useParams() // Access the news ID from the URL
  const navigate = useNavigate()

  // Find the news item based on the ID in the source object
  const newsItem = newsItems.find((item) => item.source.name === id)

  console.log(newsItems)
  console.log(newsItem)

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">News Item Not Found</h2>
          <p className="text-gray-400">
            Sorry, the news item with ID {id} could not be found.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
        <div className="flex items-center mb-4">
          <span className="text-gray-400 mr-2">
            Source: {newsItem.source.name}
          </span>
          <span className="text-gray-400">
            Published At: {new Date(newsItem.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <img
          src={newsItem.urlToImage}
          alt={newsItem.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-300 leading-relaxed mb-4">
          {newsItem.description}
        </p>
        <a
          href={newsItem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Read Full Article
        </a>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default NewsDetailComponent
