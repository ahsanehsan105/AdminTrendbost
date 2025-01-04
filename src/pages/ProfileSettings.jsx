import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../component/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';

const ProfileSettings = () => {
  // Dummy data for user
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '',
    picture: null,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [passwordsMismatch, setPasswordsMismatch] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      picture: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Updated User:', user);
    toast.success('Profile updated successfully');
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (user.newPassword !== user.confirmNewPassword) {
      setPasswordsMismatch(true);
      toast.error('Your new password and confirm new password are not the same');
      return;
    }
    setPasswordsMismatch(false);
    // Add password update logic here
    console.log('Password Updated:', user.oldPassword, user.newPassword, user.confirmNewPassword);
    toast.success('Password updated successfully');
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field],
    }));
  };

  return (
    <>
      <Header />
      <Toaster />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ boxShadow: 2, padding: 3, borderRadius: 2, width: '80%', minWidth: 300, marginBottom: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
              Account Settings
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="standard"
                  value={user.firstName}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    style: { borderBottom: '1px solid #000' },
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  value={user.lastName}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    style: { borderBottom: '1px solid #000' },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                  label="Email"
                  name="email"
                  variant="standard"
                  value={user.email}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    style: { borderBottom: '1px solid #000' },
                  }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  variant="standard"
                  value={user.phone}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    style: { borderBottom: '1px solid #000' },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  fullWidth
                  inputProps={{
                    accept: 'image/*',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" color="secondary">
                  Update
                </Button>
              </Box>
            </form>
          </Box>
          <Box sx={{ boxShadow: 2, padding: 3, borderRadius: 2, width: '80%', minWidth: 300 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
              Change Password
            </Typography>
            <form onSubmit={handlePasswordUpdate}>
              <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                  label="Old Password"
                  name="oldPassword"
                  type={showPasswords.oldPassword ? 'text' : 'password'}
                  variant="standard"
                  value={user.oldPassword}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    style: { borderBottom: '1px solid #000' },
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('oldPassword')}
                      >
                        {showPasswords.oldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type={showPasswords.newPassword ? 'text' : 'password'}
                  variant="standard"
                  value={user.newPassword}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    style: {
                      borderBottom: passwordsMismatch && user.newPassword !== user.confirmNewPassword
                        ? '1px solid red'
                        : '1px solid #000'
                    },
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('newPassword')}
                      >
                        {showPasswords.newPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type={showPasswords.confirmNewPassword ? 'text' : 'password'}
                  variant="standard"
                  value={user.confirmNewPassword}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    style: {
                      borderBottom: passwordsMismatch && user.newPassword !== user.confirmNewPassword
                        ? '1px solid red'
                        : '1px solid #000'
                    },
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('confirmNewPassword')}
                      >
                        {showPasswords.confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" color="secondary">
                  Update Password
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileSettings;