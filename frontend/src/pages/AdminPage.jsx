import { useState, useEffect } from 'react';
import trackService from '../services/track';
import TrackForm from '../components/TrackForm';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TableSortLabel, Button
} from '@mui/material';

function AdminPage() {
  const [library, setLibrary] = useState([]);
  const headers = [
    { id: 'title', label: 'Title' },
    { id: 'composer', label: 'Composer' },
    { id: 'performer', label: 'Performer' },
    { id: 'category', label: 'Category' },
    { id: 'url', label: 'URL' }
  ];
  const [sortBy, setSortBy] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const [addTrackFormOpen, setAddTrackFormOpen] = useState(false);
  const [editTrackFormOpen, setEditTrackFormOpen] = useState(false);
  const [trackToEdit, setTrackToEdit] = useState(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const fetchedLibrary = await trackService.getLibrary();
        setLibrary(fetchedLibrary);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }

    fetchLibrary();
  }, []);

  const sortedTracks = [...library].sort((a, b) => {
    const aVal = a[sortBy]?.toLowerCase() || '';
    const bVal = b[sortBy]?.toLowerCase() || '';

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSortRequest = (columnId) => {
    if (sortBy === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortDirection('asc');
    }
  };

  const handleAddTrack = async (newTrack) => {
    try {
      await trackService.addTrack(newTrack);
      setAddTrackFormOpen(false);
      
      setLibrary((prevTracks) => [...prevTracks, newTrack]);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleToEditMode = (track) => {
    setEditTrackFormOpen(true);
    setTrackToEdit(track);
  }

  const handleQuitEditMode = () => {
    setEditTrackFormOpen(false);
    setTrackToEdit(null);
  }

  const handleEditTrack = async (track) => {
    try {
      await trackService.updateTrack(track.id, track);
      setEditTrackFormOpen(false);
      setLibrary((prevTracks) => prevTracks.map(t => (t.id === track.id ? track : t)));
    } catch (error) {
      console.error("Error updating track:", error);
    }
  }

  const handleDeleteTrack = async (track) => {
    try {
      if (window.confirm(`Are you sure you want to delete the track "${track.title}"?`)) {
        await trackService.deleteTrack(track.id);
        setLibrary((prevTracks) => prevTracks.filter(t => t.id !== track.id));
      }
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: 'auto', mt: 4 }}>
        <h1>Playlist Managing</h1>
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => setAddTrackFormOpen(true)}>Add New Track</Button>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(({ id, label }) => (
                <TableCell key={id}>
                  {(id === 'title' || id === 'composer' || id === 'category') ? (
                    <TableSortLabel
                      active={sortBy === id}
                      direction={sortBy === id ? sortDirection : 'asc'}
                      onClick={() => handleSortRequest(id)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedTracks.map((track, i) => (
              <TableRow key={i}>
                <TableCell>{track.title}</TableCell>
                <TableCell>{track.composer}</TableCell>
                <TableCell>{track.performer || '-'}</TableCell>
                <TableCell>{track.category}</TableCell>
                <TableCell>
                  <a href={track.url} target="_blank" rel="noreferrer">Link</a>
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleToEditMode(track)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteTrack(track)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TrackForm
        formTitle="Add New Track"
        open={addTrackFormOpen}
        onClose={() => setAddTrackFormOpen(false)}
        onSubmit={handleAddTrack}
      />

      <TrackForm
        formTitle="Edit Track"
        open={editTrackFormOpen}
        onClose={handleQuitEditMode}
        onSubmit={handleEditTrack}
        initialData={trackToEdit}
      />
    </>
  );
}

export default AdminPage;
