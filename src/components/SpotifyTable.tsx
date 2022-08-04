import Blurb from "../components/Blurb";
import Table from "../components/Table";
import { AlbumData } from "../struct/AlbumData";
import { ArtistData } from "../struct/ArtistData";
import { PlaylistData } from "../struct/PlaylistData";
import { TrackData } from "../struct/TrackData";
import spotifyStyles from "../styles/SpotifyTable.module.css";
import Pastry from "./Doughnut";

interface Props {
  spotify: AlbumData | ArtistData | PlaylistData | TrackData;
  type: string;
}

export default function SpotifyTable({ spotify, type }: Props) {
  const getHeaders = () => {
    if (
      type === "artist" ||
      type === "album" ||
      type === "track" ||
      type === "playlist"
    ) {
      return ["Song Name", "Artists", "Song Link"];
    }
    return ["Last 4 Weeks", "Last Six Months", "All Time"];
  };

  const tableCaptionThing = () => {
    if ( type === 'playlist') return 'Youtube links to the songs in the playlist'
    if ( type === 'user') return null;
    return `If you like this ${type}, here are some songs you might like!`
  }

  const downloadTable = () => {
    const csv = [];
    const headings = document.getElementsByTagName('th');
    const headingsRow = (Array.from(headings)).map(heading => {
      return heading.textContent
    })
    csv.push(headingsRow);
    const body = document.getElementsByTagName('td');
    const bodyText = (Array.from(body).map(text => {
      if(text.children.length > 0) {
        if((text.children[0] as HTMLAnchorElement).href) return (text.children[0] as HTMLAnchorElement).href; 
      }
      return text.textContent
    }))
    const bodyArray = Array.from(bodyText);
    const bodyThrees = [];
    while (bodyThrees.length !== 10) {
      bodyThrees.push(bodyArray.splice(0, 3))
    }
    bodyThrees.forEach(element => {
      csv.push(element);
    });
    let csvContent = "data:text/csv;charset=utf-8," 
      + bodyThrees.map(e => e.join(",")).join("\n");
    const encodeUri = encodeURI(csvContent);
    const temp_link = document.createElement('a');
    temp_link.download = `${spotify.name} csv`;
    temp_link.href = encodeUri;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
  }

  return (
    <div id="center">
      <div>
        <div id="info">
          <img id="spotify" src={spotify.img}></img>
          <Blurb blurb={spotify} type={type} />
        </div>
      </div>
      <button className="button" onClick={async () => downloadTable()}>
          Download Table
      </button>
        {type === 'playlist' ? <div id="bakery"><Pastry filter={spotify.tracks['artists']} /></div> : null}
      <p>{tableCaptionThing()}</p>
      <Table head={getHeaders()} body={spotify.tracks} usage={'music'}/>
    </div>
  );
}
