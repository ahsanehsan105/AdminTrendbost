import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import Box from '@mui/material/Box';
import Header from '../../component/Header';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Typography, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const OrdersDetail = () => {
  const initialTransactions = [
    { id: 1, userName: 'John Doe', date: '2025-01-01', transactionId: 'TXN001', platformName: 'Tiktok', subscription: 'Basic', paymentMethod: 'Credit Card', status: 'Pending', topUser: 30 },
    { id: 2, userName: 'Jane Smith', date: '2025-01-02', transactionId: 'TXN002', platformName: 'Facebook', subscription: 'Advanced', paymentMethod: 'PayPal', status: 'Processing', topUser: 50 },
    { id: 3, userName: 'Alice Johnson', date: '2025-01-03', transactionId: 'TXN003', platformName: 'Facebook', subscription: 'Premium', paymentMethod: 'Credit Card', status: 'Completed', topUser: 70 },
    { id: 4, userName: 'Bob Brown', date: '2025-01-04', transactionId: 'TXN004', platformName: 'Twitter', subscription: 'Premium', paymentMethod: 'PayPal', status: 'Pending', topUser: 90 },
    { id: 5, userName: 'Charlie Davis', date: '2025-01-05', transactionId: 'TXN005', platformName: 'Instagram', subscription: 'Advanced', paymentMethod: 'Credit Card', status: 'Processing', topUser: 100 },
    { id: 6, userName: 'Diana Evans', date: '2025-01-06', transactionId: 'TXN006', platformName: 'TikTok Live', subscription: 'Basic', paymentMethod: 'PayPal', status: 'Completed', topUser: 30 },
    { id: 7, userName: 'Ethan Harris', date: '2025-01-07', transactionId: 'TXN007', platformName: 'Tiktok', subscription: 'Advanced', paymentMethod: 'Credit Card', status: 'Pending', topUser: 50 },
    { id: 8, userName: 'Fiona Green', date: '2025-01-08', transactionId: 'TXN008', platformName: 'Instagram', subscription: 'Basic', paymentMethod: 'PayPal', status: 'Declined', topUser: 70 },
    { id: 9, userName: 'George King', date: '2025-01-09', transactionId: 'TXN009', platformName: 'Twitter', subscription: 'Advanced', paymentMethod: 'Credit Card', status: 'Completed', topUser: 90 },
    { id: 10, userName: 'Hannah Lee', date: '2025-01-10', transactionId: 'TXN010', platformName: 'Tiktok', subscription: 'Basic', paymentMethod: 'PayPal', status: 'Pending', topUser: 100 },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchFilter, setSearchFilter] = useState({
    id: '',
    transactionId: '',
    platformName: '',
    subscription: '',
    paymentMethod: '',
    status: '',
  });

  const navigate = useNavigate();

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
      field: 'subscription',
      headerName: 'Subscription',
      width: 140,
      renderHeader: () => (
        <div>
          <Typography>Subscription</Typography>
          <TextField
            variant="standard"
            value={searchFilter.Subscription}
            onChange={(e) => handleSearchChange('Subscription', e.target.value)}
          />
        </div>
      ),
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 140,
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
    navigate(`/order-details/${order.id}`, { state: { order } });
  };

  return (
    <>
      <Header />
      <Toaster />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: "80vh" }}>
          <Typography variant="h4" sx={{ marginTop: 3, fontWeight: 'bold' }}>Orders Detail</Typography>
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
        </Box>
      </Box>
    </>
  );
};

export default OrdersDetail;