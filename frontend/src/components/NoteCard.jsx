import { Link, Navigate } from 'react-router-dom';
import React from 'react'
import { Trash2Icon } from 'lucide-react';
import { PenSquareIcon } from 'lucide-react';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';




function NoteCard({note,setNotes}) {

    const handleDelete = async (e,id) => {
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete this note? This action cannot be undone.")){
            return; // Exit if user cancels the deletion
        }
        
        try{
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully!");
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Update the notes state to remove the deleted note
            
        }
        catch(error){
            console.error("Error deleting note:", error);
            if(error.response && error.response.status === 429) {
                toast.error("Slow down! You're deleting notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to delete note");
            }
        }

    }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border border-solid border-[#00FF9D]'>
        <div className='card-body'>
            <h3 className='card-title text-based-content'>{note.title}</h3>
            <p className='text-base-content/70 lime-clamp-3 '>{note.content}</p>
            <div className='card-actions justify-between mt-4'>
                <span>{}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'  />
                    <button className='btn btn-ghost btn-sm text-error hover:bg-error/10' onClick={(e)=>handleDelete(e,note._id)}>
                        <Trash2Icon className='size-4 ' />
                    </button>

                </div>
            </div>

        </div>
    </Link>
  )
}

export default NoteCard
