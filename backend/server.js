const express = require('express')
const cors = require('cors') // Import the cors middleware
const { GoogleGenerativeAI } = require('@google/generative-ai')
const apiKey = 'AIzaSyC6TwzotMusHg4SCS6Ay26_ZDr8njwYuXk' // ***NEVER PUSH THIS TO GIT!!!***

const app = express()
const port = 3001 // Or any port you prefer

app.use(cors()) // Enable CORS for all origins (for development - restrict in production)
app.use(express.json()) // Parse JSON request bodies

app.post('/generate-content', async (req, res) => {
  try {
    const prompt = req.body.prompt
    console.log(prompt) // Get the prompt from the request body
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' })

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 30,
      responseMimeType: 'text/plain',
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    })

    const result = await chatSession.sendMessage(prompt)
    const responseText = result.response.text()
    console.log(responseText)
    res.json({ response: responseText }) // Send the AI response back to the client
  } catch (error) {
    console.error('Error generating content:', error)
    res.status(500).json({ error: 'Failed to generate content' })
  }
})

app.listen(port, () => {
  console.log(`Backend proxy listening at http://localhost:${port}`)
})
