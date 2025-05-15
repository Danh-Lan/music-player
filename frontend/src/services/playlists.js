import axios from 'axios';
const baseUrl = '/api/playlists';

const getPlaylists = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
}

const createPlaylistItem = async (playlistItem) => {
  try {
    const response = await axios.post(baseUrl, playlistItem);
    return response.data;
  } catch (error) {
    console.error('Error creating playlist item:', error);
    throw error;
  }
}

export default {
  getPlaylists,
  createPlaylistItem
}