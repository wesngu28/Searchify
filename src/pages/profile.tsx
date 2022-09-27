import { useEffect, useState } from "react";
import Blurb from "../components/Blurb";
import Metadata from "../components/Metadata";
import Table from "../components/Table";
import { UserData } from "../struct/UserData";
import userStyles from "../styles/User.module.css";
import { randomAdjective } from "../util/randomAdjective";

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
    setAdjective(`${randomAdjective()}+${randomAdjective()}`)
  }, []);

  return (
    <>
      <Metadata title={`Searchify | ${data.name}`} />
      <div id="user">
        <Blurb blurb={data} type={"user"} adjectives={adjective.split('+')} />
        <button className={userStyles.button} onClick={() => setShow(!show)}>{show === true ? 'Show Top Songs' : 'Show Top Artists'}</button>
        {data.name ? <Table head={headings} body={show === true ? Object.values(data.top_artists) : Object.values(data.top_songs)} usage={'user'} /> : null}
      </div>
    </>
  );
}
