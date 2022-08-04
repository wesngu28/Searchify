import musicStyles from '../../styles/MusicInfo.module.css'
import Link from 'next/link'
import { useState } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function MusicInfo() {

  const [type, setType] = useState('')
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('')
  const handleChange = (event: InputEvent) => {
    const spotifyUrl = new RegExp('(https?:\/\/open.spotify.com\/(playlist|track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))');
    if (!spotifyUrl.test(event.target.value)) {
      setInput('');
    }
    const tempInput = event.target.value;
    if (!(tempInput.includes('playlist')) && !(tempInput.includes('album')) && !(tempInput.includes('track')) && !(tempInput.includes('artist'))) {
      setInput('');
    } else {
      const lastSlash = tempInput.lastIndexOf('/')
      const question = tempInput.indexOf('?')
      let lastColon: number
      if(!lastSlash) {
        lastColon = tempInput.lastIndexOf(':')
        const secondLastColon = tempInput.lastIndexOf(':', tempInput.lastIndexOf(':')-1)
        setType(tempInput.substring(secondLastColon + 1, lastColon))
        const newInput = tempInput.substring(lastColon + 1, tempInput.length-1)
        let currentInput = window.location.href.replace('http://localhost:3000/searchify/', '');
        const currentInputArr = currentInput.split('=');
        if(newInput === currentInputArr[1]) {
          setInput('')
        } else {
          setInput(newInput)
        }
      } else {
        const secondLastSlash = tempInput.lastIndexOf('/', tempInput.lastIndexOf('/')-1)
        setType(tempInput.substring(secondLastSlash + 1, lastSlash))
        const newInput = tempInput.substring(lastSlash + 1, question)
        let currentInput = window.location.href.replace('http://localhost:3000/searchify/', '');
        const currentInputArr = currentInput.split('=');
        if(newInput === currentInputArr[1]) {
          setInput('')
        } else {
          setInput(newInput)
        }
      }
    }
  };

    return (
      <div className={musicStyles.container}>
          <p>
            <input
              type="text"
              name="inp"
              className={musicStyles.input}
              placeholder="Enter Spotify Link"
              onChange={handleChange}
              value={input}
            />
          </p>
          <p>
            <Link href={input ? `/searchify/${type}=${input}` : {}} id="title">
              <a className={musicStyles.submit} onClick={(event) => !input ? event.preventDefault() : setStatus('loading')}>Searchify</a>
            </Link>
          </p>
          <p>{status}</p>
      </div>
    );
}

// export const getServerSideProps = async (context) => {
  
// }