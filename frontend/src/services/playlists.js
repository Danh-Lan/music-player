import axios from 'axios';

const baseUrl = '/api/playlists';

const getToken = () => {
  return localStorage.getItem('token');
}

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
    const token = getToken();
    const response = await axios.post(baseUrl, playlistItem, {
      headers: {
        'x-admin-token': token
      }
    });
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