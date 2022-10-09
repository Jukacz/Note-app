import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const ReadNotes = (props) => {
    const id = props.id;
    const [noteText, setnoteText] = useState("")
    useEffect(() => {
        const getNote = async () => {
            const note = await axios.get(`/note?id=${id}`).then(repsonse => repsonse.data)
            setnoteText(note.content)
        }
        getNote()
    })
    return (
        <>
            <h1>Ja nie jestem takim fanem {id}</h1>
            <p>{noteText}</p>
            <Link to="/">Menu główne</Link>
        </>
    )
}

export default ReadNotes