import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import '../style/Control.css';

function Control({audio, duration, isPlaying, setIsPlaying, song, setCurrentSong, currentSongIndex, setCurrentSongIndex, songProgress, setSongProgress, volume, setVolume, loop, setLoop}) {
	const handleChangeVolume = (newVolume) => {
		setVolume(newVolume);
	};

	const playStop = () => {
		setIsPlaying(!isPlaying);
	};

	const previousSong = () => {
		const newSongIndex = (currentSongIndex + (song.length-1)) % song.length;
		
		setSongProgress(0);
		setIsPlaying(true);
		setCurrentSongIndex(newSongIndex);
		setCurrentSong(song[newSongIndex]);
	};

	const nextSong = () => {
		const newSongIndex = (currentSongIndex + 1) % song.length;

		setSongProgress(0);
		setIsPlaying(true);
		setCurrentSongIndex(newSongIndex);
		setCurrentSong(song[newSongIndex]);
	};

	const handleChangeSongProgress = (progress) => {
		setSongProgress(progress);
		audio.current.seekTo(progress, "seconds");
	}

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

		if (event.key === "ArrowUp") {
			const newVolume = Math.min(volume + 0.1, 1);
			setVolume(newVolume);
		} else if (event.key === "ArrowDown") {
			const newVolume = Math.max(volume - 0.1, 0);
			setVolume(newVolume);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === ' ') {
			setIsPlaying(!isPlaying);
		}
	};

	const handleLoop = () => {
		setLoop(!loop); 
	};

	const convertDuration = (duration) => {
		const hour = Math.floor(duration / 3600);
		const minute = Math.floor((duration / 60) % 60);
		const second = Math.ceil(duration % 60);

		return (
			<span>
				{(hour > 0) ? hour+':' : ''}
				{(minute < 10) ? '0'+minute : minute}
				:
				{(second < 10) ? '0'+second : second}
			</span>
		)
	}

	return (
        <div tabIndex="1" onKeyDown = {handleKeyDown} onKeyPress={(e) => handleKeyPress(e)}>
			<Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
				<VolumeDown/>
				<Slider
					defaultValue = {0}
					min = {0}
					max = {1}
					step = {0.05}
					onChange = {handleChangeVolume}
					value = {volume}
				/>
				<VolumeUp/>

				<FormControlLabel control=
					{<Switch 
						checked={loop}
      					onChange={handleLoop} 
					/>} 
					label="Loop" 
				/>

				<div>
					<span>{convertDuration(Math.floor(songProgress))}</span>  
					<span>&nbsp;/&nbsp;</span>
					<span>{duration === 0 ? '0:00' : convertDuration(Math.floor(duration-1))}</span>
				</div>
			</Stack>

			<Slider
				trackStyle={{ backgroundColor: 'red', height: 5 }}
				handleStyle={{
					borderColor: 'red',
					backgroundColor: 'red',
				}}
				railStyle={{ 
					backgroundColor: 'white', 
					height: 5 
				}}
				defaultValue = {0}
				min = {0}
				max = {duration}
				step = {1}
				onChange = {handleChangeSongProgress}
				value = {songProgress}
			/>
			
			<IconButton onClick={previousSong} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
				<SkipPreviousIcon sx={{ fontSize: 50 }} />
			</IconButton>
			<IconButton onClick={playStop} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
				{isPlaying ? <PlayArrowIcon sx={{ fontSize: 50 }}  />
				: <StopIcon  sx={{ fontSize: 50 }} /> }
			</IconButton>
			<IconButton onClick={nextSong} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
				<SkipNextIcon sx={{ fontSize: 50 }} />
			</IconButton>
		</div>
	);
}

export default Control;