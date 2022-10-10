import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {  EditorState, convertToRaw, convertFromRaw, ContentBlock, ContentState, convertFromHTML, RawDraftContentState  } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
const ReadNotes = (props) => {
  const id = props.id
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
    const getNote = async () => {
        const note = await axios.get(`/note?id=${id}`).then(repsonse => repsonse.data)
        console.log(JSON.parse(note.content).blocks)
        console.log(convertFromRaw(JSON.parse(note.content))._map)
        setEditorState(ContentState.createFromBlockArray(convertFromRaw(JSON.parse(note.content))._map))
        // return note
    }
    useEffect(() => {
      getNote()
  },[])

  const saveNote = () => {
    axios.post("/notes", {
      content: convertToRaw(editorState.getCurrentContent()),
      title: "Siemaaa"
    })
  }
  return (
    <>
      <div style={{ border: "1px solid black", padding: '2px' }}>
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