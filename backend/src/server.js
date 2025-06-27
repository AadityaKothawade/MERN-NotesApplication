import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';
import path from 'path';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON request bodies
if(process.env.NODE_ENV !== 'production') {
    app.use(cors({
    origin :"http://localhost:5173"
    }));
}

app.use(rateLimiter)


app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get(/^\/(?!api).*/, (req, res) => {
         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });

}


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('Server is running on port ', PORT);
    });
});
 


