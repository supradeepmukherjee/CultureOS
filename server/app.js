import cors from 'cors'
import dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'
import { errorMiddleware } from './middlewares/error.js'
import routes from './routes/order.routes.js'

dotenv.config({ path: './.env' })

const envMode = process.env.NODE_ENV.trim() || 'PRODUCTION'

const app = express()

app.use(json({ limit: '50mb' }))
app.use(urlencoded({ limit: '50mb', extended: true }))
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:4173',
        process.env.CLIENT_URL,
    ],
}))

app.use('/api', routes)

app.use(errorMiddleware)

export { envMode }
export default app