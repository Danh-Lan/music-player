import React from 'react';
import Slider from "rc-slider";

const ProgressSlider = ({ duration, songProgress, handleChangeSongProgress }) => (
  <Slider
    trackStyle={{ backgroundColor: 'red', height: 5 }}
    handleStyle={{
      borderColor: 'red',
      backgroundColor: 'red',
    }}
    railStyle={{
      height: 5
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