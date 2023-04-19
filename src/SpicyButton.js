import './SpicyButton.css';

const URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

function SpicyButton() {
	const openURL = () => {
		window.open(URL);
	};

	return (
		<button className="SpicyButton" onClick={openURL}>I'm feeling spicy today</button>
	);
}

export default SpicyButton;