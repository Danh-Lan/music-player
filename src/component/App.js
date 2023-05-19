import RandomButton from './RandomButton.js';
import musicList from '../data/MusicList.js';
import ReactPlayer from 'react-player';
import Control from './Control.js';
import 'rc-slider/assets/index.css';
import { useState, useRef } from 'react';

import '../style/App.css';

function App() {
	const playerRef = useRef(null);

	const [song, setSong] = useState(musicList);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(musicList[0]);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [songProgress, setSongProgress] = useState(0);
	const [volume, setVolume] = useState(0.8);
	const [duration, setDuration] = useState(0);

  	const handleKeyPress = (event) => {
		if (event.key === ' ') {
			setIsPlaying(!isPlaying);
		}
	};

	

	const handleDuration = (duration) => {
		setDuration(duration);
		console.log("duration : ", duration);
	}

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handlePause = () => {
		setIsPlaying(false);
	};
	const handleEnded = () => {
		setIsPlaying(false);
	};

	const handleProgress = (progress) => {
		setSongProgress(progress.playedSeconds);
	};

  	const handleKeyDown = (event) => {
		if (isPlaying) {
			if (event.key === "ArrowRight") {
				const seek = Math.min(songProgress + 5, duration);
				
				setSongProgress(seek);
				playerRef.current.seekTo(seek, "seconds");
			} else if (event.key === "ArrowLeft") {
				const seek = Math.max(songProgress - 5, 0);
				
				setSongProgress(seek);
				playerRef.current.seekTo(seek, "seconds");
			}
		}

		if (event.key === "ArrowUp") {
			const newVolume = Math.min(volume + 0.1, 1);
			setVolume(newVolume);
		} else if (event.key === "ArrowDown") {
			const newVolume = Math.max(volume - 0.1, 0);
			setVolume(newVolume);
		}
	};

  	return (
		<div className="main" tabIndex="1" onKeyPress={(e) => handleKeyPress(e)} onKeyDown = {handleKeyDown}>
			<div className="title">
				React Music Player
			</div>
		
			<div className = "video-container">
				<div className="player-wrapper">
					<div>
						{currentSong.title}
					</div>

					<ReactPlayer className = "player"
						ref = {playerRef}
						key = {currentSong.url} /* force reload to deal with bad duration time issue */
						url = {currentSong.url}
						volume = {volume}
						playing = {isPlaying}
						controls = {false}
						onPlay = {handlePlay}
						onPause = {handlePause}
						onEnded = {handleEnded}
						onProgress = {handleProgress}
						onDuration = {handleDuration}

						config={{
							soundcloud: {
								options: {
									auto_play: false,
								}
							},
						}}
					/>

					<div className = "control-bar">
						<Control isPlaying = {isPlaying} setIsPlaying = {setIsPlaying}
							audio = {playerRef}
							song = {song}
							setCurrentSong = {setCurrentSong}
							currentSongIndex = {currentSongIndex} setCurrentSongIndex = {setCurrentSongIndex}
							duration = {duration}
							songProgress = {songProgress} setSongProgress = {setSongProgress} 
							volume = {volume} setVolume = {setVolume} 
						/>
						<div></div>
						<RandomButton song = {song} setCurrentSong = {setCurrentSong}
							setCurrentSongIndex = {setCurrentSongIndex} 
							songProgress = {songProgress} setSongProgress = {setSongProgress} 
						/>
					</div>
				</div>

				<a href={"https://github.com/Danh-Lan/music-player"} target="_blank" rel="noreferrer" className="footer">
					Github
				</a>
			</div>
		</div>
  	);
}

export default App;
