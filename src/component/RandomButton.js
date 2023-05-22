import '../style/RandomButton.css';

function RandomButton({song, setCurrentSong, setCurrentSongIndex, setIsPlaying, setSongProgress}) {
	const randomSong = () => {
		const newSongIndex = Math.floor(Math.random()*song.length);

		setSongProgress(0);
		setIsPlaying(true);
		setCurrentSong(song[newSongIndex]);
		setCurrentSongIndex(newSongIndex);
	};

	return (
		<button className="random-button" onClick={randomSong}>Play a random song</button>
	);
}

export default RandomButton;