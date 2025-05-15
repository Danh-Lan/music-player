import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const PlayOptionToggle = ({ playOption, handlePlayOption }) => (
  <ToggleButtonGroup
    value={playOption}
    exclusive
    onChange={handlePlayOption}
    size='small'
  >
    <ToggleButton value="default"> Default</ToggleButton>
    <ToggleButton value="loop">Loop</ToggleButton>
    <ToggleButton value="auto play">Auto Play</ToggleButton>
  </ToggleButtonGroup>
);

export default PlayOptionToggle;