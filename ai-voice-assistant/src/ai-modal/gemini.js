import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'

const apiKey = 'AIzaSyC6TwzotMusHg4SCS6Ay26_ZDr8njwYuXk'
console.log(apiKey)
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-8b',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
}

const run = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  })

  const result = await chatSession.sendMessage(prompt)
  console.log(result.response.text())
}

export default run
