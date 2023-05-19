import { IconContext } from "react-icons";
import { ImNext2 } from "react-icons/im";
import { ImPrevious2 } from "react-icons/im";
import { ImPlay3 } from "react-icons/im";
import { ImStop2 } from "react-icons/im";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import './css/Control.css';

function Control({audio, duration, isPlaying, setIsPlaying, song, setCurrentSong, currentSongIndex, setCurrentSongIndex, songProgress, setSongProgress, volume, setVolume}) {
	const size = '40';

	const handleChangeVolume = (volume) => {
		setVolume(volume);
	}

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
		if (isPlaying) {
			setSongProgress(progress);
			audio.current.seekTo(progress, "seconds");
		}
	}

	return (
        <>
			<IconContext.Provider value={{ className: 'react-icons' }}>
				<ImPrevious2 size={size} onClick={previousSong} />
				
				{isPlaying ? <ImPlay3 size={size} onClick={playStop} />
				: <ImStop2 size={size} onClick={playStop} /> }
				
				<ImNext2 size={size} onClick={nextSong} />
			</IconContext.Provider>

			<Slider
				trackStyle={{ backgroundColor: 'red', height: 5 }}
				handleStyle={{
				borderColor: 'gray',
				backgroundColor: 'red',
				}}
				railStyle={{ backgroundColor: 'gray', height: 5 }}
				defaultValue = {0}
				min = {0}
				max = {duration}
				step = {1}
				onChange = {handleChangeSongProgress}
				value = {songProgress}
			/>

			<Slider className='volume'
				defaultValue = {0}
				min = {0}
				max = {1}
				step = {0.05}
				onChange = {handleChangeVolume}
				value = {volume}
			/>
		</>
	);
}

export default Control;