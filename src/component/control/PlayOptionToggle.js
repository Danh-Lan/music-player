import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const PlayOptionToggle = ({ playOption, handlePlayOption }) => (
  <ToggleButtonGroup
    value={playOption}
    exclusive
    onChange={handlePlayOption}
    size='small'
  >
    <ToggleButton value="default" selectedcolor="#00abc0"> Default</ToggleButton>
    <ToggleButton value="loop" selectedcolor="#00abc0">Loop</ToggleButton>
    <ToggleButton value="autoplay" selectedcolor="#00abc0">Autoplay</ToggleButton>
    <ToggleButton value="random autoplay" selectedcolor="#00abc0">Random autoplay</ToggleButton>
  </ToggleButtonGroup>
);

export default PlayOptionToggle;