import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random")
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error("Error fetching affirmation:", err)
    res.status(500).json({ error: "Failed to fetch affirmation" })
  }
})

export default router
