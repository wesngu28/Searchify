import Blurb from '../components/Blurb'
import { AlbumData } from '../struct/AlbumData';
import { ArtistData } from '../struct/ArtistData';
import { PlaylistData } from '../struct/PlaylistData';
import { TrackData } from '../struct/TrackData';

interface Props {
    spotify: AlbumData | ArtistData | PlaylistData | TrackData
    type: string
}

export default function SpotifyTable ({spotify, type}: Props) {

    return(
        <div>
            <div>
                <img src={spotify.img}></img>
                <Blurb blurb={spotify} type={type}/>
            </div>
        </div>   
    )
}