import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import ReadNotes from "./components/readnote/read-note";
import App from "./components/index/app";
import Header from "./components/header/header";
import WriteNote from "./components/writeNote/write-note";
import Tak from "./spoko";



function RoutesMenu() {

  const ReadNote = () => {
    let { id } = useParams();
    return <ReadNotes id={id} />
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/write-note' element={<WriteNote />} />
          <Route path="/spoko" element={<Tak />} />
          <Route path="/note/:id" element={<ReadNote />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutesMenu;
