import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import Control from '../components/Control';
import playlistService from '../services/playlists';

import 'rc-slider/assets/index.css';
import '../styles/Home.css';

function Home() {
  const playerRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredPlaylist, setFilteredPlaylist] = useState(null); // Filtered playlist based on selected category
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  // Player controls
  const [playOption, setPlayOption] = useState("default");
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const fetchedPlaylist = await playlistService.getPlaylists();

        setPlaylist(fetchedPlaylist);

        const uniqueCategories = Array.from(new Set(fetchedPlaylist.map(song => song.category))).sort();
        setCategories(uniqueCategories);

        const initialCategory = uniqueCategories[0];
        setSelectedCategory(initialCategory);

        const filtered = fetchedPlaylist.filter(song => song.category === initialCategory);
        setFilteredPlaylist(filtered);
        setCurrentSongIndex(0);
        setCurrentSong(filtered[0]);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, []);

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

  if (!filteredPlaylist || filteredPlaylist.length === 0) {
    return <div className="loading">Loading...</div>;
  }

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

export default Home;