import "./Nav.css"
import 'primeicons/primeicons.css';
import logo from "../../assets/logo.png"

export default function Nav(){
    return<>
        <nav className="nav-container">
            <div className="logo-and-title">
                <img src={logo} alt="Logo" id="logo"/>
                <h1 id="title">Uwindsor Schedule Maker - Winter 2026</h1>
            </div>

            <div className="links">
                <a href="https://github.com/AaronSinn/Uwindsor-Schedule-Maker" target="_blank"><i className="pi pi-github" id="github-logo"></i></a>
            </div>
        </nav>
    </>
}