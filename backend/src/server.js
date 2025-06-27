import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors({
    origin :"http://localhost:5173"

}));
app.use(rateLimiter)


app.use("/api/notes", notesRoutes);
 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('Server is running on port ', PORT);
    });
});
 


//mongodb+srv://aadityakothawade72:6qBxSH4OPcD6iJEx@cluster0.lqqnsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0