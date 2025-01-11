import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../../component/Sidebar';
import Header from '../../../component/Header';
import toast, { Toaster } from 'react-hot-toast';

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state;
  const [status, setStatus] = useState(order.status);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    // Update status logic here
    toast.success('Status updated successfully');
  };

  return (
    <>
      <Header />
      <Toaster />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <IconButton onClick={handleBackClick} sx={{ marginBottom: 2, marginTop: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            Order Details
          </Typography>
          {order && (
            <Grid container spacing={2}>
              <Grid item xs={0.5}></Grid>
              <Grid item xs={7}>
                <Box sx={{ boxShadow: 1, border: '1px solid #ddd', padding: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Order Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="User Name"
                        defaultValue={order.userName}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Order ID"
                        defaultValue={order.orderId}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Platform Name"
                        defaultValue={order.platformName}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Features"
                        defaultValue={order.features}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Payment Method"
                        defaultValue={order.paymentMethod}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        defaultValue={order.date}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Status"
                        value={status}
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ padding: 2, boxShadow: 1, border: '1px solid #ddd' }}>
                  <Typography variant="h6">Update Status</Typography>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      label="Status"
                      variant="standard"
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Declined">Declined</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" onClick={handleUpdateStatus}>
                    Update Status
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderDetail;