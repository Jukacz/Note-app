import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate
} from "react-router-dom";
import App from "./views/index/app";
import WriteNote from "./views/writeNote/write-note";
import Tak from "./spoko";



function RoutesMenu() {

  const ReadNote = () => {
    let { id } = useParams();
    return <WriteNote id={id} />
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/write-note' element={<WriteNote id="new-note" />} />
          <Route path="/spoko" element={<Tak />} />
          <Route path="/note/:id" element={<ReadNote />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutesMenu;
