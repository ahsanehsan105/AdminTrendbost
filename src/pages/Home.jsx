import React from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import Box from '@mui/material/Box';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Paper from '@mui/material/Paper';
import { useSpring, animated } from '@react-spring/web';

const data = [
  { platform: 'TikTok', subscribers: 1200 },
  { platform: 'Facebook', subscribers: 950 },
  { platform: 'Instagram', subscribers: 1400 },
  { platform: 'TikTok Live', subscribers: 1100 },
  { platform: 'Twitter', subscribers: 800 },
];

const getMaxSalesPlatform = () => {
  const max = Math.max(...data.map((d) => d.subscribers));
  const maxPlatform = data.find((d) => d.subscribers === max)?.platform || 'N/A';
  return maxPlatform;
};

const Home = () => {
  const totalRevenue = 500; 
  const maxSalesPlatform = getMaxSalesPlatform();

  const { number } = useSpring({
    from: { number: 0 },
    number: totalRevenue,
    delay: 0,
    config: { duration: 2000 },
  });

  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Bar Chart Component */}
          <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', gap: 3, marginTop: 5 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <h3>Total Revenue</h3>
                <animated.p style={{ fontSize: '24px', margin: 0 }}>
                  {number.to((n) => `$${n.toFixed(0)}`)}
                </animated.p>
                <p style={{ fontSize: '12px', color: 'gray' }}>Total revenue generated so far by the company</p>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <h3>Max Sales Platform</h3>
                <p style={{ fontSize: '24px', margin: 0 }}>{maxSalesPlatform}</p>
                <p style={{ fontSize: '12px', color: 'gray' }}>Platform with the highest sales</p>
              </Paper>
            </Box>
            {/* Chart Container */}
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: 2,
                flex: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="subscribers" fill="#8884d8" />
              </BarChart>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;