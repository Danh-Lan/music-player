import RandomButton from './component/RandomButton.js';
import musicList from './data/MusicList.json';
import ReactPlayer from 'react-player/lazy';
import Control from './component/Control.js';
import 'rc-slider/assets/index.css';
import { useState, useRef } from 'react';

import './style/App.css';

function App() {
	const playerRef = useRef(null);

	const playlist = musicList;
	// default, loop, autoplay or randomly autoplay
	const [playOption, setPlayOption] = useState("default");
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(musicList[0]);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [songProgress, setSongProgress] = useState(0);
	const [volume, setVolume] = useState(0.8);
	const [duration, setDuration] = useState(0);
	const [loop, setLoop] = useState(false);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
	};
	const handleEnded = () => {
		if (playOption === "deafult") {
			setIsPlaying(false);
		} else if (playOption === "loop") {
			// loop is handled in control.js, handlePlayOption
		} else if (playOption === "autoplay") {
			const newSongIndex = (currentSongIndex + 1) % playlist.length;

			setSongProgress(0);
			setIsPlaying(true);
			setCurrentSongIndex(newSongIndex);
			setCurrentSong(playlist[newSongIndex]);
		} else if (playOption === "random autoplay") {
			const newSongIndex = Math.floor(Math.random()*playlist.length);

			setSongProgress(0);
			setIsPlaying(true);
			setCurrentSongIndex(newSongIndex);
			setCurrentSong(playlist[newSongIndex]);
		}
	};

	const handleProgress = (progress) => {
		setSongProgress(progress.playedSeconds);
	};

	const handleDuration = (duration) => {
		setDuration(duration);
	}

  return (
    <div className="main">
      <div className="video-container">
        <div className="player-wrapper">
          <div style={{ fontSize: 24 }}>
            {currentSong.artist} - {currentSong.title}
          </div>
          <ReactPlayer
            className="player"
            ref={playerRef}
            key={currentSong.url}
            url={currentSong.url}
            volume={volume}
            playing={isPlaying}
            loop={loop}
            controls={false}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
          <div className="control-bar">
            <Control
              audio={playerRef}
              playlist={playlist}
              setCurrentSong={setCurrentSong}
              playOption={playOption}
              setPlayOption={setPlayOption}
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              duration={duration}
              songProgress={songProgress}
              setSongProgress={setSongProgress}
              volume={volume}
              setVolume={setVolume}
              loop={loop}
              setLoop={setLoop}
            />
            <div></div>
            <RandomButton
              playlist={playlist}
              setCurrentSong={setCurrentSong}
              setIsPlaying={setIsPlaying}
              setCurrentSongIndex={setCurrentSongIndex}
              setSongProgress={setSongProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
