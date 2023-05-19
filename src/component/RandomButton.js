import '../style/RandomButton.css';

function RandomButton({song, setCurrentSong, setCurrentSongIndex, songProgress, setSongProgress}) {
	const randomSong = () => {
		const newSongIndex = Math.floor(Math.random()*song.length);

		setSongProgress(0);
		setCurrentSong(song[newSongIndex]);
		setCurrentSongIndex(newSongIndex);
	};

	return (
		<button className="random-button" onClick={randomSong}>Play a random song</button>
	);
}

export default RandomButton;