import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import UsersDetail from './pages/UsersDetail';
import PackageManagement from './pages/PackageManagement';
import ProfileSettings from './pages/ProfileSettings';
import OrdersDetail from './pages/OrdersDetail';
import FinancialOverview from './pages/FinancialOverview';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './Context/AuthContext';

function App() {
  // Wrap the entire app with AuthProvider
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

function RoutesWrapper() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users-detail" element={<UsersDetail />} />
      <Route path="/orders-detail" element={<OrdersDetail />} />
      <Route path="/package-management" element={<PackageManagement />} />
      <Route path="/financial-overview" element={<FinancialOverview />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  ) : (
    <Login />
  );
}

export default App;
