import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import { TextField, Button, Typography, Paper } from '@mui/material';

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginService.login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/admin');
      setError('');
    } catch (error) {
      setError('Username or password is incorrect');
    }
  };

  return (
    <Paper 
      component="form"
      onSubmit={handleLogin}
      elevation={5}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 10,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Admin Login
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        autoFocus
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      <Button variant="contained" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Paper>
  );
}

export default AdminLogin;
