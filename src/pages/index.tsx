import SearchBar from '../components/SearchBar';
import musicStyles from '../styles/MusicInfo.module.css'

export default function MusicInfo() {



  return (
    <div className={musicStyles.container}>
      <SearchBar />
    </div>
  );
}