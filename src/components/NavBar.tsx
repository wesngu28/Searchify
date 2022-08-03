import navStyles from '../styles/Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {

    return(
        <nav className={navStyles.nav}>
            <Link href="/" id="title">Searchify</Link>
            <ul>
                <li>
                    <Link href="/auth">My Spotify</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}