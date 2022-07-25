import Blurb from '../components/Blurb'

export default function SpotifyTable ({spotify}) {

    return(
        <div>
            <div>
                <img src={spotify.img}></img>
                <Blurb blurb={spotify}/>
            </div>
        </div>   
    )
}