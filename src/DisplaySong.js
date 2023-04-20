import ReactPlayer from 'react-player';

import './css/DisplaySong.css';

function DisplaySong({currentSong, isPlaying, setIsPlaying}) {
	const endSong = () => {
		setIsPlaying(false);
	};

	return (
        <div className="video-wrapper">
			{/*<div>
				{currentSong.title}
			</div>*/}

			<ReactPlayer 
				url = {currentSong.url}
				playing = {isPlaying}
				onEnded = {endSong}

				config={{
					file: {
						attributes: {
							controlsList: "nofullscreen",
						},
					},
				}}
			/>
		</div>
	);
  };

export default DisplaySong;