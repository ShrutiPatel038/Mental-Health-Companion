import express from 'express'
import 'dotenv/config'      // to load environment variables from .env file automatically when the app starts
import authRoutes from './routes/auth.route.js'  // import auth routes
import affirmationRoutes from './routes/affirmation.route.js'
import geminiRoutes from './routes/gemini.route.js'  // import gemini routes
import challengeRoutes from './routes/challenge.route.js'; 
import journalRoutes from './routes/journal.route.js';  // import journal routes
import chatbotRoutes from './routes/chatbot.route.js'  // import chatbot routes
import thoughtsRoutes from './routes/thoughts.route.js'  // import thoughts route

import cors from 'cors'  // to enable CORS for the API
import cookieParser from 'cookie-parser'  // to parse cookies in request
import { connectDB } from './lib/db.js'

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true //allow frontend to send cookies
}));

app.use(express.json());  // to parse JSON request body
app.use(cookieParser());  // to parse cookies in request


app.use('/api/auth',authRoutes);        // import auth routes
app.use('/api/affirmation', affirmationRoutes);
app.use('/api/gemini',geminiRoutes);
app.use('/api/challenge',challengeRoutes);
app.use('/api/gratitude-journal', journalRoutes);
app.use('/api/chatbot',chatbotRoutes);  // import chatbot route
app.use('/api/thoughts', thoughtsRoutes) ; // placeholder for thoughts route
console.log("Routes initialized successfully");


app.listen(PORT , () => {
    console.log (`server is running on port: ${PORT}`);
    connectDB();
})

