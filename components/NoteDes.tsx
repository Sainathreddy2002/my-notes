/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import axios from 'axios'
import { BASE_URL } from '@/constants'
import Cookies from 'universal-cookie'
import DeleteComponent from './DeleteComponent'


const NoteDes = ({ newNote, data, pageLoad, setPageLoad }: any) => {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const cookies = new Cookies();
    
    const onTitleChange = (e: any) => {
        setTitle(e.target.value)
    }
    const onNotesChange = (e: any) => {
        setNotes(e.target.value)
    }
    const onSave = () => {
        const payload = {
            noteData: notes,
            title: title,
        }
        axios.post(`${BASE_URL}/apiNotes/createNotes`, payload, { headers: { Authorization: `Bearer ${cookies.get("token")}` } })
            .then((res: any) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        setPageLoad(!pageLoad)
    }
    const onEditNotes = () => {
        const payload = {
            noteId: data.noteId,
            title,
            description: notes
        }
        axios.put(`${BASE_URL}/apiNotes/updateNotes`, payload, { headers: { Authorization: `Bearer ${cookies.get("token")}` } })
            .then((res: any) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        setPageLoad(!pageLoad)
    }
    useEffect(() => {
        if (newNote) {
            setTitle("New Note")
            setNotes("Write something....")
        } else if (data) {
            setTitle(data.title)
            setNotes(data.description)
        }
    }, [newNote, data])
    return (
        <div className='text-xl flex-1 flex-col h-5/6 w-full'>
            <div style={{ display: "flex", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%",}}>
                <Input className='bg-slate-300 w-full dark:bg-[#1C1A27] text-xl mb-4' value={title} onChange={onTitleChange} />
                <DeleteComponent id={data?.noteId} pageLoad={pageLoad} setPageLoad={setPageLoad} />
            </div>
            <Textarea className='h-5/6 bg-slate-300 dark:bg-[#1C1A27] flex-1 rounded-xl mb-4' value={notes} onChange={onNotesChange} />
            <div className='flex-row flex-1 justify-end'>
                <Button onClick={newNote ? onSave : onEditNotes}>Save</Button>
            </div>
        </div>
    )
}

export default NoteDes