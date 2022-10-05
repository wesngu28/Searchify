import MusicInfo from "..";
import Blurb from "../../components/Blurb";
import Pastry from "../../components/Doughnut";
import Table from "../../components/Table";
import musicStyles from '../../styles/MusicInfoData.module.css'
import { randomAdjective } from "../../util/randomAdjective";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  music: any
  type: string
  adjectives: string[]
}

export default function Music ({music, type, adjectives}: Props) {
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

  const tableCaption = () => {
    if ( type === 'playlist') {
      if ( Object.values(music.tracks).length < 3 ) return 'Songs in the playlist'
      return 'Youtube links to the songs in the playlist'
    }
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
    temp_link.download = `${music.name} csv`;
    temp_link.href = encodeUri;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
  }
  
  return (
    <>
      <Head>
        <title>Searchify - {music.name}</title>
      </Head>
        <MusicInfo />
        {
          music.error ? <p>{music.error}</p> :
          <>
            <Blurb blurb={music} type={type} adjectives={adjectives}/>
            {Object.values(music.tracks).length >= 3 ? <button className={musicStyles.button} onClick={async () => downloadTable()}>
              Download Table
            </button> : null }
            <div className={musicStyles.center}>
              {type === 'playlist' ? <div className={musicStyles.bakery}><Pastry filter={music.tracks.Artists} /></div> : null}
            </div>
            <p>{tableCaption()}</p>
            <Table head={getHeaders()} body={music.tracks} usage={'music'}/>
          </>
        }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ( { query }) => {
  let searchQuery = (query.id! as string).replace('/searchify/', '');
  const searchQueryArr = searchQuery.split('=');
  console.log(`https://searchifyy.vercel.app/search/${searchQueryArr[0]}/${searchQueryArr[1]}`);
  const fetchData = await fetch(`https://searchifyy.vercel.app/search/${searchQueryArr[0]}/${searchQueryArr[1]}?${query.links}`)
  let json;
  try {
    json = await fetchData.json()
  } catch (err) {
    if (searchQueryArr[0] === 'playlist') {
      json = { 'error' : 'Error encountered with the playlist, is it privated?'}
    } else {
      json = { 'error' : 'Error encountered processing the link submitted.'}
    }
  }
  const adjectives = []
  adjectives.push(randomAdjective())
  adjectives.push(randomAdjective())
  adjectives.push(randomAdjective())
  return {
    props: { 
      type: searchQueryArr[0],
      music: json,
      adjectives: adjectives
    },
  }
}