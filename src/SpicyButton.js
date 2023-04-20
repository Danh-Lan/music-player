import './css/SpicyButton.css';

function SpicyButton({song, setCurrentSong, setCurrentSongIndex}) {
	const randomSong = () => {
		const newSongIndex = Math.floor(Math.random()*song.length);

		setCurrentSong(song[newSongIndex]);
		setCurrentSongIndex(newSongIndex);
	};

	return (
		<button className="SpicyButton" onClick={randomSong}>I'm feeling spicy today</button>
	);
}

export default SpicyButton;