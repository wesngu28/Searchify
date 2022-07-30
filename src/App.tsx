import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import CenterInfo from './components/CenterInfo';
import About from './pages/About';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element = {<CenterInfo />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;