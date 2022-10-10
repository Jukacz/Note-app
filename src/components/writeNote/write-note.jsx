import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
const WriteNote = () => {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const saveNote = () => {
    axios.post("/notes", {
      content: convertToRaw(editorState.getCurrentContent()),
      title: "Siemaaa"
    })
  }
  useEffect(() => {
    const fajnie = convertToRaw(editorState.getCurrentContent())
    console.log(fajnie)
  }, [editorState]);
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

export default WriteNote