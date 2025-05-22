import VolumeSlider from './control/VolumeSlider';
import ProgressSlider from './control/ProgressSlider';
import PlayOptionToggle from './control/PlayOptionToggle';
import TrackControlButtons from './control/TrackControlButtons';
import CategorySelector from './CategorySelector';

import '../styles/Control.css';

const Control = ({ 
  audio, 
  playlist, 
  playOption, 
  setPlayOption, 
  duration, 
  isPlaying, 
  setIsPlaying, 
  setCurrentTrack, 
  currentTrackIndex, 
  setCurrentTrackIndex, 
  trackProgress, 
  setTrackProgress, 
  volume, 
  setVolume, 
  setLoop, 
  categories, 
  selectedCategory, 
  handleCategoryChange, 
  shufflePlaylist 
}) => {
  const handleChangeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  const playStop = () => {
    setIsPlaying(!isPlaying);
  };

  const previousTrack = () => {
    const newTrackIndex = (currentTrackIndex + (playlist.length - 1)) % playlist.length;
    setTrackProgress(0);
    setIsPlaying(true);
    setCurrentTrackIndex(newTrackIndex);
    setCurrentTrack(playlist[newTrackIndex]);
  };

  const nextTrack = () => {
    const newTrackIndex = (currentTrackIndex + 1) % playlist.length;
    setTrackProgress(0);
    setIsPlaying(true);
    setCurrentTrackIndex(newTrackIndex);
    setCurrentTrack(playlist[newTrackIndex]);
  };

  const handleChangeTrackProgress = (progress) => {
    setTrackProgress(progress);
    audio.current.seekTo(progress, "seconds");
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      setIsPlaying(!isPlaying);
    } else if (event.key === "ArrowRight") {
      const seek = Math.min(trackProgress + 5, duration);
      setTrackProgress(seek);
      audio.current.seekTo(seek, "seconds");
    } else if (event.key === "ArrowLeft") {
      const seek = Math.max(trackProgress - 5, 0);
      setTrackProgress(seek);
      audio.current.seekTo(seek, "seconds");
    }
  };

  const handlePlayOption = (event, newPlayOption) => {
    if (newPlayOption != null) {
      setPlayOption(newPlayOption);
      if (newPlayOption === "loop") {
        setLoop(true);
      } else {
        setLoop(false);
      }
    }
  };

  return (
    <div className="control-bar" tabIndex="1" onKeyDown={handleKeyDown}>
      <VolumeSlider duration={duration} TrackProgress={trackProgress} volume={volume} handleChangeVolume={handleChangeVolume} />
      <ProgressSlider
        duration={duration}
        TrackProgress={trackProgress}
        handleChangeTrackProgress={handleChangeTrackProgress}
      />
      <div className="control-row">
        <CategorySelector categories={categories} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
        <TrackControlButtons
          isPlaying={isPlaying}
          playStop={playStop}
          previousTrack={previousTrack}
          nextTrack={nextTrack}
        />
        <PlayOptionToggle
          playOption={playOption}
          handlePlayOption={handlePlayOption}
        />
        <button className="shuffle-button" onClick={shufflePlaylist}>Shuffle</button>
      </div>
    </div>
  );
};

export default Control;