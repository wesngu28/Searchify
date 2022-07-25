import { useState } from 'react'
import SpotifyTable from '../components/SpotifyTable';
import '../styles/CenterInfo.css'
import { PlaylistData } from '../struct/PlaylistData';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function CenterInfo() {

    const [spotifyData, setSpotifyData] = useState({} as PlaylistData)
    const [input, setInput] = useState('')
    const [status, setStatus] = useState('')
  
    const handleChange = (event: InputEvent) => {
      const spotifyUrl = new RegExp('(https?:\/\/open.spotify.com\/(playlist|track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))');
      const spotifyUrlChars = new RegExp('^[A-Za-z0-9?.=:\/_]*$')
      if (!spotifyUrl.test(event.target.value) || !spotifyUrlChars.test(event.target.value)) {
        setInput('');
      } else {
        let inp = event.target.value
        const lastSlash = inp.lastIndexOf('/')
        const question = inp.indexOf('?')
        let lastColon: number
        if(!lastSlash) {
          lastColon = inp.lastIndexOf(':')
          setInput(inp.substring(lastColon + 1, inp.length-1))
        }
        setInput(inp.substring(lastSlash + 1, question))
      }
    };
  
    const getData = async() => {
      if ((input.includes('playlist')) || (input.includes('album') || (input.includes('track')) || (input.includes('artist')))) {
        console.log('I want to be dicked down')  
        setStatus('Currently loading information...')
      }
      const fetchData = await fetch(`/search/playlist/${input}`)
      const json = await fetchData.json()
      setSpotifyData((json))
    }

    return (
        <div id="about">
            <h1>Searchify</h1>
            <p>Search up your favorite songs, albums, and artists and get recommendations as well as various information about them.</p>
            <p>Input your favorite playlist for information and a link to the song's corresponding YouTube links! Use your connected
            account to view your top artists and tracks!</p>
            <p><input type="text" name="inp" id="inp" placeholder="Enter Spotify Link" onChange={handleChange} value={input}/></p>
            <p><input disabled={!input} type="submit" name="submit" id="sub" onClick={async() => getData()}/></p>
            <p>{status}</p>
            <SpotifyTable spotify={spotifyData} />
        </div>
    )
}