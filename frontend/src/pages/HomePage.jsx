import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import {useState} from 'react'
import RateLimitUi from '../components/RateLimitUi'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'


function HomePage() {

   const [isRateLimited, setIsRateLimited] = React.useState(false);
   const [notes,setNotes] = React.useState([]);
   const [loading, setLoading] = React.useState(false);

   useEffect(()=>{
        const fetchNotes = async()=>{
            try{
                // axios.get("http://localhost:3000/api/notes")
                const res = await api.get("/notes")
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            }
            catch(error){
                console.error("Error fetching notes:", error);
                if(error.response && error.response?.status === 429) {
                    setIsRateLimited(true);
                }
                else{
                    toast.error("Failed to fetch notes. Please try again later.");
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchNotes();
   },[])


  return (
    <div className='min-h-screen '>

      <Navbar/>
      {isRateLimited && <RateLimitUi/>}

       <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className="text-center text-lg text-gray-500">Loading notes...</div>}

            {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
            {notes.length>0 && !isRateLimited &&(
                <div className='grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-6'>
                    {notes.map((note)=>{
                        return <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    })}
                </div>

            )}
       </div>   

    </div>
  )
}

export default HomePage
