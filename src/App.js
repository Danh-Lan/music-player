import SpicyButton from './SpicyButton.js';
import musicList from './data/MusicList.js';
import DisplaySong from './DisplaySong.js';
import Control from './Control.js';
import ProgressBar from './ProgressBar.js';

import { useState } from 'react';

import './css/App.css';

function App() {
  const [song, setSong] = useState(musicList);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(musicList[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  const handleKeyPress = (event) => {
		if(event.key === ' '){
			setIsPlaying(!isPlaying);
		}
	};

  return (
    <div className="Music-site" tabIndex="1" onKeyPress={(e) => handleKeyPress(e)}>
      <DisplaySong currentSong = {currentSong} isPlaying = {isPlaying} setIsPlaying={setIsPlaying} />
      
      <ProgressBar />

      <Control isPlaying={isPlaying} setIsPlaying={setIsPlaying} 
        song={song}
        setCurrentSong={setCurrentSong}
        currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
      
      <SpicyButton song={song} setCurrentSong={setCurrentSong}
        setCurrentSongIndex={setCurrentSongIndex} />
    </div>
  );
}

export default App;
