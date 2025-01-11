import React, { useState, useEffect } from "react";
import { Typography, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import toast, { Toaster } from "react-hot-toast";

const UsersDetail = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState({
    id: "",
    name: "",
    email: "",
    startDate: "",
    status: "",
  });

  const navigate = useNavigate();

  const packageData = {
    Basic: {
      TikTok: [
        {
          id: 1,
          name: "John Doe",
          plan: "Basic",
          status: "Active",
          phone: "1234567890",
          email: "john@example.com",
          startDate: "2024-01-01",
          platform: "TikTok",
          history: [
            {
              id: 1,
              package: "Advanced",
              platform: "Instagram",
              startDate: "2024-01-01",
              endDate: "2024-06-01",
              transactionId: "T1234",
              totalLikes: 1000,
              remainingLikes: 500,
              totalComments: 200,
              remainingComments: 100,
              totalFollowers: 5000,
              remainingFollowers: 2500,
            },
            {
              id: 2,
              package: "Premium",
              platform: "Twitter",
              startDate: "2023-01-01",
              endDate: "2023-12-31",
              transactionId: "T5678",
              totalLikes: 2000,
              remainingLikes: 1000,
              totalComments: 400,
              remainingComments: 200,
              totalFollowers: 10000,
              remainingFollowers: 5000,
            },
          ],
        },
      ],
      Facebook: [
        {
          id: 2,
          name: "Jane Doe",
          plan: "Basic",
          status: "Inactive",
          phone: "0987654321",
          email: "jane@example.com",
          startDate: "2024-01-01",
          platform: "Facebook",
          history: [],
        },
      ],
      Instagram: [
        {
          id: 3,
          name: "Jim Doe",
          plan: "Basic",
          status: "Active",
          phone: "1122334455",
          email: "jim@example.com",
          startDate: "2024-01-01",
          platform: "Instagram",
          history: [],
        },
      ],
      Twitter: [
        {
          id: 4,
          name: "Jack Doe",
          plan: "Basic",
          status: "Inactive",
          phone: "5566778899",
          email: "jack@example.com",
          startDate: "2024-01-01",
          platform: "Twitter",
          history: [],
        },
      ],
      "TikTok Live": [
        {
          id: 17,
          name: "Tom Doe",
          plan: "Basic",
          status: "Active",
          phone: "1231231234",
          email: "tom@example.com",
          startDate: "2024-01-01",
          platform: "TikTok Live",
          history: [],
        },
      ],
    },
    Advanced: {
      TikTok: [
        {
          id: 5,
          name: "Alex Smith",
          plan: "Advanced",
          status: "Active",
          phone: "1231231234",
          email: "alex@example.com",
          startDate: "2024-01-01",
          platform: "TikTok",
          history: [],
        },
      ],
      Facebook: [
        {
          id: 6,
          name: "Alice Smith",
          plan: "Advanced",
          status: "Inactive",
          phone: "3213214321",
          email: "alice@example.com",
          startDate: "2024-01-01",
          platform: "Facebook",
          history: [],
        },
      ],
      Instagram: [
        {
          id: 7,
          name: "Eva Smith",
          plan: "Advanced",
          status: "Active",
          phone: "4564564567",
          email: "eva@example.com",
          startDate: "2024-01-01",
          platform: "Instagram",
          history: [],
        },
      ],
      Twitter: [
        {
          id: 8,
          name: "Nathan Smith",
          plan: "Advanced",
          status: "Inactive",
          phone: "6546547654",
          email: "nathan@example.com",
          startDate: "2024-01-01",
          platform: "Twitter",
          history: [],
        },
      ],
      "TikTok Live": [
        {
          id: 18,
          name: "Nick Smith",
          plan: "Advanced",
          status: "Active",
          phone: "7778889990",
          email: "nick@example.com",
          startDate: "2024-01-01",
          platform: "TikTok Live",
          history: [],
        },
      ],
    },
    Premium: {
      TikTok: [
        {
          id: 9,
          name: "Emily Johnson",
          plan: "Premium",
          status: "Active",
          phone: "7897897890",
          email: "emily@example.com",
          startDate: "2024-01-01",
          platform: "TikTok",
          history: [],
        },
      ],
      Facebook: [
        {
          id: 10,
          name: "Elena Johnson",
          plan: "Premium",
          status: "Inactive",
          phone: "9879870987",
          email: "elena@example.com",
          startDate: "2024-01-01",
          platform: "Facebook",
          history: [],
        },
      ],
      Instagram: [
        {
          id: 11,
          name: "Samuel Johnson",
          plan: "Premium",
          status: "Active",
          phone: "1112223334",
          email: "samuel@example.com",
          startDate: "2024-01-01",
          platform: "Instagram",
          history: [],
        },
      ],
      Twitter: [
        {
          id: 12,
          name: "Jade Johnson",
          plan: "Premium",
          status: "Inactive",
          phone: "4445556667",
          email: "jade@example.com",
          startDate: "2024-01-01",
          platform: "Twitter",
          history: [],
        },
      ],
      "TikTok Live": [
        {
          id: 19,
          name: "Sophie Johnson",
          plan: "Premium",
          status: "Active",
          phone: "8887776665",
          email: "sophie@example.com",
          startDate: "2024-01-01",
          platform: "TikTok Live",
          history: [],
        },
      ],
    },
    Customize: {
      TikTok: [
        {
          id: 13,
          name: "Chris Brown",
          plan: "Customize",
          status: "Active",
          phone: "7778889990",
          email: "chris@example.com",
          startDate: "2024-01-01",
          platform: "TikTok",
          history: [],
        },
      ],
      Facebook: [
        {
          id: 14,
          name: "Dan Brown",
          plan: "Customize",
          status: "Inactive",
          phone: "9998887770",
          email: "dan@example.com",
          startDate: "2024-01-01",
          platform: "Facebook",
          history: [],
        },
      ],
      Instagram: [
        {
          id: 15,
          name: "Kelly Brown",
          plan: "Customize",
          status: "Active",
          phone: "2223334445",
          email: "kelly@example.com",
          startDate: "2024-01-01",
          platform: "Instagram",
          history: [],
        },
      ],
      Twitter: [
        {
          id: 16,
          name: "Brian Brown",
          plan: "Customize",
          status: "Inactive",
          phone: "5556667778",
          email: "brian@example.com",
          startDate: "2024-01-01",
          platform: "Twitter",
          history: [],
        },
      ],
      "TikTok Live": [
        {
          id: 20,
          name: "Lilly Brown",
          plan: "Customize",
          status: "Active",
          phone: "3332221110",
          email: "lilly@example.com",
          startDate: "2024-01-01",
          platform: "TikTok Live",
          history: [],
        },
      ],
    },
  };
  useEffect(() => {
    const allUsers = Object.values(packageData).flatMap((packageGroup) =>
      Object.values(packageGroup).flat()
    );
    setUsers(allUsers);
  }, []);

  const handleSearchChange = (field, value) => {
    setSearch((prevSearch) => ({ ...prevSearch, [field]: value }));
  };

  const handleEyeClick = (user) => {
    navigate(`/users-detail/user/${user.id}`, { state: { user } });
  };

  const filteredUsers = users.filter((user) =>
    Object.keys(search).every((key) =>
      user[key]?.toString().toLowerCase().includes(search[key].toLowerCase())
    )
  );

  const columns = [
    { field: "id", headerName: "User ID", width: 150 },
    { field: "name", headerName: "User Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "startDate", headerName: "Registration Date", width: 150 },
    { field: "status", headerName: "User Status", width: 150 },
    {
      field: "preview",
      headerName: "Preview",
      width: 100,
      renderCell: (params) => (
        <VisibilityIcon
          sx={{ cursor: "pointer", color: "gray" }}
          onClick={() => handleEyeClick(params.row)}
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      <Toaster />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: '90vh' }}>
          <Typography variant="h4" sx={{ marginBottom: 3, marginTop: 3, fontWeight: 'bold' }}>
            Users 
          </Typography>

          <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
            <TextField
              label="User ID"
              variant="outlined"
              size="small"
              value={search.id}
              onChange={(e) => handleSearchChange("id", e.target.value)}
            />
            <TextField
              label="User Name"
              variant="outlined"
              size="small"
              value={search.name}
              onChange={(e) => handleSearchChange("name", e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              value={search.email}
              onChange={(e) => handleSearchChange("email", e.target.value)}
            />
            <TextField
              label="Registration Date"
              variant="outlined"
              size="small"
              value={search.startDate}
              onChange={(e) => handleSearchChange("startDate", e.target.value)}
            />
            <TextField
              label="User Status"
              variant="outlined"
              size="small"
              value={search.status}
              onChange={(e) => handleSearchChange("status", e.target.value)}
            />
          </Box>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UsersDetail;