import express from 'express'
import 'dotenv/config'      // to load environment variables from .env file automatically when the app starts
import authRoutes from './routes/auth.route.js'  // import auth routes
const app = express()
const PORT = process.env.PORT

app.use('/api/auth',authRoutes);        // import auth routes

app.listen(PORT , () => {
    console.log (`server is running on port: ${PORT}`);
})

