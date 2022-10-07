import Link from "next/link";

import musicStyles from '../styles/MusicInfo.module.css'

import { useEffect, useState, useRef } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function SearchBar() {

    const [type, setType] = useState('')
    const [input, setInput] = useState('')
    const [status, setStatus] = useState('')
    const [links, setLinks] = useState('Get Youtube Links')
    const dropdown = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.location.href.includes(input)) {
            setStatus('')
        }
    });

    const handleClick = () => {
        if (dropdown.current!.style.display !== 'block') {
            dropdown.current!.style.display = 'block';
            return;
        }
        dropdown.current!.style.display = 'none';     
    }

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
            if (!lastSlash) {
                lastColon = tempInput.lastIndexOf(':')
                const secondLastColon = tempInput.lastIndexOf(':', tempInput.lastIndexOf(':') - 1)
                setType(tempInput.substring(secondLastColon + 1, lastColon))
                const newInput = tempInput.substring(lastColon + 1, tempInput.length - 1)
                let currentInput = window.location.href.replace(process.env.NODE_ENV === 'production' ? 'https://searchifyy.vercel.app/searchify/' : 'http://localhost:3000/searchify/', '');
                const currentInputArr = currentInput.split('=');
                setInput(newInput)
            } else {
                const secondLastSlash = tempInput.lastIndexOf('/', tempInput.lastIndexOf('/') - 1)
                setType(tempInput.substring(secondLastSlash + 1, lastSlash))
                const newInput = tempInput.substring(lastSlash + 1, question)
                let currentInput = window.location.href.replace(process.env.NODE_ENV === 'production' ? 'https://searchifyy.vercel.app/searchify/' : 'http://localhost:3000/searchify/', '');
                const currentInputArr = currentInput.split('=');
                setInput(newInput)
            }
        }
    }

    return (
        <>
            <p className={musicStyles.searchBarHolder}>
                <input
                    type="text"
                    name="inp"
                    className={musicStyles.input}
                    placeholder="Enter Spotify Link"
                    onChange={handleChange}
                    value={input}
                />
                <div className={musicStyles.dropdown}>
                    <button className={musicStyles.absoluted} onClick={handleClick}>{links}
                    <div ref={dropdown} className={musicStyles.dropdown_content}>
                        <p onClick={() => setLinks("Get Youtube Links")}>Links</p>
                        <p onClick={() => setLinks("No Youtube Links")}>No Links</p>
                    </div>
                    </button>
                </div>
            </p>
            <p>
                <Link href={input ? (`/searchify/${type}=${input}?links=${links === 'Get Youtube Links' ? 'yes' : 'no'}`) : {}} id="title">
                    <a className={musicStyles.submit} onClick={(event) => !input ? event.preventDefault() : setStatus(`Loading your request...`)}>Searchify</a>
                </Link>
            </p>
            {status && !window.location.href.includes(`/searchify/${type}=${input}`) ? <p>{status}</p> : null}
        </>
    )
}