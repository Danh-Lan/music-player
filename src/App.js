import { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import Control from './component/Control.js';
import playlist from './data/playlist.json';

import 'rc-slider/assets/index.css';
import './style/App.css';

function App() {
  const playerRef = useRef(null);
  const [playOption, setPlayOption] = useState("default");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(playlist[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Classical");
  const [filteredPlaylist, setFilteredPlaylist] = useState(playlist.filter(song => song.category === "Classical"));
  const categories = Array.from(new Set(playlist.map(song => song.category)));

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    const filteredSongs = playlist.filter(song => song.category === newCategory);
    setFilteredPlaylist(filteredSongs);
    setCurrentSong(filteredSongs[0]);
    setCurrentSongIndex(0);
    setIsPlaying(false);
    setSongProgress(0);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    if (playOption === "default") {
      setIsPlaying(false);
    } else if (playOption === "loop") {
      // loop is handled in control.js, handlePlayOption
    } else if (playOption === "auto play") {
      const newSongIndex = (currentSongIndex + 1) % filteredPlaylist.length;
      setSongProgress(0);
      setIsPlaying(true);
      setCurrentSongIndex(newSongIndex);
      setCurrentSong(filteredPlaylist[newSongIndex]);
    }
  };

  const handleProgress = (progress) => {
    setSongProgress(progress.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const shufflePlaylist = () => {
    const shuffled = [...filteredPlaylist].sort(() => Math.random() - 0.5);
    setFilteredPlaylist(shuffled);
    setCurrentSong(shuffled[0]);
    setCurrentSongIndex(0);
    setIsPlaying(false);
    setSongProgress(0);
  };

  return (
    <div className="player-wrapper">
      {(selectedCategory === "Classical") 
        ? <h2 className="song-info">
            {currentSong.performer ? `${currentSong.performer} - ` : ''}{currentSong.title} ({currentSong.composer})
          </h2>
        : <h2 className="song-info">{currentSong.composer} - {currentSong.title}</h2>        
      }
      <ReactPlayer
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
      <Control
        audio={playerRef}
        playlist={filteredPlaylist}
        playOption={playOption}
        setPlayOption={setPlayOption}
        duration={duration}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        songProgress={songProgress}
        setSongProgress={setSongProgress}
        volume={volume}
        setVolume={setVolume}
        loop={loop}
        setLoop={setLoop}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        shufflePlaylist={shufflePlaylist}
      />
    </div>
  );
}

export default App;