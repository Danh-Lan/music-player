import { useState, useEffect } from 'react';
import playlistService from '../services/playlists';
import AddTrackDialog from '../components/AddTrackForm';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TableSortLabel, Button
} from '@mui/material';

function AdminPage() {
  const [playlist, setPlaylist] = useState([]);
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

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const fetchedPlaylist = await playlistService.getPlaylists();
        setPlaylist(fetchedPlaylist);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }

    fetchPlaylist();
  }, []);

  const sortedTracks = [...playlist].sort((a, b) => {
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
      await playlistService.addTrack(newTrack);
      setAddTrackFormOpen(false);
      
      setPlaylist((prevTracks) => [...prevTracks, newTrack]);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleEditTrack = (track) => {
    // Logic to edit a track
    alert(`Edit track functionality not implemented yet for ${track.title}.`);
  }

  const handleDeleteTrack = (track) => {
    // Logic to delete a track
    alert(`Delete track functionality not implemented yet for ${track.title}.`);
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
                  <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEditTrack(track)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteTrack(track)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddTrackDialog
        open={addTrackFormOpen}
        onClose={() => setAddTrackFormOpen(false)}
        onSubmit={handleAddTrack}
      />
    </>
  );
}

export default AdminPage;
