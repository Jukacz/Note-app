import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './App.css';
const App = () => {
    const [notes, setNotes] = useState([])
    const toNote = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const getProfile = await axios.get("/notes").then(response => response.data)
            console.log(getProfile)
            setNotes(getProfile)
        }
        fetchData()
    }, [])
    return (
        <>
            <h1 className="text-align-center">Witamy w Stronach Notatkach </h1>
            {notes.map((note, index) => {
                return (
                    <div key={index}>
                        <h1>{note.name}</h1>
                        <p>{note.note.substring(0, 100)}...</p>
                        <button className="btn btn-go" onClick={() => toNote(`/note/${note.id}`)}>Do Notatki!</button>
                    </div>
                )
            })}
        </>
    )
}
export default App