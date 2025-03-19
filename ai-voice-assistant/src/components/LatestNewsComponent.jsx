import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Settings } from 'lucide-react'
import VoiceAssistant from './VoiceAssistant'
import { getTopHeadlines, getEverything } from '../ai-modal/newsapi'
import { Link } from 'react-router-dom'

const LatestNewsComponent = () => {
  const [newsItems, setNewsItems] = useState([])

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      const articles = await getTopHeadlines({
        country: 'us',
        category: 'sports',
        language: 'en',
      })
      setNewsItems(articles)
      console.log(articles)
    }
    fetchTopHeadlines()
  }, [])
  const [isListening, setIsListening] = useState(false)

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured News For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <Link to={`/news/${item.source.name}`}>
              <div
                key={item.id}
                className="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all"
              >
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-blue-400">
                    {item.source.name}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <VoiceAssistant />
    </div>
  )
}

export default LatestNewsComponent
