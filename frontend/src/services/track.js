import axios from 'axios';

const baseUrl = '/api/tracks';

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

const getLibrary = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
}

const addTrack = async (track) => {
  try {
    const response = await axios.post(baseUrl, track, authHeaders());

    return response.data;
  } catch (error) {
    console.error('Error adding track:', error);
    throw error;
  }
}

const updateTrack = async (id, track) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, track, authHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating track:', error);
    throw error;
  }
}

const deleteTrack = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, authHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting track:', error);
    throw error;
  }
}

const trackService = {
  getLibrary,
  addTrack,
  updateTrack,
  deleteTrack
}

export default trackService;