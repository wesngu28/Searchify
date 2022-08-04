import MusicInfo from ".";
import Blurb from "../../components/Blurb";
import Table from "../../components/Table";
import musicStyles from '../../styles/MusicInfoData.module.css'

export default function Music ({music, type, adjectives}) {

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
    temp_link.download = `${music.name} csv`;
    temp_link.href = encodeUri;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
  }

  return (
    <div>
        <MusicInfo />
        <Blurb blurb={music} type={type} adjectives={adjectives}/>
        <button className={musicStyles.button} onClick={async () => downloadTable()}>
          Download Table
        </button>
        <p>{tableCaption()}</p>
        <Table head={getHeaders()} body={music.tracks} usage={'music'}/>
    </div>
  )
}

export const getServerSideProps = async ( { req }) => {
  let searchQuery = req.url;
  searchQuery = searchQuery.replace('/searchify/', '');
  const searchQueryArr = searchQuery.split('=');
  const fetchData = await fetch(`http://localhost:3000/search/${searchQueryArr[0]}/${searchQueryArr[1]}`)
  const json = await fetchData.json()
  const randomAdjective = () => {
    const adjectives = ['admirable', 'amazing', 'astonishing', 'awesome', 'brilliant', 'cool', 'enjoyable', 'excellent', 'fabulous', 'fantastic', 'fine', 'incredible', 'magnificent', 'marvelous', 'outstanding', 'phenomenal', 'pleasant', 'pleasing', 'remarkable',
    'sensational', 'superb', 'great', 'terrific', 'tremendous', 'wondrous', 'astounding', 'awe-inspiring', 'divine', 'dynamite', 'groovy', 'exquisite', 'miraculous', 'peachy', 'prime', 'staggering', 'stupendous', 'super', 'swell', 'perfect', 'exceptional',
    'perfect', 'smash-hit', 'dynamite', 'breaktaking', 'stunning', 'unbelievable', 'spectacular', 'sublime', 'formidable', 'imposing', 'mind-boggling', 'mind-blowing', 'bussin', 'out of this world', 'amazeballs', 'eye-opening', 'prodigious', 'wonderful',
    'impressive', 'genius', 'mensa-level', 'unique', 'notable', 'life-changing', 'alluring', 'bewitching', 'captivating', 'charming', 'attractive', 'enchanting', 'entertaining', 'banger', 'enthralling', 'fascinating', 'interesting', 'dope', 'fantabulous',
    'grand', 'heavenly', 'high-class', 'hype', 'stellar', 'superior', 'good', 'satisfactory', 'talented', 'legendary', 'worthy of celebrating', 'worthy of worship', 'godlike', 'god-tier', 's-tier', 'immersive', 'bop', 'pog', 'poggingly',
    'adorable', 'booming', 'crisp', 'delicious', 'fatherly', 'friendly', 'glistering', 'iconic', 'hot', 'fire', 'lush', 'magical', 'menacing', 'jovial', 'overpowered', 'powerful', 'precious', 'proper', 'shiny', 'smooth', 'vivid', 'witty']
    return adjectives[Math.floor(Math.random()*adjectives.length)];
  }
  const adjectives = []
  adjectives.push(randomAdjective())
  adjectives.push(randomAdjective())
  adjectives.push(randomAdjective())
  return {
    props: { 
      type: searchQueryArr[0],
      music : json,
      adjectives: adjectives
    },
  }
}