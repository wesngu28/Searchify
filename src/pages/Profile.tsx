import { useEffect, useState } from "react";
import Blurb from "../components/Blurb";
import Table from "../components/Table";
import { UserData } from "../struct/UserData";
import userStyles from "../../styles/User.module.css";

export default function Profile() {
  const [data, setData] = useState({} as UserData);
  const [show, setShow] = useState(true);
  const [adjective, setAdjective] = useState('')
  const headings = ['Last 4 Weeks', 'Last Six Months', 'All Time']

  useEffect(() => {
    const fetchedData = async () => {
      const userData = await fetch("/user");
      const userDataJSON = await userData.json();
      setData(userDataJSON);
    };
    fetchedData();
    const randomAdjective = () => {
        const adjectives = ['admirable', 'amazing', 'astonishing', 'awesome', 'brilliant', 'cool', 'enjoyable', 'excellent', 'fabulous', 'fantastic', 'fine', 'incredible', 'magnificent', 'marvelous', 'outstanding', 'phenomenal', 'pleasant', 'pleasing', 'remarkable',
        'sensational', 'superb', 'great', 'terrific', 'tremendous', 'wondrous', 'astounding', 'awe-inspiring', 'divine', 'dynamite', 'groovy', 'exquisite', 'miraculous', 'peachy', 'prime', 'staggering', 'stupendous', 'super', 'swell', 'perfect', 'exceptional',
        'perfect', 'smash-hit', 'dynamite', 'breaktaking', 'stunning', 'unbelievable', 'spectacular', 'sublime', 'formidable', 'imposing', 'mind-boggling', 'mind-blowing', 'bussin', 'out of this world', 'amazeballs', 'eye-opening', 'prodigious', 'wonderful',
        'impressive', 'genius', 'mensa-level', 'unique', 'notable', 'life-changing', 'alluring', 'bewitching', 'captivating', 'charming', 'attractive', 'enchanting', 'entertaining', 'banger', 'enthralling', 'fascinating', 'interesting', 'dope', 'fantabulous',
        'grand', 'heavenly', 'high-class', 'hype', 'stellar', 'superior', 'good', 'satisfactory', 'talented', 'legendary', 'worthy of celebrating', 'worthy of worship', 'godlike', 'god-tier', 's-tier', 'immersive', 'bop', 'pog', 'poggingly',
        'adorable', 'booming', 'crisp', 'delicious', 'fatherly', 'friendly', 'glistering', 'iconic', 'hot', 'fire', 'lush', 'magical', 'menacing', 'jovial', 'overpowered', 'powerful', 'precious', 'proper', 'shiny', 'smooth', 'vivid', 'witty']
        return adjectives[Math.floor(Math.random()*adjectives.length)];
    }
    setAdjective(`${randomAdjective()}+${randomAdjective()}`)
  }, []);

  return (
    <div id="user">
      <img src={data.img}></img>
      <Blurb blurb={data} type={"user"} adjectives={adjective.split('+')} />
      <button className="button" id="show" onClick={() => setShow(!show)}>{ show === true ? 'Show Top Songs' : 'Show Top Artists' }</button>
      { data.name ? <Table head={headings} body={show === true ? Object.values(data.top_artists) : Object.values(data.top_songs)} usage={'user'}/> : null }
    </div>
  );
}
