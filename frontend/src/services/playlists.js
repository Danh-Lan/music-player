import axios from 'axios';

const baseUrl = '/api/playlists';

const getToken = () => {
  return localStorage.getItem('token');
}

const authHeaders = () => {
  return {
    headers: {
      'x-admin-token': getToken()
    }
  }
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

const addTrack = async (playlistItem) => {
  try {
    const response = await axios.post(baseUrl, playlistItem, authHeaders());

    return response.data;
  } catch (error) {
    console.error('Error creating playlist item:', error);
    throw error;
  }
}

const playlistService = {
  getPlaylists,
  addTrack
}

export default playlistService;