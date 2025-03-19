import { useContext, useEffect, useState } from 'react'
import './App.css'
import { DataContext } from './context/UserContext'
import Homepage from './components/Homepage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import LatestNewsComponent from './components/LatestNewsComponent'
// import SourcesComponent from './components/SourcesComponent'
import ChatComponent from './components/ChatComponent'
import NewsDetailComponent from './components/NewsDetailComponent'
import { getTopHeadlines } from './ai-modal/newsapi'

function App() {
  const [newsItems, setNewsItems] = useState([]) // Hold news items at the app level

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/latestnews" element={<LatestNewsComponent />} />
        {/* <Route path="/sources" element={<SourcesComponent />} /> */}
        <Route path="/chat" element={<ChatComponent />} />
        <Route
          path="/news/:id"
          element={<NewsDetailComponent newsItems={newsItems} />}
        />
      </Routes>
    </div>
  )
}

export default App
