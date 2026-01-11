import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Jobs from './pages/User/Jobs';
import JobDetails from './pages/User/JobDetails';
import MyApplications from './pages/User/MyApplications';
import MyFavourites from './pages/User/MyFavourites';
import AdminJobs from './pages/Admin/AdminJobs';
import JobForm from './pages/Admin/JobForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* Candidate Routes */}
          <Route path="/jobs" element={<ProtectedRoute allowedRoles={['candidate']}><Jobs /></ProtectedRoute>} />
          <Route path="/jobs/:id" element={<ProtectedRoute allowedRoles={['candidate']}><JobDetails /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute allowedRoles={['candidate']}><MyApplications /></ProtectedRoute>} />
          <Route path="/my-favourites" element={<ProtectedRoute allowedRoles={['candidate']}><MyFavourites /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={['admin']}><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/create-job" element={<ProtectedRoute allowedRoles={['admin']}><JobForm /></ProtectedRoute>} />
          <Route path="/admin/edit-job/:id" element={<ProtectedRoute allowedRoles={['admin']}><JobForm /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;