import { useState } from 'react'
import SpotifyTable from '../components/SpotifyTable';
import '../styles/CenterInfo.css'
import { PlaylistData } from '../struct/PlaylistData';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function CenterInfo() {

    const [spotifyData, setSpotifyData] = useState({} as PlaylistData)
    const [input, setInput] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
  
    const handleChange = (event: InputEvent) => {
      const spotifyUrl = new RegExp('(https?:\/\/open.spotify.com\/(playlist|track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))');
      if (!spotifyUrl.test(event.target.value)) {
        setInput('');
      } else {
        setInput(event.target.value)
      }
    };
  
    const getData = async() => {
      if ((input.includes('playlist')) || (input.includes('album') || (input.includes('track')) || (input.includes('artist')))) {
        setStatus('Currently loading information...')
      }
      const lastSlash = input.lastIndexOf('/')
      const question = input.indexOf('?')
      let lastColon: number
      let type: string;
      let trimInput: string;
      if(!lastSlash) {
        lastColon = input.lastIndexOf(':')
        const secondLastColon = input.lastIndexOf(':', input.lastIndexOf(':')-1)
        type = input.substring(secondLastColon + 1, lastColon)
        trimInput = input.substring(lastColon + 1, input.length-1)
      } else {
        const secondLastSlash = input.lastIndexOf('/', input.lastIndexOf('/')-1)
        type = input.substring(secondLastSlash + 1, lastSlash)
        trimInput = input.substring(lastSlash + 1, question)
      }
      const fetchData = await fetch(`/search/${type}/${trimInput}`)
      const json = await fetchData.json()
      setSpotifyData((json))
      setStatus('')
      setType(type)
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
            <SpotifyTable spotify={spotifyData} type={type} />
        </div>
    )
}