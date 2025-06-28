import express from 'express'
import 'dotenv/config'      // to load environment variables from .env file automatically when the app starts
import authRoutes from './routes/auth.route.js'  // import auth routes
import { connectDB } from './lib/db.js'
const app = express()
const PORT = process.env.PORT

app.use(express.json());  // to parse JSON request body

app.use('/api/auth',authRoutes);        // import auth routes

app.listen(PORT , () => {
    console.log (`server is running on port: ${PORT}`);
    connectDB();
})

