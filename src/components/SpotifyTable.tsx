export default function SpotifyTable ({spotify}) {
    return(
        <div>
            <div>
                <p>Playlist name: {spotify.profile_name}</p>
                <p>Playlist size: {spotify.about_me}</p>
            </div>
        </div>
    )
}