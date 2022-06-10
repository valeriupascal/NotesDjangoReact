import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';

const NotePage = () => {
    
  let noteId = useParams().id
  let navigate = useNavigate();

  let [note, setNote] = useState(null)
  
  useEffect(() => {
    getNote()
  }, [noteId])


  let getNote = async () => {
      if(noteId === 'new') return;

      let response = await fetch(`/api/notes/${noteId}/`)
      let data = await response.json()
      setNote(data)
  }


  let createNote = async () => {
      fetch(`/api/notes/create/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })
  }



  let updateNote = async () => {
      fetch(`/api/notes/${noteId}/update/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })
  }


  let deleteNote = async () => {
      await fetch(`/api/notes/${noteId}/delete/`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigate('/')
  }


  let handleSubmit = async () => {
    if(noteId !== 'new' && !note.body){
      await deleteNote()
      await new Promise((resolve, reject) => setTimeout(resolve, 150));
    } else if(noteId !== 'new'){
      await updateNote()
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
    } else if(noteId === 'new' && note.body !== null) {
      await createNote()
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
    }
    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
            <ArrowLeft onClick={handleSubmit} />  
        </h3>
        {/* show delete button only if is not new. If its new show Done */}
        {noteId !== 'new' ? (
            <button onClick={deleteNote}><h3><DeleteIcon /></h3></button>
        ) : <button onClick={handleSubmit}>Done</button> }
        
      </div>
      <textarea onChange={(e) => {
        setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage