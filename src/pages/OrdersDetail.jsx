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
    { id: 1, userName: 'John Doe', date: '2025-01-01', transactionId: 'TXN001', packageName: 'Basic', packagePrice: '$10', status: 'Pending', paymentMethod: 'Crypto Wallet', platformName: 'Tiktok' },
    { id: 2, userName: 'Jane Smith', date: '2025-01-02', transactionId: 'TXN002', packageName: 'Advanced', packagePrice: '$20', status: 'Processing', paymentMethod: 'Credit/Debit Card', platformName: 'Facebook' },
    { id: 3, userName: 'Alice Johnson', date: '2025-01-03', transactionId: 'TXN003', packageName: 'Premium', packagePrice: '$30', status: 'Completed', paymentMethod: 'PayPal', platformName: 'Facebook' },
    { id: 4, userName: 'Bob Brown', date: '2025-01-04', transactionId: 'TXN004', packageName: 'Customize', packagePrice: '$40', status: 'Pending', paymentMethod: 'Crypto Wallet', platformName: 'Twitter' },
    { id: 5, userName: 'Charlie Davis', date: '2025-01-05', transactionId: 'TXN005', packageName: 'Basic', packagePrice: '$10', status: 'Processing', paymentMethod: 'Credit/Debit Card', platformName: 'Instagram' },
    { id: 6, userName: 'Diana Evans', date: '2025-01-06', transactionId: 'TXN006', packageName: 'Advanced', packagePrice: '$20', status: 'Completed', paymentMethod: 'PayPal', platformName: 'TikTok Live' },
    { id: 7, userName: 'Ethan Harris', date: '2025-01-07', transactionId: 'TXN007', packageName: 'Premium', packagePrice: '$30', status: 'Pending', paymentMethod: 'Crypto Wallet', platformName: 'Tiktok' },
    { id: 8, userName: 'Fiona Green', date: '2025-01-08', transactionId: 'TXN008', packageName: 'Customize', packagePrice: '$40', status: 'Declined', paymentMethod: 'Credit/Debit Card', platformName: 'Instagram' },
    { id: 9, userName: 'George King', date: '2025-01-09', transactionId: 'TXN009', packageName: 'Basic', packagePrice: '$10', status: 'Completed', paymentMethod: 'PayPal', platformName: 'Twitter' },
    { id: 10, userName: 'Hannah Lee', date: '2025-01-10', transactionId: 'TXN010', packageName: 'Advanced', packagePrice: '$20', status: 'Pending', paymentMethod: 'Crypto Wallet', platformName: 'Tiktok' },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [status, setStatus] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    id: '',
    transactionId: '',
    packageName: '',
    packagePrice: '',
    status: '',
    paymentMethod: '',
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
      field: 'transactionId',
      headerName: 'Transaction ID',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Transaction ID</Typography>
          <TextField
            variant="standard"
            value={searchFilter.transactionId}
            onChange={(e) => handleSearchChange('transactionId', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'packageName',
      headerName: 'Package Name',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Package Name</Typography>
          <TextField
            variant="standard"
            value={searchFilter.packageName}
            onChange={(e) => handleSearchChange('packageName', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'packagePrice',
      headerName: 'Package Price',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Package Price</Typography>
          <TextField
            variant="standard"
            value={searchFilter.packagePrice}
            onChange={(e) => handleSearchChange('packagePrice', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Package Status',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Package Status</Typography>
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
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 180,
      renderHeader: () => (
        <div>
          <Typography>Payment Method</Typography>
          <TextField
            variant="standard"
            value={searchFilter.paymentMethod}
            onChange={(e) => handleSearchChange('paymentMethod', e.target.value)}
          />
        </div>
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
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 3 }}>
          {!showOrderDetails ? (
            <>
              <Typography variant="h4" sx={{ marginTop: 3 }}>Orders Detail</Typography>
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
                            label="Transaction ID"
                            defaultValue={selectedOrder.transactionId}
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
                            label="Package Name"
                            defaultValue={selectedOrder.packageName}
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
                            label="Package Price"
                            defaultValue={selectedOrder.packagePrice}
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
                            defaultValue={selectedOrder.paymentMethod}
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
                            label="Platform Name"
                            defaultValue={selectedOrder.platformName}
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