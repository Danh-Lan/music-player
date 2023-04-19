import './css/MusicList.css';

function MusicList() {
	const songsURL = [
		"https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
		"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	];

	return (
		<div className="Music-list">
			Music list			
			{songsURL.map((song) => (
				<div>
					<a href={song}>{song}</a>
				</div>
			))}
		</div>
	);
}

export default MusicList;