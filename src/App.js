import RandomButton from './RandomButton.js';
import musicList from './data/MusicList.js';
import DisplaySong from './DisplaySong.js';
import Control from './Control.js';

import { useState, useRef } from 'react';

import './css/App.css';

function App() {
  const [song, setSong] = useState(musicList);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(musicList[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  //const videoPlayerRef = useRef();
  
  const handleKeyPress = (event) => {
		if(event.key === ' '){
			setIsPlaying(!isPlaying);
		}
	};

  return (
    <div className="Music-site" tabIndex="1" onKeyPress={(e) => handleKeyPress(e)}>
      <div className="title">
        React Music Player
      </div>
      
      <DisplaySong
      currentSong = {currentSong} isPlaying = {isPlaying} setIsPlaying={setIsPlaying} 
        songProgress = {songProgress} setSongProgress = {setSongProgress} />

      <Control isPlaying={isPlaying} setIsPlaying={setIsPlaying} 
        song={song}
        setCurrentSong={setCurrentSong}
        currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex}
        songProgress = {songProgress} setSongProgress = {setSongProgress} />
      
      <RandomButton song={song} setCurrentSong={setCurrentSong}
        setCurrentSongIndex={setCurrentSongIndex} />
    </div>
  );
}

export default App;
