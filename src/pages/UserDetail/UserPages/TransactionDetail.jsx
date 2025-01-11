import React from "react";
import { Typography, Box, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../component/Header";
import Sidebar from "../../../component/Sidebar";

const TransactionDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { transaction, user } = location.state;

    // Define columns based on platform type
    const columns = user.platform === "TikTok Live" ? [
        { field: "id", headerName: "Transaction ID", width: 150 },
        { field: "liveAudience", headerName: "No. of Live Audience", width: 200 },
        { field: "dummyUrl", headerName: "Dummy URL", width: 250, renderCell: (params) => (
            <span>{`https://example.com/post/${params.row.id}`}</span>
        )},
        { field: "status", headerName: "Status", width: 150 },
    ] : [
        { field: "id", headerName: "Transaction ID", width: 150 },
        { field: "likes", headerName: "No. of Likes", width: 150 },
        { field: "comments", headerName: "No. of Comments", width: 150 },
        { field: "followers", headerName: "No. of Followers", width: 150 },
        { field: "dummyUrl", headerName: "Dummy URL", width: 250, renderCell: (params) => (
            <span>{`https://example.com/post/${params.row.id}`}</span>
        )},
        { field: "status", headerName: "Status", width: 150 },
    ];

    // Define rows based on platform type
    const rows = user.platform === "TikTok Live" ? [
        { id: 1, liveAudience: 300, status: "Processing" },
        { id: 2, liveAudience: 400, status: "Pending" },
        // Add more rows as needed
    ] : [
        { id: 1, likes: 100, comments: null, followers: null, status: "Processing" },
        { id: 2, likes: null, comments: 100, followers: null, status: "Pending" },
        { id: 3, likes: null, comments: null, followers: 200, status: "Completed" },
        // Add more rows as needed
    ];

    return (
        <>
            <Header />
            <Box height={30} />
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: "90vh" }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ marginBottom: 2, marginTop: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 3 }}>
                        Transaction Details
                    </Typography>
                    <Typography variant="h6">{user.platform} - {user.plan}</Typography>
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {user.platform !== "TikTok Live" ? (
                            <>
                                <Grid item xs={4}>
                                    <Box sx={{ padding: 2, boxShadow: 1, border: "1px solid #ddd" }}>
                                        <Typography variant="h6">Likes</Typography>
                                        <Typography>Consumed: {transaction.totalLikes}</Typography>
                                        <Typography>Remaining: {transaction.remainingLikes}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ padding: 2, boxShadow: 1, border: "1px solid #ddd" }}>
                                        <Typography variant="h6">Comments</Typography>
                                        <Typography>Consumed: {transaction.totalComments}</Typography>
                                        <Typography>Remaining: {transaction.remainingComments}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ padding: 2, boxShadow: 1, border: "1px solid #ddd" }}>
                                        <Typography variant="h6">Followers</Typography>
                                        <Typography>Consumed: {transaction.totalFollowers}</Typography>
                                        <Typography>Remaining: {transaction.remainingFollowers}</Typography>
                                    </Box>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Box sx={{ padding: 2, boxShadow: 1, border: "1px solid #ddd" }}>
                                    <Typography variant="h6">No. of Live Audience</Typography>
                                    <Typography>Consumed: {transaction.totalAudience - transaction.remainingAudience}</Typography>
                                    <Typography>Remaining: {transaction.remainingAudience}</Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 3 }}>
                        Transaction Details
                    </Typography>
                    <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default TransactionDetail;