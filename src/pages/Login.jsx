import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy admin credentials
    const adminUsername = 'admin123';
    const adminPassword = 'Admin';

    // Check if the entered credentials match the dummy admin credentials
    if (userName === adminUsername && password === adminPassword) {
      login();
      toast.success('Admin logged in successfully!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a142f5',
      }}
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom color="purple">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'purple',
                '&:hover': {
                  backgroundColor: 'darkpurple'
                },
                marginTop: 2
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </Box>
  );
};

export default Login;