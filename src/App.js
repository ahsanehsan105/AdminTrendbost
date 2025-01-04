import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import UsersDetail from './pages/UsersDetail';
import PackageManagement from './pages/PackageManagement';
import ProfileSettings from './pages/ProfileSettings';
import OrdersDetail from './pages/OrdersDetail';
import FinancialOverview from './pages/FinancialOverview';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/users-detail" exact element={<UsersDetail />} />
          <Route path="/orders-detail" exact element={<OrdersDetail />} />
          <Route path="/package-management" exact element={<PackageManagement />} />
          <Route path="/financial-overview" exact element={<FinancialOverview />} />
          <Route path="/profile-settings" exact element={<ProfileSettings />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
  export default App;
