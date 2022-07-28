import { useState } from 'react';
import '../styles/User.css'

export default function User() {

    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState({});

    const user = async () => {
        const fetcher = await fetch('/check');
        const fletcher = await fetcher.text();
        if (fletcher === 'is logged') {
            const userData = await fetch('/user')
            const userDataJSON = await userData.json();
            setData(userDataJSON);
            return;
        }
        const logMeIn = await fetch('/auth');
        setHidden(true);
    }

    console.log(data);

    return(
        <div id="user">
            <div>
                <button className={hidden === true ? 'hidden' : ''} id="log" onClick={async() => await user()}>Login to Spotify</button>
            </div>
        </div>
    )
}

// const [data, setData] = useState({});