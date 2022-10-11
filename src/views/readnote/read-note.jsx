import React, { useEffect, useState } from "react";
import "./buy.css"
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw, } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import Header from "../../components/header/header";
const ReadNotes = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const getNote = async () => {
    const note = await axios.get(`/note?id=${id}`).then(repsonse => repsonse.data)
    setEditorState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(note.content))))
    // return note
  }
  useEffect(() => {
    getNote()
  }, [])
  const id = props.id
  const saveNote = () => {
    axios.patch(`/note?id=${id}`, {
      content: convertToRaw(editorState.getCurrentContent()),
      title: "Siemaaa"
    })
  }
  return (
    <>
      <Header />
      <div style={{ border: "1px solid black", padding: '2px', minHeight: "90%", maxHeight: "90%", overflow: "auto", background: "black " }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
      <button type="button" onClick={() => saveNote()}>Zapisz notate</button>
    </>
  );
}

export default ReadNotes