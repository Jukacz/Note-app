import React, { useEffect, useState } from "react"
const App = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getProfile = await fetch("/tak")
            const profile = await getProfile.json()
            console.log(profile)
        }
        fetchData()
    }, [])
    return (
        <>
            <h1>Witamy w Stronach Notatkach </h1>
        </>
    )
}
export default App