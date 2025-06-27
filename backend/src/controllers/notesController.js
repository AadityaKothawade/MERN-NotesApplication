import Note from "../models/Note.js"

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find({})
        res.status(200).json(notes)
    }
    catch(error){
        console.error("Error is ",error);
        res.status(500).json({message:"Internal sever error"});
    }
}

export async function getNotesById(req, res) {
    try{
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(note);
    }
    catch(error) {
        console.error("Error is ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
     try{
        const {title,content} = req.body;
        const newNote = new Note({title,content})

        await newNote.save()

        res.status(201).json({
            message: "Note created successfully"
        });

     }
     catch(error) {
         console.error("Error is ", error);
         res.status(500).json({ message: "Internal server error" });
     }

}


export async function updateNote(req, res) {
    try{
        const {title,content} = req.body;
        const {id} =req.params;
        const updateNote = await Note.findByIdAndUpdate(id,{title,content},{new:true});
        if(!updateNote){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            message: "Note updated successfully"
        });
    }
    catch (error) {
        console.error("Error is ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
    try{
        const {id} = req.params;
        const deletedNode = await Note.findByIdAndDelete(id);
        if (!deletedNode) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            message: "Note deleted successfully"
        });
    }
    catch (error) {
        console.error("Error is ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


 