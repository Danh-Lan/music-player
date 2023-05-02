import ReactPlayer from 'react-player';
import { useState, useRef } from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import './css/Player.css';

function DisplaySong({currentSong, isPlaying, setIsPlaying, songProgress, setSongProgress, volume, setVolume}) {
	const playerRef = useRef(null);

	const [duration, setDuration] = useState(0);

	const convertDuration = (duration) => {
		return (
			<span>
				{Math.floor(duration / 60)}
				:
				{(duration % 60 < 10) ? '0' + (duration % 60) : duration % 60}
			</span>
		)
	}

	const handleChangeSongProgress = (progress) => {
		if (isPlaying) {
			setSongProgress(progress);
			playerRef.current.seekTo(progress, "seconds");
		}
	}

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
		<div className = "video-container" tabIndex="1" onKeyDown = {handleKeyDown}>
			<div>
				{currentSong.title}
			</div>
			
			<div className="player-wrapper">
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

						file: {
							attributes: {
								controlsList: "nofullscreen",
							},
						},
					}}
				/>

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
			</div>

			<div>
				<span>{convertDuration(Math.floor(songProgress))}</span>  
				<span>&nbsp;/&nbsp;</span>
				<span>{duration === 0 ? '0:00' : convertDuration(Math.floor(duration-1))}</span>
			</div>
		</div>
	);
  };

export default DisplaySong;