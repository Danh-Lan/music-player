import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import Control from '../components/Control';
import trackService from '../services/track';
import shuffleArray from '../utils/shuffleArray';

import 'rc-slider/assets/index.css';
import '../styles/Home.css';

function Home() {
  const playerRef = useRef(null);
  const [library, setLibrary] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredPlaylist, setFilteredPlaylist] = useState(null); // Filtered playlist based on selected category
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Player controls
  const [playOption, setPlayOption] = useState("default");
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const fetchedLibrary = await trackService.getLibrary();

        setLibrary(fetchedLibrary);

        const uniqueCategories = Array.from(new Set(fetchedLibrary.map(track => track.category))).sort();
        setCategories(uniqueCategories);

        const initialCategory = uniqueCategories[0];
        setSelectedCategory(initialCategory);

        const filtered = fetchedLibrary.filter(track => track.category === initialCategory);
        setFilteredPlaylist(filtered);
        setCurrentTrackIndex(0);
        setCurrentTrack(filtered[0]);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchLibrary();
  }, []);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    
    const filteredTracks = library.filter(track => track.category === newCategory);
    setFilteredPlaylist(filteredTracks);
    setCurrentTrack(filteredTracks[0]);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setTrackProgress(0);
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
      const newTrackIndex = (currentTrackIndex + 1) % filteredPlaylist.length;
      setTrackProgress(0);
      setIsPlaying(true);
      setCurrentTrackIndex(newTrackIndex);
      setCurrentTrack(filteredPlaylist[newTrackIndex]);
    }
  };

  const handleProgress = (progress) => {
    setTrackProgress(progress.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const shufflePlaylist = () => {
    const shuffled = shuffleArray(filteredPlaylist);
    setFilteredPlaylist(shuffled);
    setCurrentTrack(shuffled[0]);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setTrackProgress(0);
  };

  if (!filteredPlaylist || filteredPlaylist.length === 0) {
    return <div className="loading">Library is empty</div>;
  }

  return (
    <div className="player-wrapper">
      {(selectedCategory === "Classical") 
        ? <h2 className="track-info">
            {currentTrack.performer ? `${currentTrack.performer} - ` : ''}{currentTrack.title} ({currentTrack.composer})
          </h2>
        : <h2 className="track-info">{currentTrack.composer} - {currentTrack.title}</h2>
      }
      <ReactPlayer
        ref={playerRef}
        key={currentTrack.url}
        url={currentTrack.url}
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
        setCurrentTrack={setCurrentTrack}
        currentTrackIndex={currentTrackIndex}
        setCurrentTrackIndex={setCurrentTrackIndex}
        trackProgress={trackProgress}
        setTrackProgress={setTrackProgress}
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