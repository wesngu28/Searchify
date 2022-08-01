import { useEffect, useState } from "react";
import Blurb from "../components/Blurb";
import Table from "../components/Table";
import { UserData } from "../struct/UserData";
import "../styles/User.css";

export default function Profile() {
  const [data, setData] = useState({} as UserData);
  const [show, setShow] = useState(true);
  const headings = ['Last 4 Weeks', 'Last Six Months', 'All Time']

  useEffect(() => {
    const fetchedData = async () => {
      const userData = await fetch("/user");
      const userDataJSON = await userData.json();
      setData(userDataJSON);
    };
    fetchedData();
  }, []);

  return (
    <div id="user">
      <img src={data.img}></img>
      <Blurb blurb={data} type={"user"} />
      <button className="button" id="show" onClick={() => setShow(!show)}>{ show === true ? 'Show Top Songs' : 'Show Top Artists' }</button>
      { data.name ? <Table head={headings} body={show === true ? Object.values(data.top_artists) : Object.values(data.top_songs)} usage={'user'}/> : null }
    </div>
  );
}
