import express from 'express'
import 'dotenv/config'      // to load environment variables from .env file automatically when the app starts
import authRoutes from './routes/auth.route.js'  // import auth routes
import affirmationRoutes from './routes/affirmation.route.js'
import { connectDB } from './lib/db.js'
import cors from 'cors'  // to enable CORS for the API
import cookieParser from 'cookie-parser'  // to parse cookies in request
import geminiRoutes from './routes/gemini.route.js' // import gemini routes
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
app.use("/api/gemini", geminiRoutes);

app.listen(PORT , () => {
    console.log (`server is running on port: ${PORT}`);
    connectDB();
})

