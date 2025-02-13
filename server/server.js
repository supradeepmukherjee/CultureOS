import app from './app.js'
import { connectDB } from './util.js'

connectDB(process.env.MONGO_URI)

app.listen(process.env.PORT, () => console.log(process.env.PORT))