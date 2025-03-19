import React, { useContext } from 'react'
import { DataContext } from '../context/UserContext'
import { Mic, MicOff } from 'lucide-react'

const VoiceAssistant = () => {
  const {
    startListening,
    stopListening,
    transcript,
    speak,
    isListening,
    setIsListening,
  } = useContext(DataContext)

  const toggleListening = () => {
    setIsListening(!isListening)
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <button
      onClick={toggleListening}
      className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
        isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
      }`}
    >
      {isListening ? (
        <MicOff className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </button>
  )
}

export default VoiceAssistant
