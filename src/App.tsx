import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import CenterInfo from './components/CenterInfo';

function App() {

  return (
    <div className="App">
      <NavBar />
      <CenterInfo />
    </div>
  );
}

export default App;