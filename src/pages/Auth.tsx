import { useEffect, useState } from 'react';
import '../styles/User.css'

export default function Auth() {

    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState({} as {[key: string]: string});

    useEffect(() => {
        window.location.href = '/auth';
    })

    const user = async () => {
        const userData = await fetch('/user')
        const userDataJSON = await userData.json();
        setData(userDataJSON);
    }

    console.log(data);

    return(
        <div id="user">
            {data.name}
        </div>
    )
}

// const [data, setData] = useState({});