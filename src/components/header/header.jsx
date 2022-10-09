import { Link } from "react-router-dom"
import "./header.css"
const Header = () => {
    return (
        <header>
            <div className="right-align">
                <h1>LOGO</h1>
                <div>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/write-note"}>Nowa Notatkas</Link>
                </div>
            </div>
            <button className="login-search">search</button>
        </header>
    )
}

export default Header