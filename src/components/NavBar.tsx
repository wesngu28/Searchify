import '../styles/NavBar.css'

export default function NavBar() {
    return(
        <nav className="nav">
            <a href="/" id="title">Searchify</a>
            <ul>
                <li>
                    <a href="/user">Your Spotify Link</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </nav>
    )
}