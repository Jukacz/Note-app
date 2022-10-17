import React, { useEffect, useState } from "react"
import './App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/header/header";
import { Card } from "react-bootstrap";
const App = () => {
    const [notes, setNotes] = useState([])
    const toNote = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const getProfile = await axios.get("/notes").then(response => response.data)
            setNotes(getProfile)
        }
        fetchData()
    }, [])
    return (
        <>
            <Header />
            <h1 className="text-align-center">Witamy w Stronach Notatkach </h1>
            <div className="row-notes">
                {notes.map((note, index) => {
                    return (
                                <Card style={{ width: '18rem' }} onClick={() => toNote(`/note/${note.id}`)} key={index}>
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                    <Card.Title>{note.name}</Card.Title>
                                    <Card.Text>
                                    {note.note.substring(0, 100)}...
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                    )
                })}
            </div>
        </>
    )
}
export default App