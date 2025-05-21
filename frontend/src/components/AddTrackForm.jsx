import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddTrackForm = ({ open, onClose, onSubmit }) => {
  const [track, setTrack] = useState({
    title: '',
    url: '',
    composer: '',
    performer: '',
    category: ''
  });
  
  const fields = [
    { id: 'title', label: 'Title' },
    { id: 'composer', label: 'Composer' },
    { id: 'performer', label: 'Performer' },
    { id: 'category', label: 'Category' },
    { id: 'url', label: 'URL' }
  ];

  const handleSubmit = async (track) => {
    await onSubmit(track);
    setTrack({
      title: '',
      url: '',
      composer: '',
      performer: '',
      category: ''
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Track</DialogTitle>
      <DialogContent>
        {fields.map(({ id, label }) => (
          <TextField
            key={id}
            margin="dense"
            label={label}
            name={id}
            fullWidth
            value={track[id] || ''}
            onChange={e => setTrack({ ...track, [id]: e.target.value })}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(track)} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTrackForm;