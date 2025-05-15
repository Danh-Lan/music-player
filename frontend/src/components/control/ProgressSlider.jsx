import Slider from "rc-slider";

const ProgressSlider = ({ duration, songProgress, handleChangeSongProgress }) => (
  <Slider
    styles={{
      track: { backgroundColor: 'red', height: 5 },
      handle: { borderColor: 'red', backgroundColor: 'red' },
      rail: { height: 5 },
    }}
    defaultValue={0}
    min={0}
    max={duration}
    step={1}
    onChange={handleChangeSongProgress}
    value={songProgress}
  />
);

export default ProgressSlider;