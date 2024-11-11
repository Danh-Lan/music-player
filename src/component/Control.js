import React from 'react';
import VolumeSlider from './control/VolumeSlider';
import ProgressSlider from './control/ProgressSlider';
import PlayOptionToggle from './control/PlayOptionToggle';
import SongControlButtons from './control/SongControlButtons';

const Control = ({ audio, playlist, playOption, setPlayOption, duration, isPlaying, setIsPlaying, setCurrentSong, currentSongIndex, setCurrentSongIndex, songProgress, setSongProgress, volume, setVolume, loop, setLoop }) => {
  const handleChangeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  const playStop = () => {
    setIsPlaying(!isPlaying);
  };

  const previousSong = () => {
    const newSongIndex = (currentSongIndex + (playlist.length - 1)) % playlist.length;
    setSongProgress(0);
    setIsPlaying(true);
    setCurrentSongIndex(newSongIndex);
    setCurrentSong(playlist[newSongIndex]);
  };

  const nextSong = () => {
    const newSongIndex = (currentSongIndex + 1) % playlist.length;
    setSongProgress(0);
    setIsPlaying(true);
    setCurrentSongIndex(newSongIndex);
    setCurrentSong(playlist[newSongIndex]);
  };

  const handleChangeSongProgress = (progress) => {
    setSongProgress(progress);
    audio.current.seekTo(progress, "seconds");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      const seek = Math.min(songProgress + 5, duration);
      setSongProgress(seek);
      audio.current.seekTo(seek, "seconds");
    } else if (event.key === "ArrowLeft") {
      const seek = Math.max(songProgress - 5, 0);
      setSongProgress(seek);
      audio.current.seekTo(seek, "seconds");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === ' ') { // spacebar
      setIsPlaying(!isPlaying);
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
    <div tabIndex="1" onKeyDown={handleKeyDown} onKeyPress={(e) => handleKeyPress(e)}>
      <VolumeSlider duration={duration} songProgress={songProgress} volume={volume} handleChangeVolume={handleChangeVolume} />
      <ProgressSlider
        duration={duration}
        songProgress={songProgress}
        handleChangeSongProgress={handleChangeSongProgress}
      />
      <PlayOptionToggle
        playOption={playOption}
        handlePlayOption={handlePlayOption}
      />
      <SongControlButtons
        isPlaying={isPlaying}
        playStop={playStop}
        previousSong={previousSong}
        nextSong={nextSong}
      />
    </div>
  );
};

export default Control;