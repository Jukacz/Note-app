import axios from "axios"
import React from "react"
const WriteNote = () => {
    const nameOfNote = React.createRef()
    const noteText = React.createRef()
    const saveNote = (name, text) => {
        axios.post('/notes', {
            name: name,
            note: text
        })
    }
    return (
        <>
            <p>Nazwa Notatki</p>
            <input ref={nameOfNote} type="text" />
            <textarea ref={noteText} name="notatk" cols="30" rows="10"></textarea>
            <button className="save-note" onClick={() => saveNote(nameOfNote.current.value, noteText.current.value)}>Zapisz notatke</button>
        </>
    )
}

export default WriteNote