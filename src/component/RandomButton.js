import '../style/RandomButton.css';

function RandomButton({playlist, setCurrentSong, setCurrentSongIndex, setIsPlaying, setSongProgress}) {
	const randomSong = () => {
		const newSongIndex = Math.floor(Math.random()*playlist.length);

		setSongProgress(0);
		setIsPlaying(true);
		setCurrentSong(playlist[newSongIndex]);
		setCurrentSongIndex(newSongIndex);
	};

	return (
		<button className="random-button" onClick={randomSong}>Play a random song</button>
	);
}

export default RandomButton;