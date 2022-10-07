import Head from "next/head";
import { useEffect, useState } from "react";
import Blurb from "../components/Blurb";
import Table from "../components/Table";
import { UserData } from "../struct/UserData";
import userStyles from "../styles/User.module.css";
import { randomAdjective } from "../util/randomAdjective";

export default function Profile() {
  const [data, setData] = useState({} as UserData);
  const [error, setError] = useState(false)
  const [show, setShow] = useState(true);
  const [adjective, setAdjective] = useState('')
  const headings = ['Last 4 Weeks', 'Last Six Months', 'All Time']

  useEffect(() => {
    const fetchedData = async () => {
      let paramString = window.location.href.split('?')[1];
      let queryString = new URLSearchParams(paramString);
      const userData = await fetch(`/user?token=${queryString}`);
      const userDataJSON = await userData.json();
      if (userDataJSON.error) {
        setError(true)
      } else {
        setData(userDataJSON);
      }
      window.history.replaceState(null, '', '/profile');
    };
    fetchedData();
    setAdjective(`${randomAdjective()}+${randomAdjective()}`)
  }, []);

  return (
    <>
      <Head>
        <title>Searchify - {data.name}</title>
      </Head>
      {error ? <p>Could not get user profile</p> : <div id="user">
        <Blurb blurb={data} type={"user"} adjectives={adjective.split('+')} />
        <button className={userStyles.button} onClick={() => setShow(!show)}>{show === true ? 'Show Top Songs' : 'Show Top Artists'}</button>
        {data.name ? <Table head={headings} body={show === true ? Object.values(data.top_artists) : Object.values(data.top_songs)} usage={'user'} /> : null}
      </div>}
    </>
  );
}
