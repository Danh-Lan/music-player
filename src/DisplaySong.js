import ReactPlayer from 'react-player';

import './css/DisplaySong.css';

function DisplaySong({currentSong, isPlaying, setIsPlaying}) {
	const onPlay = () => {
		setIsPlaying(true);
	};

	const onPause = () => {
		setIsPlaying(false);
	};
	const onEnded = () => {
		setIsPlaying(false);
	};

	return (
		<div>
			<div>
				{currentSong.title}
			</div>
			
			<div className="video-wrapper">
				<ReactPlayer 
					url = {currentSong.url}
					playing = {isPlaying}

					onPlay = {onPlay}
					onPause = {onPause}
					onEnded = {onEnded}

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
		</div>
	);
  };

export default DisplaySong;