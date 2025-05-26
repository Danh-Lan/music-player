import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const TrackForm = ({ formTitle, open, onClose, onSubmit, initialData }) => {
  const [track, setTrack] = useState({
    id: null,
    title: '',
    url: '',
    composer: '',
    performer: '',
    category: ''
  });

  useEffect(() => {
    if (initialData) {
      setTrack({
        id: initialData.id || null,
        title: initialData.title || '',
        url: initialData.url || '',
        composer: initialData.composer || '',
        performer: initialData.performer || '',
        category: initialData.category || ''
      })
    }
  }, [initialData, open]);
  
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
      id: null,
      title: '',
      url: '',
      composer: '',
      performer: '',
      category: ''
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formTitle}</DialogTitle>
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
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TrackForm;