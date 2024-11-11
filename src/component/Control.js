import React from 'react';
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { convertDuration } from '../utils';

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

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
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={handleChangeVolume}
          value={volume}
        />
        <VolumeUp />
        <div>
          <span>{convertDuration(Math.floor(songProgress))}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>{duration === 0 ? '0:00' : convertDuration(Math.floor(duration - 1))}</span>
        </div>
      </Stack>
      <Slider
        trackStyle={{ backgroundColor: 'red', height: 5 }}
        handleStyle={{
          borderColor: 'red',
          backgroundColor: 'red',
        }}
        railStyle={{
          height: 5
        }}
        defaultValue={0}
        min={0}
        max={duration}
        step={1}
        onChange={handleChangeSongProgress}
        value={songProgress}
      />
        <ToggleButtonGroup
          value={playOption}
          exclusive
          onChange={handlePlayOption}
          size='small'
        >
          <ToggleButton value="default" selectedcolor="#00abc0"> Default</ToggleButton>
          <ToggleButton value="loop" selectedcolor="#00abc0">Loop</ToggleButton>
          <ToggleButton value="autoplay" selectedcolor="#00abc0">Autoplay</ToggleButton>
          <ToggleButton value="random autoplay" selectedcolor="#00abc0">Random autoplay</ToggleButton>
        </ToggleButtonGroup>
      <div>
        <IconButton onClick={previousSong} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
          <SkipPreviousIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <IconButton onClick={playStop} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
          {isPlaying ? <PlayArrowIcon sx={{ fontSize: 50 }} />
            : <StopIcon sx={{ fontSize: 50 }} />}
        </IconButton>
        <IconButton onClick={nextSong} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
          <SkipNextIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Control;