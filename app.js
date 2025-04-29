import express from 'express'
import { PORT } from './config/env.js'
import authRouter  from './routes/auth.routes.js'
import todoRouter from './routes/todo.routes.js'
import ConnectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter) // http://api/auth/sign-in or http://api/auth/sign-up
app.use('/api/notes', todoRouter) // http://api/notes/ here we have four different methods 

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Sever running on port: ${PORT}`) 
    
   await ConnectToDatabase()
})