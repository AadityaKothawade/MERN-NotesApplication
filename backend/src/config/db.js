import mongoose from 'mongoose';

// mongodb+srv://aadityakothawade72:6qBxSH4OPcD6iJEx@cluster0.lqqnsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

