import { useState } from 'react'
import { v4 as uuidv4 } from "uuid"

export default function CreateTodo ({user, dispatch}) {
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    
    function handleTitle (evt) { setTitle(evt.target.value) }
    function handleDescription (evt) { setDescription(evt.target.value) }
    function handleCreate () {
   
   

    
}   
    return (

    <form onSubmit={e => {e.preventDefault(); dispatch({ type: "TODO_CREATE", title, description, author: user, created: (new Date(Date.now())).toString(), id: uuidv4() });
    }}>    
    <div>Author: <b>{user}</b></div>
    <div>
    <label htmlFor="create-title">Title:</label>
    <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
    </div>
    <textarea value={description} onChange={handleDescription} />
    <input type="submit" value="Create" disabled={title.length === 0}/>
    </form>
    )
}