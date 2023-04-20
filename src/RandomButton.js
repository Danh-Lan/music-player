import './css/RandomButton.css';

function RandomButton({song, setCurrentSong, setCurrentSongIndex}) {
	const randomSong = () => {
		const newSongIndex = Math.floor(Math.random()*song.length);

		setCurrentSong(song[newSongIndex]);
		setCurrentSongIndex(newSongIndex);
	};

	return (
		<button className="Random-button" onClick={randomSong}>I'm feeling spicy today</button>
	);
}

export default RandomButton;