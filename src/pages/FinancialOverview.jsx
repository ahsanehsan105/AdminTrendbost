import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import Box from '@mui/material/Box';
import { Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AnimatedRevenue from './AnimatedRevinew'; // Import the new component

const initialSubscriptionData = [
  { id: 1, userId: 'user1', username: 'john_doe', platform: 'TikTok', packageName: 'Basic', price: '$20', transactionId: 'TXN12345', paymentMethod: 'Paypal' },
  { id: 2, userId: 'user2', username: 'jane_doe', platform: 'Facebook', packageName: 'Standard', price: '$30', transactionId: 'TXN12346', paymentMethod: 'Credit/Debit Card' },
  { id: 3, userId: 'user3', username: 'alice_smith', platform: 'Instagram', packageName: 'Premium', price: '$50', transactionId: 'TXN12347', paymentMethod: 'Wallet' },
  { id: 4, userId: 'user4', username: 'bob_jones', platform: 'TikTok Live', packageName: 'Basic', price: '$70', transactionId: 'TXN12348', paymentMethod: 'Paypal' },
  { id: 5, userId: 'user5', username: 'charlie_brown', platform: 'Twitter', packageName: 'Standard', price: '$20', transactionId: 'TXN12349', paymentMethod: 'Credit/Debit Card' },
  // Add more subscription data as needed
];

const FinancialOverview = () => {
  const [search, setSearch] = useState({
    userId: '',
    username: '',
    platform: '',
    packageName: '',
    price: '',
    transactionId: '',
    paymentMethod: ''
  });

  const [subscriptionData, setSubscriptionData] = useState(initialSubscriptionData);
  const [platformData, setPlatformData] = useState([]);

  useEffect(() => {
    // Calculate the revenue for each platform dynamically
    const calculatePlatformRevenue = () => {
      const revenueMap = {};
      subscriptionData.forEach((subscription) => {
        const { platform, price } = subscription;
        const priceValue = parseFloat(price.replace('$', ''));
        if (revenueMap[platform]) {
          revenueMap[platform] += priceValue;
        } else {
          revenueMap[platform] = priceValue;
        }
      });

      const updatedPlatformData = Object.keys(revenueMap).map((platform) => ({
        platform,
        revenue: revenueMap[platform],
      }));

      setPlatformData(updatedPlatformData);
    };

    calculatePlatformRevenue();
  }, [subscriptionData]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const filteredData = subscriptionData.filter((row) =>
    row.userId.toLowerCase().includes(search.userId.toLowerCase()) &&
    row.username.toLowerCase().includes(search.username.toLowerCase()) &&
    row.platform.toLowerCase().includes(search.platform.toLowerCase()) &&
    row.packageName.toLowerCase().includes(search.packageName.toLowerCase()) &&
    row.price.toLowerCase().includes(search.price.toLowerCase()) &&
    row.transactionId.toLowerCase().includes(search.transactionId.toLowerCase()) &&
    row.paymentMethod.toLowerCase().includes(search.paymentMethod.toLowerCase())
  );

  const columns = [
    {
      field: 'userId',
      headerName: 'User ID',
      width: 150,
      renderHeader: () => (
        <>
          <TextField
            label="Search User ID"
            name="userId"
            value={search.userId}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      renderHeader: () => (
        <>
          <TextField
            label="Search Username"
            name="username"
            value={search.username}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
    {
      field: 'platform',
      headerName: 'Platform',
      width: 150,
      renderHeader: () => (
        <>
          <TextField
            label="Search Platform"
            name="platform"
            value={search.platform}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
    {
      field: 'packageName',
      headerName: 'Package Name',
      width: 150,
      renderHeader: () => (
        <>
          <TextField
            label="Search Package"
            name="packageName"
            value={search.packageName}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      renderHeader: () => (
        <>
          <TextField
            label="Search Price"
            name="price"
            value={search.price}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
    {
      field: 'transactionId',
      headerName: 'Transaction ID',
      width: 180,
      renderHeader: () => (
        <>
          <TextField
            label="Search Transaction ID"
            name="transactionId"
            value={search.transactionId}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 180,
      renderHeader: () => (
        <>
          <TextField
            label="Search Payment Method"
            name="paymentMethod"
            value={search.paymentMethod}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </>
      )
    },
  ];

  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: '80%'  }}>
          <h1>Financial Overview</h1>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 3}}>
            {platformData.slice(0, 3).map((platform) => (
              <Box key={platform.platform} sx={{ flex: '1 1 calc(33.33% - 16px)' }}>
                <AnimatedRevenue
                  platform={platform.platform}
                  revenue={platform.revenue}
                />
              </Box>
            ))}
            {platformData.slice(3).map((platform) => (
              <Box key={platform.platform} sx={{ flex: '1 1 calc(50% - 16px)' }}>
                <AnimatedRevenue
                  platform={platform.platform}
                  revenue={platform.revenue}
                />
              </Box>
            ))}
          </Box>
          <h2>Platform Package Detail</h2>
          <Box sx={{ height: 400, overflowX: 'auto' }}>
            <Box sx={{ minWidth: 900 }}>
              <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                disableColumnMenu
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FinancialOverview;