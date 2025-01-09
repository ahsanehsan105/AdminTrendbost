import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Box from '@mui/material/Box';
import Header from '../component/Header';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast, { Toaster } from 'react-hot-toast';

const OrdersDetail = () => {
  const initialTransactions = [
    { id: 1, userName: 'John Doe', date: '2025-01-01', orderId: 'TXN001', platformName: 'Tiktok', features: 'Likes', url: 'https://example.com/post/1', status: 'Pending', topUser: 30 },
    { id: 2, userName: 'Jane Smith', date: '2025-01-02', orderId: 'TXN002', platformName: 'Facebook', features: 'Comments', url: 'https://example.com/post/2', status: 'Processing', topUser: 50 },
    { id: 3, userName: 'Alice Johnson', date: '2025-01-03', orderId: 'TXN003', platformName: 'Facebook', features: 'Followers', url: 'https://example.com/post/3', status: 'Completed', topUser: 70 },
    { id: 4, userName: 'Bob Brown', date: '2025-01-04', orderId: 'TXN004', platformName: 'Twitter', features: 'Likes', url: 'https://example.com/post/4', status: 'Pending', topUser: 90 },
    { id: 5, userName: 'Charlie Davis', date: '2025-01-05', orderId: 'TXN005', platformName: 'Instagram', features: 'Comments', url: 'https://example.com/post/5', status: 'Processing', topUser: 100 },
    { id: 6, userName: 'Diana Evans', date: '2025-01-06', orderId: 'TXN006', platformName: 'TikTok Live', features: 'Audience', url: 'https://example.com/post/6', status: 'Completed', topUser: 30 },
    { id: 7, userName: 'Ethan Harris', date: '2025-01-07', orderId: 'TXN007', platformName: 'Tiktok', features: 'Likes', url: 'https://example.com/post/7', status: 'Pending', topUser: 50 },
    { id: 8, userName: 'Fiona Green', date: '2025-01-08', orderId: 'TXN008', platformName: 'Instagram', features: 'Followers', url: 'https://example.com/post/8', status: 'Declined', topUser: 70 },
    { id: 9, userName: 'George King', date: '2025-01-09', orderId: 'TXN009', platformName: 'Twitter', features: 'Likes', url: 'https://example.com/post/9', status: 'Completed', topUser: 90 },
    { id: 10, userName: 'Hannah Lee', date: '2025-01-10', orderId: 'TXN010', platformName: 'Tiktok', features: 'Comments', url: 'https://example.com/post/10', status: 'Pending', topUser: 100 },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [status, setStatus] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    id: '',
    orderId: '',
    platformName: '',
    features: '',
    url: '',
    status: '',
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#f5bc42';
      case 'Processing':
        return '#2196f3';
      case 'Completed':
        return '#4caf50';
      case 'Declined':
        return '#f54242';
      default:
        return 'inherit';
    }
  };

  const handleSearchChange = (field, value) => {
    setSearchFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.keys(searchFilter).every((key) =>
      transaction[key].toString().toLowerCase().includes(searchFilter[key].toLowerCase())
    )
  );

  const columns = [
    {
      field: 'id',
      headerName: 'User ID',
      width: 85,
      renderHeader: () => (
        <div>
          <Typography>User ID</Typography>
          <TextField
            variant="standard"
            value={searchFilter.id}
            onChange={(e) => handleSearchChange('id', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'orderId',
      headerName: 'Order ID',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Order ID</Typography>
          <TextField
            variant="standard"
            value={searchFilter.orderId}
            onChange={(e) => handleSearchChange('orderId', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'platformName',
      headerName: 'Platform Name',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Platform Name</Typography>
          <TextField
            variant="standard"
            value={searchFilter.platformName}
            onChange={(e) => handleSearchChange('platformName', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'features',
      headerName: 'Features',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Features</Typography>
          <TextField
            variant="standard"
            value={searchFilter.features}
            onChange={(e) => handleSearchChange('features', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'url',
      headerName: 'Post URL',
      width: 300,
      renderHeader: () => (
        <div>
          <Typography>Post URL</Typography>
          <TextField
            variant="standard"
            value={searchFilter.url}
            onChange={(e) => handleSearchChange('url', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Order Status',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Order Status</Typography>
          <TextField
            variant="standard"
            value={searchFilter.status}
            onChange={(e) => handleSearchChange('status', e.target.value)}
          />
        </div>
      ),
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: getStatusColor(params.value),
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'preview',
      headerName: 'Preview',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleEyeClick(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const handleEyeClick = (order) => {
    setSelectedOrder(order);
    setStatus(order.status); 
    setShowOrderDetails(true);
  };

  const handleBackClick = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      const updatedTransactions = transactions.map((order) => {
        if (order.id === selectedOrder.id) {
          return { ...order, status: status };
        }
        return order;
      });
      setTransactions(updatedTransactions);
      setSelectedOrder({ ...selectedOrder, status: status });
      toast.success('Status updated successfully');
    }
  };

  return (
    <>
      <Header />
      <Toaster />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3,width: "80vh" }}>
          {!showOrderDetails ? (
            <>
              <Typography variant="h4" sx={{ marginTop: 3,fontWeight: 'bold' }}>Orders Detail</Typography>
              <Box sx={{ height: 600, width: '100%', marginTop: 3, overflowX: 'auto' }}>
                <DataGrid
                  rows={filteredTransactions}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10]}
                  sx={{
                    '& .MuiDataGrid-cell': { padding: '8px' },
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
                    '& .MuiDataGrid-virtualScrollerContent': { width: '100%' },
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              <IconButton onClick={handleBackClick} sx={{ marginBottom: 2, marginTop: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 3 }}>
                Order Details
              </Typography>
              {selectedOrder && (
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
                            defaultValue={selectedOrder.userName}
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
                            defaultValue={selectedOrder.orderId}
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
                            defaultValue={selectedOrder.platformName}
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
                            defaultValue={selectedOrder.features}
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
                            label="No #"
                            defaultValue={selectedOrder.topUser}
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
                            defaultValue={selectedOrder.date}
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
                            label="Post URL"
                            defaultValue={selectedOrder.url}
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
                            value={selectedOrder.status}
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
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrdersDetail;