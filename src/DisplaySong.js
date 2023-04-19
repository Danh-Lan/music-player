import ReactPlayer from 'react-player/youtube';
import './css/DisplaySong.css';

function DisplaySong({currentSong}) {
	return (
        <div className="video-wrapper">
			<ReactPlayer 
				url = {currentSong}
				width = '50%'
				height = '50%'
			/>
		</div>
	);
  };

export default DisplaySong;