import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Configs/dbConfig'
import UserRoutes from './Routes/userRoutes'
import SoundscapeRoutes from './Routes/soundScapeRoutes'

//load env from .env
dotenv.config()
const app = express()

//connect to database
connectDB()
const port = process.env.PORT || 3000

//middleware to handle cors
app.use(cors({
  origin: 
    "https://citysoundscape-frontend.onrender.com",
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user/', UserRoutes)
app.use('/soundscape/', SoundscapeRoutes)

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(port, () => {
  console.log(`Backend server conneted at port ${port}`)
})