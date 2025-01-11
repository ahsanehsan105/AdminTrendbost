import React, { useState } from "react";
import { Typography, Grid, Box, TextField, FormControl, Select, MenuItem, InputLabel, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../component/Header";
import Sidebar from "../../../component/Sidebar";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const [status, setStatus] = useState(user.status);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    // Update status logic here
    toast.success("Status updated successfully");
  };

  const handlePreviewClick = (transaction) => {
    navigate(`/users-detail/user/${user.id}/transaction/${transaction.id}`, {
      state: { transaction, user }
    });
  };

  // Preparing rows for the DataGrid
  const currentPackage = {
    id: 0,
    transactionId: "N/A",
    package: user.plan,
    platform: user.platform,
    startDate: user.startDate,
    endDate: "Ongoing",
    totalLikes: user.totalLikes || 0,
    remainingLikes: user.remainingLikes || 0,
    totalComments: user.totalComments || 0,
    remainingComments: user.remainingComments || 0,
    totalFollowers: user.totalFollowers || 0,
    remainingFollowers: user.remainingFollowers || 0,
    totalAudience: user.totalAudience || 0,
    remainingAudience: user.remainingAudience || 0
  };

  const rows = [
    currentPackage,
    ...user.history.map((historyItem, index) => ({
      ...historyItem,
      id: index + 1,
    }))
  ];

  const columns = [
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    { field: "package", headerName: "Package Name", width: 150 },
    { field: "platform", headerName: "Platform Name", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    {
      field: "preview",
      headerName: "Preview",
      width: 100,
      renderCell: (params) => (
        <VisibilityIcon
          sx={{ cursor: "pointer", color: "gray" }}
          onClick={() => handlePreviewClick(params.row)}
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <IconButton onClick={handleBackClick} sx={{ marginBottom: 2, marginTop: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            User Details
          </Typography>
          {user && (
            <Grid container spacing={2}>
              <Grid item xs={0.5}></Grid>
              <Grid item xs={7}>
                <Box sx={{ boxShadow: 1, border: "1px solid #ddd", padding: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    User Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="User ID"
                        defaultValue={user.id}
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
                        defaultValue={user.name}
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
                        label="Registration Date"
                        defaultValue={user.startDate}
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
                        label="Phone"
                        defaultValue={user.phone}
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
                        label="Email"
                        defaultValue={user.email}
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
                        label="Current Status"
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
                <Box sx={{ padding: 2, boxShadow: 1, border: "1px solid #ddd" }}>
                  <Typography variant="h6">Status</Typography>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      label="Status"
                      variant="standard"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" onClick={handleUpdateStatus}>
                    Update Status
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  User History
                </Typography>
                <Box sx={{ height: 400, width: "100%", margin: "0 auto" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserDetail;