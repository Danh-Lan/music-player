import ReactPlayer from 'react-player';
import { useState, useRef } from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import './css/DisplaySong.css';

function DisplaySong({currentSong, isPlaying, setIsPlaying, songProgress, setSongProgress}) {
	const playerRef = useRef(null);

	const [duration, setDuration] = useState(0);

	const handleChange = (progress) => {
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

	return (
		<div className = "video-container">
			<div>
				{currentSong.title}
			</div>
			
			<div className="player-wrapper">
				<ReactPlayer className = "player"
					ref = {playerRef}
					key = {currentSong.url} /* force reload to deal with bad duration time issue */
					url = {currentSong.url}
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
								buying: false,
								sharing: false,
								download: false,
								showArtwork: false,
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
					defaultValue = {0}
					min = {0}
					max = {duration}
					step = {1}
					onChange = {handleChange}
					value = {songProgress}
				/>
			</div>

			<div>
				<span>{Math.floor(songProgress)}</span>
			</div>
		</div>
	);
  };

export default DisplaySong;