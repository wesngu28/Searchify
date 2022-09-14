import { AlbumData } from '../struct/AlbumData';
import { ArtistData } from '../struct/ArtistData';
import { PlaylistData } from '../struct/PlaylistData';
import { TrackData } from '../struct/TrackData';
import { UserData } from '../struct/UserData';
import blurbStyles from '../styles/Blurb.module.css'
import Image from 'next/image'

interface Props {
    blurb: AlbumData | ArtistData | PlaylistData | TrackData | UserData
    type: string
    adjectives: string[]
}

export default function Blurb({blurb, type, adjectives}: Props) {

    if(type === 'artist') {
        blurb = blurb as ArtistData;
        return(
            <div className={blurbStyles.info}>
                <Image alt="image of requested artist" className={blurbStyles.spotify} src={blurb.img} />
                <p>The {adjectives[0]} {blurb.name} is a {blurb.genres[0]} artist. They make {adjectives[1]} music of {blurb.genre_list} genres.</p>
            </div>
        )
    }
    if(type === 'song') {
        blurb = blurb as TrackData;
        return(
            <div className={blurbStyles.info}>
                <Image alt="cover image of requested track" className={blurbStyles.spotify} src={blurb.img} />
                <p>The {adjectives[0]} song {blurb.name} was made by the {adjectives[1]} {blurb.artist}. It was released on {blurb.release} in the {adjectives[2]} album {blurb.album}.</p>
            </div>
        )
    }
    if(type === 'playlist') {
        blurb = blurb as PlaylistData;
        return(
            <div className={blurbStyles.info}>
                <Image alt="cover image of requested playlist" className={blurbStyles.spotify} src={blurb.img} />
                <p>{blurb.name} was created on {blurb.created}. This {adjectives[0]} playlist has size {blurb.size} with the {adjectives[1]} {blurb.frequent} being the most frequent, appearing {blurb.frequent_count}.</p>
            </div>
        )
    }
    if(type === 'album') {
        blurb = blurb as AlbumData;
        return(
            <div className={blurbStyles.info}>
                <Image alt="cover image of requested album" className={blurbStyles.spotify} src={blurb.img} />
                <p>The {adjectives[0]} {blurb.name} is an album by the {adjectives[1]} {blurb.main_artist}. Released on {blurb.release_date}, it has {blurb.total_tracks} {adjectives[2]} total songs.</p>
            </div>
        )
    }
    if(type === 'user') {
        blurb = blurb as UserData;
        return (
            <div className={blurbStyles.info}>
                <Image alt="avatar of requested user" className={blurbStyles.spotify} src={blurb.img} />
                <p>The {adjectives[0]} {blurb.name} is you.</p>
            </div>
        )
    }
    return(
        <p></p>
    )
}