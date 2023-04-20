import './css/App.css';
import SpicyButton from './SpicyButton.js';
import musicList from './data/MusicList.js';
import DisplaySong from './DisplaySong.js';
import Control from './Control.js';
import ProgressBar from './ProgressBar.js';
import { useState } from 'react';

function App() {
  const [song, setSong] = useState(musicList);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(musicList[0]);
  
  return (
    <div className="Music-site">
      <DisplaySong currentSong = {currentSong}/>
      
      <ProgressBar/>

      <Control/>
      
      <SpicyButton className="Spicy-button"/>
    </div>
  );
}

export default App;
