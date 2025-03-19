import React, { createContext, useState, useEffect, useRef } from 'react'
import run from '../ai-modal/gemini' // Assuming this is your Gemini API call
import { useNavigate } from 'react-router-dom' // Import useNavigate

export const DataContext = createContext()

const UserContext = ({ children }) => {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [aiResponseText, setAiResponseText] = useState('') // Store AI response
  const navigate = useNavigate() // Initialize useNavigate
  const timeoutIdRef = useRef(null) // Ref to store the timeout ID

  const aiResponse = async (prompt) => {
    try {
      const lowerCasePrompt = prompt.toLowerCase()

      if (lowerCasePrompt.includes('latest news')) {
        setAiResponseText('Navigating to the latest news.')
        speak('Navigating to the latest news.')
        navigate('/latestnews')
      } else if (
        lowerCasePrompt.includes('homepage') ||
        lowerCasePrompt.includes('go home')
      ) {
        setAiResponseText('Navigating home.')
        speak('Navigating home.')
        navigate('/')
      } else if (lowerCasePrompt.includes('sources')) {
        setAiResponseText('Navigating to sources.')
        speak('Navigating to sources.')
        navigate('/sources')
      } else if (lowerCasePrompt.includes('chat')) {
        setAiResponseText('Navigating to chat.')
        speak('Navigating to chat.')
        navigate('/chat')
      } else if (lowerCasePrompt.includes('news')) {
        console.log('yess it includes news')
        console.log(lowerCasePrompt)

        const match = lowerCasePrompt.match(/news(?: about| on| for)? (.+)/)
        console.log(match)

        if (match && match[1]) {
          const newsTitleLowerCase = match[1].trim() // Title in lowercase
          console.log(newsTitleLowerCase)

          // Re-extract the title from the original (non-lowercased) prompt
          const originalMatch = prompt.match(
            new RegExp(`news(?: about| on| for)? (.+)`, 'i')
          ) // 'i' flag for case-insensitive match
          const newsTitle =
            originalMatch && originalMatch[1]
              ? originalMatch[1].trim()
              : newsTitleLowerCase //Use the lower case version if we cant find the title in the original prompt
          console.log('Original Title:', newsTitle)

          const encodedTitle = encodeURIComponent(newsTitle)
          setAiResponseText(`Searching for news about ${newsTitle}.`)
          speak(`Searching for news about ${newsTitle}.`)
          navigate(`/news/${encodedTitle}`)
        } else {
          setAiResponseText(
            "I understand you're asking for news, but please specify the topic or source."
          )
          speak(
            "I understand you're asking for news, but please specify the topic or source."
          )
        }
      } else {
        // Generic Gemini response for other queries

        try {
          const response = await fetch(
            'http://localhost:3001/generate-content',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: prompt }),
            }
          )

          if (!response.ok) {
            const errorData = await response.json() // Try to get more specific error info
            const errorMessage =
              errorData?.message || `HTTP error! Status: ${response.status}`
            throw new Error(errorMessage)
          }

          const data = await response.json()
          setAiResponseText(data.response)
          speak(data.response)
          console.log('AI Response:', data.response)
        } catch (error) {
          console.error('Error fetching AI response from Gemini:', error)
          setAiResponseText(
            'Sorry, I encountered an error while communicating with the AI.'
          )
          speak(
            'Sorry, I encountered an error while communicating with the AI.'
          )
        }
      }
    } catch (error) {
      // This catch block is for errors within the outer try block.  This primarily deals with errors in the initial prompt handling and navigation. The inner try/catch handles the Gemini API calls.
      console.error('Error during voice command processing:', error)
      setAiResponseText(
        'Sorry, I encountered a problem processing your command.'
      )
      speak('Sorry, I encountered a problem processing your command.')
    }
  }

  const speak = (text) => {
    const text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume = 1
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.lang = 'en-US'
    window.speechSynthesis.speak(text_speak)
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  let recognition = null
  if (SpeechRecognition) {
    recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true // Keep interim results
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const currentResult =
        event.results[event.results.length - 1][0].transcript // Get current transcript
      console.log('Interim Speech recognition result:', currentResult)
      setTranscript(currentResult)

      // Clear any existing timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }

      // Set a new timeout to process after 3 seconds of silence
      timeoutIdRef.current = setTimeout(() => {
        console.log('Processing final transcript:', currentResult)
        aiResponse(currentResult) // Send to Gemini after the delay
      }, 3000) // 3000 milliseconds = 3 seconds
    }

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error)
      if (event.error === 'no-speech') {
        console.warn('No speech detected. Please try again.')
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      console.log('Speech recognition ended.')
      // Clear timeout on recognition end, just in case
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  } else {
    console.warn('Speech Recognition is not supported in this browser.')
  }

  const startListening = () => {
    if (recognition) {
      recognition.start()
      setIsListening(true)
      console.log('Speech recognition started...')
    } else {
      console.warn('Speech recognition not initialized.')
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
      console.log('Speech recognition stopped.')
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current) // Clear the timeout if it's running
      }
    } else {
      console.warn('Speech recognition not initialized.')
    }
  }

  const value = {
    speak,
    startListening,
    stopListening,
    transcript,
    isListening,
    aiResponseText,
    setIsListening,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default UserContext
