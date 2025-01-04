import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../component/Header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Toaster, toast } from 'react-hot-toast';

const generateRandomPackages = () => ({
  Basic: {
    Likes: Math.floor(Math.random() * 100),
    Comments: Math.floor(Math.random() * 100),
    Followers: Math.floor(Math.random() * 100),
    'Live Audience': Math.floor(Math.random() * 100),
    monthlyPrice: Math.floor(Math.random() * 100),
    yearlyPrice: Math.floor(Math.random() * 200),
  },
  Advanced: {
    Likes: Math.floor(Math.random() * 200),
    Comments: Math.floor(Math.random() * 200),
    Followers: Math.floor(Math.random() * 200),
    'Live Audience': Math.floor(Math.random() * 200),
    monthlyPrice: Math.floor(Math.random() * 200),
    yearlyPrice: Math.floor(Math.random() * 400),
  },
  Premium: {
    Likes: Math.floor(Math.random() * 300),
    Comments: Math.floor(Math.random() * 300),
    Followers: Math.floor(Math.random() * 300),
    'Live Audience': Math.floor(Math.random() * 300),
    monthlyPrice: Math.floor(Math.random() * 300),
    yearlyPrice: Math.floor(Math.random() * 600),
  },
});

const PackageManagement = () => {
  const platforms = [
    { name: 'TikTok', icon: faTiktok, description: 'Manage and boost your TikTok account.' },
    { name: 'TikTok Live', icon: faTiktok, description: 'Enhance your TikTok Live experience.' },
    { name: 'Facebook', icon: faFacebook, description: 'Optimize your Facebook growth strategy.' },
    { name: 'Instagram', icon: faInstagram, description: 'Boost your Instagram followers and engagement.' },
    { name: 'Twitter', icon: faTwitter, description: 'Enhance your Twitter presence and engagement.' },
  ];

  const initialPackageDetails = {
    'TikTok': [
      { feature: 'Likes', get: 1, price: 10, monthlyPrice: 10, yearlyPrice: 100 },
      { feature: 'Comments', get: 1, price: 15, monthlyPrice: 15, yearlyPrice: 150 },
      { feature: 'Followers', get: 1, price: 20, monthlyPrice: 20, yearlyPrice: 200 },
    ],
    'TikTok Live': [
      { feature: 'Live Audience', get: 1, price: 25, monthlyPrice: 25, yearlyPrice: 250 },
    ],
    'Facebook': [
      { feature: 'Likes', get: 1, price: 10, monthlyPrice: 10, yearlyPrice: 100 },
      { feature: 'Comments', get: 1, price: 15, monthlyPrice: 15, yearlyPrice: 150 },
      { feature: 'Followers', get: 1, price: 20, monthlyPrice: 20, yearlyPrice: 200 },
    ],
    'Instagram': [
      { feature: 'Likes', get: 1, price: 10, monthlyPrice: 10, yearlyPrice: 100 },
      { feature: 'Comments', get: 1, price: 15, monthlyPrice: 15, yearlyPrice: 150 },
      { feature: 'Followers', get: 1, price: 20, monthlyPrice: 20, yearlyPrice: 200 },
    ],
    'Twitter': [
      { feature: 'Likes', get: 1, price: 10, monthlyPrice: 10, yearlyPrice: 100 },
      { feature: 'Comments', get: 1, price: 15, monthlyPrice: 15, yearlyPrice: 150 },
      { feature: 'Followers', get: 1, price: 20, monthlyPrice: 20, yearlyPrice: 200 },
    ],
  };

  const initialAvailablePackages = {
    'TikTok': generateRandomPackages(),
    'TikTok Live': generateRandomPackages(),
    'Facebook': generateRandomPackages(),
    'Instagram': generateRandomPackages(),
    'Twitter': generateRandomPackages(),
  };

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [packageDetails, setPackageDetails] = useState(initialPackageDetails);
  const [availablePackages, setAvailablePackages] = useState(initialAvailablePackages);

  const handleManageClick = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleDetailChange = (index, key, value) => {
    const updatedDetails = [...packageDetails[selectedPlatform.name]];
    updatedDetails[index][key] = value;
    setPackageDetails({
      ...packageDetails,
      [selectedPlatform.name]: updatedDetails
    });
  };

  const handlePackageChange = (plan, key, value) => {
    const updatedPackages = { ...availablePackages };
    updatedPackages[selectedPlatform.name][plan][key] = value;
    setAvailablePackages(updatedPackages);
  };

  const handleUpdateClick = (table) => {
    toast.success(`Updated ${table} package details`);
    console.log(`Updated ${table} package details:`, table === 'Customized' ? packageDetails[selectedPlatform.name] : availablePackages[selectedPlatform.name]);
  };

  const renderAdditionalTable = (platform) => {
    const features = platform.name === 'TikTok Live' ? ['Live Audience'] : ['Likes', 'Comments', 'Followers'];
    const plans = ['Basic', 'Advanced', 'Premium', ...Object.keys(availablePackages[platform.name]).filter(plan => !['Basic', 'Advanced', 'Premium'].includes(plan))];

    return (
      <>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Monthly Packages Available Prices
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              <TableRow>
                <TableCell>Plans</TableCell>
                {features.map((feature, index) => (
                  <TableCell key={index}>{feature}</TableCell>
                ))}
                <TableCell>Monthly Package Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan}>
                  <TableCell>{plan}</TableCell>
                  {features.map((feature, index) => (
                    <TableCell key={index}>
                      <TextField
                        variant="standard"
                        value={availablePackages[platform.name][plan][feature]}
                        onChange={(e) => handlePackageChange(plan, feature, e.target.value)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <TextField
                      variant="standard"
                      value={availablePackages[platform.name][plan].monthlyPrice}
                      onChange={(e) => handlePackageChange(plan, 'monthlyPrice', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => handleUpdateClick('Monthly')}>
            Update Monthly Packages
          </Button>
        </Box>
        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Yearly Packages Available Prices
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
              <TableRow>
                <TableCell>Plans</TableCell>
                {features.map((feature, index) => (
                  <TableCell key={index}>{feature}</TableCell>
                ))}
                <TableCell>Yearly Package Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan}>
                  <TableCell>{plan}</TableCell>
                  {features.map((feature, index) => (
                    <TableCell key={index}>
                      <TextField
                        variant="standard"
                        value={availablePackages[platform.name][plan][feature]}
                        onChange={(e) => handlePackageChange(plan, feature, e.target.value)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <TextField
                      variant="standard"
                      value={availablePackages[platform.name][plan].yearlyPrice}
                      onChange={(e) => handlePackageChange(plan, 'yearlyPrice', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => handleUpdateClick('Yearly')}>
            Update Yearly Packages
          </Button>
        </Box>
      </>
    );
  };

  return (
    <>
      <Header />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center' }}>
          <Toaster />
          {!selectedPlatform ? (
            <Box sx={{ width: '100%', maxWidth: 1000 }}>
              <Typography variant="h4" style={{ fontWeight: 'bold' }} sx={{ marginBottom: 3 }}>
                Package Management
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {platforms.map((platform) => (
                  <Grid item xs={12} md={6} lg={4} key={platform.name} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ width: 300 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                          <FontAwesomeIcon icon={platform.icon} size="2x" />
                          <Typography variant="h6">{platform.name}</Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {platform.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="contained" color="secondary" onClick={() => handleManageClick(platform)}>
                          Package List
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box sx={{ width: '100%', maxWidth: 1000 }}>
              <Button variant="contained" color="secondary" onClick={() => setSelectedPlatform(null)} sx={{ marginBottom: 3 }}>
                Back
              </Button>
              <Typography variant="h5" style={{ fontWeight: 'bold' }} sx={{ marginBottom: 3 }}>
                {selectedPlatform.name} Package Details
              </Typography>
              {renderAdditionalTable(selectedPlatform)}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Customized Packages Prices
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                    <TableRow>
                      <TableCell>Feature</TableCell>
                      <TableCell>Package/per</TableCell>
                      <TableCell>Package Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {packageDetails[selectedPlatform.name].map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{detail.feature}</TableCell>
                        <TableCell>
                          <TextField
                            variant="standard"
                            value={detail.get}
                            onChange={(e) => handleDetailChange(index, 'get', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            variant="standard"
                            value={detail.price} // Single price field
                            onChange={(e) => handleDetailChange(index, 'price', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                <Button variant="contained" color="secondary" onClick={() => handleUpdateClick('Customized')}>
                  Update Customized Packages
                </Button>
              </Box>

            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PackageManagement;