import ReactPlayer from 'react-player';
import { useRef } from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import './css/DisplaySong.css';

function DisplaySong({currentSong, isPlaying, setIsPlaying, songProgress, setSongProgress}) {
	const playerRef = useRef(null);

	const onChange = (songProgress) => {
		setSongProgress(songProgress);
		playerRef.current.seekTo(songProgress, "seconds");
	}

	const onPlay = () => {
		setIsPlaying(true);
	};

	const onPause = () => {
		setIsPlaying(false);
	};
	const onEnded = () => {
		setIsPlaying(false);
	};

	const onProgress = (progress) => {
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
					url = {currentSong.url}
					playing = {isPlaying}
					controls = {true}
					onPlay = {onPlay}
					onPause = {onPause}
					onEnded = {onEnded}
					onProgress = {onProgress}

					config={{
						soundcloud: {
							options: {
								auto_play: false,
								buying: false,
								sharing: false,
								download: false,
							}
						},

						file: {
							attributes: {
								controlsList: "nofullscreen",
							},
						},
					}}
				/>
			</div>

			<div className="progress">
				<span className="time-current">{songProgress}</span>
				<Slider
					defaultValue={0}
					min={0}
					max={100}
					step={1}
					onChange= {onChange}
					value={Math.floor(songProgress)}
				/>
				<span className="time">03:34</span>
			</div>
		</div>
	);
  };

export default DisplaySong;