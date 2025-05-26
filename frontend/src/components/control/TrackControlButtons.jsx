import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const TrackControlButtons = ({ isPlaying, playStop, previousTrack, nextTrack }) => (
  <>
    <IconButton onClick={previousTrack} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
      <SkipPreviousIcon sx={{ fontSize: 50 }} />
    </IconButton>
    <IconButton onClick={playStop} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
      {isPlaying ? <PlayArrowIcon sx={{ fontSize: 50 }} />
        : <StopIcon sx={{ fontSize: 50 }} />}
    </IconButton>
    <IconButton onClick={nextTrack} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
      <SkipNextIcon sx={{ fontSize: 50 }} />
    </IconButton>
  </>
);

export default TrackControlButtons;