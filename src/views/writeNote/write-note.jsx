import React, { useEffect, useState } from "react";
import "./write-note.css"
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Header from "../../components/header/header";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
const WriteNote = (props) => {
  const idOfSiema = props.id === "new-note" ? false : props.id ;
  const [oldText, setoldText] = useState("");
  const [created, setCreated] = useState(() => idOfSiema !== false);
  const [id, setId] = useState(() => idOfSiema ? props.id : 0);
  const [ready, setReady] = useState(() => idOfSiema === false ? true : false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const getNote = async () => {
      if (idOfSiema) {
        const note = await axios.get(`/note?id=${idOfSiema}`).then(repsonse => repsonse.data);
        setEditorState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(note.content))));
        setReady(true)
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
    if (!created && !idOfSiema) {
      await axios.post("/notes", {
        content: convertToRaw(editorState.getCurrentContent()),
        title: "Siemaaa"
      }).then((res) => setId(res.data));
      setCreated(true);
    }
    else {
      // console.log()
      if (JSON.stringify(editorState.getCurrentContent()) !== oldText) {
        setoldText(JSON.stringify(editorState.getCurrentContent()));
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
      {!ready &&
        <div className="backdrop">
          <span class="loader"></span>
        </div>      }
      <div style={{ padding: '2px', height: "100%" }}>
        {ready && 
        <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        onBlur={() => saveNewNote()}
      />
        }
      </div>
    </>
  );
}
export default WriteNote