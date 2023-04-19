import './css/App.css';
import SpicyButton from './SpicyButton.js';
import MusicList from './MusicList.js'

function App() {
  return (
    <div className="Music-site">

      <MusicList/>
      
      <SpicyButton/>

      <div className="current-play">
        Currently playing
      </div>
    </div>
  );
}

export default App;
