import ReactPlayer from 'react-player';
import './css/DisplaySong.css';

function DisplaySong({currentSong}) {
	return (
        <div className="video-wrapper">
			<div>
				{currentSong.title}
			</div>

			<ReactPlayer 
				url = {currentSong.url}
				width = "50%"
				height = "50%"
			/>
		</div>
	);
  };

export default DisplaySong;