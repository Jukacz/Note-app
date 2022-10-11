import React, { useEffect, useState } from "react";
import "./write-note.css"
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Header from "../../components/header/header";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
const WriteNote = (props) => {
  const idOfSiema = props.id === "new-note" ? false : props.id 
  const [oldText, setoldText] = useState("")
  const [created, setCreated] = useState(() => idOfSiema !== false)
  const [id, setId] = useState(() => idOfSiema ? props.id : 0)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // let created = false
  useEffect(() => {
    const getNote = async () => {
      if (idOfSiema) {
        const note = await axios.get(`/note?id=${idOfSiema}`).then(repsonse => repsonse.data)
        setEditorState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(note.content))))
      }
    }
    getNote()
  }, [])
  useEffect(() => {
    console.log(id)
    if (id !== 0) {
      window.history.pushState({}, null, `/note/${id}`)
    }
  }, [id])


  const saveNewNote = async () => {
    console.log(idOfSiema);
    console.log(created)
    if (!created && !idOfSiema) {
      await axios.post("/notes", {
        content: convertToRaw(editorState.getCurrentContent()),
        title: "Siemaaa"
      }).then((res) => setId(res.data))
      setCreated(true)
    }
    else {
      // console.log()
      if (JSON.stringify(editorState.getCurrentContent()) !== oldText) {
        setoldText(JSON.stringify(editorState.getCurrentContent()))
        axios.patch(`/note?id=${id}`, {
        content: convertToRaw(editorState.getCurrentContent()),
        title: "Siemaaa"
      })
    }
    }
  }
  return (
    <>
      <Header />
      <div style={{ padding: '2px', height: "100%" }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onBlur={() => saveNewNote()}
        />
      </div>
      {/* <button type="button" onClick={() => saveNote()}>Zapisz notate</button> */}
    </>
  );
}
export default WriteNote