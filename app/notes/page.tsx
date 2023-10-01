'use client'
import NoteCard from '@/components/NoteCard'
import NoteDes from '@/components/NoteDes'
import { ModeToggle } from '@/components/menutoggle'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const Notes = () => {
  const [addNew,setAddNew] = useState(false)
  const [noteData,setNoteData] = useState<any>();
  const [notes,setNotes] = useState<any>([]);
  const [pageLoad,setPageLoad] = useState(false)
  const onAddNew = () =>{
    setAddNew(true)
  }
  const handleNoteClick = (note:any)=>{
      setAddNew(false)
      setNoteData(note)
  }
  const getAllNotes = ()=>{
    axios.get(`${BASE_URL}/apiNotes/getAllNotes`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    .then((res:any)=>{
     setNotes(res.data)
     if(res.data.length>0){
      setNoteData(res.data[0])
     }
    }
    )
    .catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    getAllNotes()
  },[pageLoad])
  return (
    <div className="flex flex-col p-10 font-mono flex-1 w-screen h-screen dark:bg-[#121212]">
      <div className='flex-row flex justify-between'>
      <div className='text-2xl'>
        Notes
      </div>
      <div className="flex justify-end" >
      <ModeToggle />
      </div>
      </div>
      <div className='flex-row flex justify-between w-full h-full m-1'>
        <div className='shadow-zinc-400 bg-slate-300  rounded-2xl shadow-lg m-10 p-4 w-1/3 dark:shadow-white dark:bg-[#1C1A27] '>
         <div className='text-xl flex-row items-center flex justify-between w-full'>
          <div>All Notes</div>
          <Button onClick={onAddNew}>Add New</Button>
         </div>
        {notes.length>0? notes.map((note:any)=>{
          return (
            <div key={note.noteId} className='border-2 border-[#908d96] p-1 m-[10px] rounded-md cursor-pointer flex-row flex-1 flex justify-between items-center' onClick={()=>{handleNoteClick(note)}}>
            <div>
            {note.title}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>
              Last updated 
              {" "+moment(note.updated_at).format('MMMM Do YYYY, h:mm a')}
            </div>
            </div>
          )
        }) 
        : null}
        </div>
        <div className='shadow-zinc-400 bg-slate-300 rounded-2xl shadow-lg m-10 p-4 w-2/3 dark:shadow-white dark:bg-[#1C1A27] flex-1 '>
        <div className='flex-1 h-full w-full'>
          <NoteDes newNote={addNew} data={noteData} pageLoad={pageLoad} setPageLoad={setPageLoad}  />
         </div>
        </div>
      </div>
    </div>
  )
}

export default Notes