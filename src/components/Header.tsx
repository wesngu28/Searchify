import headerStyles from '../styles/Header.module.css'

export default function Header () {
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span>Searchify</span>
            </h1>
            <p>
                Search up your favorite songs, albums, and artists and get
                recommendations as well as various information about them.
            </p>
            <p>
                Input your favorite playlist for information and a link to the
                corresponding YouTube link for each song! Use your connected account to
                view your top artists and tracks!
            </p>
        </div>
    )
}