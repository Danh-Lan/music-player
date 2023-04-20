import { IconContext } from "react-icons";
import { ImNext2 } from "react-icons/im";
import { ImPrevious2 } from "react-icons/im";
import { ImPlay3 } from "react-icons/im";
import { ImStop2 } from "react-icons/im";

import './css/Control.css';

function Control({isPlaying, setIsPlaying, song, setSong, currentSong, setCurrentSong, currentSongIndex, setCurrentSongIndex}) {
	const size = '40';

	const playStop = () => {
		setIsPlaying(!isPlaying);
	};

	const previousSong = () => {
		const newSongIndex = (currentSongIndex + (song.length-1)) % song.length;
		
		setIsPlaying(true);
		setCurrentSongIndex(newSongIndex);
		setCurrentSong(song[newSongIndex]);
	};

	const nextSong = () => {
		const newSongIndex = (currentSongIndex + 1) % song.length;

		setIsPlaying(true);
		setCurrentSongIndex(newSongIndex);
		setCurrentSong(song[newSongIndex]);
	};

	return (
        <div >
			<IconContext.Provider value={{ className: 'react-icons' }}>
				<ImPrevious2 size={size} onClick={previousSong} />
				
				{isPlaying ? <ImPlay3 size={size} onClick={playStop} />
				: <ImStop2 size={size} onClick={playStop} /> }
				
				<ImNext2 size={size} onClick={nextSong} />
			</IconContext.Provider>
		</div>
	);
}

export default Control;