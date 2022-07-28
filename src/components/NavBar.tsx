import '../styles/NavBar.css'
import { Link } from 'react-router-dom';

export default function NavBar() {

    return(
        <nav className="nav">
            <Link to="/" id="title">Searchify</Link>
            <ul>
                <li>
                    <Link to="/profile">My Spotify</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}