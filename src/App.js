import './css/App.css';
import SpicyButton from './SpicyButton.js';
import MusicList from './MusicList.js';
import DisplaySong from './DisplaySong.js';
import Control from './Control.js';
import ProgressBar from './ProgressBar.js';

// name song, name author, progress bar, stop start button, previous next button
function App() {
  const currentSong = 'https://www.youtube.com/watch?v=ngWybcg6tbo';

  return (
    <div className="Music-site">

      <MusicList/>

      <DisplaySong currentSong = {currentSong}/>
      
      <ProgressBar/>

      <Control/>
      
      <SpicyButton/>
    </div>
  );
}

export default App;
