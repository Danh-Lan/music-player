import React from 'react';
import Slider from "rc-slider";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Stack from '@mui/material/Stack';

import { convertDuration } from '../../utils';

const VolumeSlider = ({ duration, songProgress, volume, handleChangeVolume }) => (
  <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
    <VolumeDown />
    <Slider
      defaultValue={0}
      min={0}
      max={1}
      step={0.05}
      onChange={handleChangeVolume}
      value={volume}
    />
    <VolumeUp />
    <div>
      <span>{convertDuration(Math.floor(songProgress))}</span>
      <span>&nbsp;/&nbsp;</span>
      <span>{duration === 0 ? '0:00' : convertDuration(Math.floor(duration - 1))}</span>
    </div>
  </Stack>
);

export default VolumeSlider;