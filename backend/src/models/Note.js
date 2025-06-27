import mongoose, { Schema } from 'mongoose';
//1-craete schema 
// 2-model based on schema 

const noteSchema = new mongoose.Schema({
    title : {
        type:String,
        required: true
    },
    content :{
        type:String,
        required: true
    },
},{timestamp:true}
)

const Note = mongoose.model("Note",noteSchema)

export default Note