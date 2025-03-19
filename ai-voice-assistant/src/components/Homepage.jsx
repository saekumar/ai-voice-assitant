import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Settings } from 'lucide-react'
import VoiceAssistant from './VoiceAssistant'
import { getTopHeadlines, getEverything } from '../ai-modal/newsapi'
import { Link } from 'react-router-dom'

const Homepage = () => {
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
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Your AI Voice Assistant
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience the future of interaction with our intelligent voice
            assistant
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all">
              Get Started
            </button>
            <button className="border border-blue-400 hover:bg-blue-600/20 px-8 py-3 rounded-full font-semibold transition-all">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured News For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <Link to={`/news/${item.source.name}`} key={item.id}>
              <div className="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all flex flex-col h-full">
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow">
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

export default Homepage
