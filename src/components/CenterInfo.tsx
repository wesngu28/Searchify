import { useState } from 'react'
import SpotifyTable from '../components/SpotifyTable';

interface PlaylistData {
    profile_name: string;
    about_me: string;
}

export default function CenterInfo() {

    const [spotifyData, setSpotifyData] = useState({} as PlaylistData)
    const [input, setInput] = useState('')
  
    const handleChange = event => {
      setInput(event.target.value);
  
      console.log('value is:', event.target.value);
    };
  
    function getData() {
      fetch(`/search/playlist/${input}`).then(
        response => response.json()
      ).then(data => setSpotifyData(({
        profile_name: data.name,
        about_me: data.size})))
    }

    return (
        <div>
            <h1>Searchify</h1>
            <p>Search up your favorite songs, albums, and artists and get recommendations as well as various information about them.</p>
            <p>Input your favorite playlist for information and a link to the song's corresponding YouTube links! Use your connected
            account to view your top artists and tracks!</p>
            <p><input type="text" name="inp" id="inp" placeholder="Enter Spotify Link" onChange={handleChange} value={input}/></p>
            <p><input type="submit" name="submit" id="sub" onClick={async() => getData()}/></p>
            <SpotifyTable spotify={spotifyData} />
        </div>
    )
}