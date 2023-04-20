import ReactPlayer from 'react-player';

import './css/DisplaySong.css';

function DisplaySong({currentSong, isPlaying}) {
	return (
        <div className="video-wrapper">
			<div>
				{currentSong.title}
			</div>

			<ReactPlayer 
				url = {currentSong.url}
				playing = {isPlaying}
				
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