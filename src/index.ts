import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { UserRoute, RoomRoute, MessageRoute } from './routes/'

const app = express()
dotenv.config()

// Middlewares
app.use(cors())
app.use(express.json())

const PORT   = process.env.PORT || 5000
const DB_URL = 'mongodb+srv://semargl:peryn555@cluster0.l30qd.mongodb.net/chat'

app.use('/api/auth', UserRoute) // Authentication
app.use('/api/room', RoomRoute) // Room acions
app.use('/api/messages', MessageRoute) // Message acions

const start = () => {
   try {
      mongoose.connect(DB_URL, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: true,
         useUnifiedTopology: true
      })
      app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}

start()
