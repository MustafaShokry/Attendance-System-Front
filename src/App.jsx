import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentLogin from './pages/login/StudentLogin';
import InstructorLogin from './pages/login/InstructorLogin';
import AdminLogin from './pages/login/AdminLogin';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import NotFound from './pages/NotFound';
import { studentLogin, instructorLogin, adminLogin } from './api/login.js'; // Import the API functions

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const handleStudentLogin = async (email, na_id) => {
    try {
      setIsAuthenticated(true);
      const studentId = await studentLogin(email, na_id);  
      console.log('Student logged in with ID:', studentId);
      return studentId;
    } catch (error) {
      console.error('Error during student login:', error);
    }
  };

  const handleInstructorLogin = async (email, na_id) => {
    try {
      const instructorId = await instructorLogin(email, na_id);
      setIsAuthenticated(true);

      console.log('Instructor logged in with ID:', instructorId);
      return instructorId;
    } catch (error) {
      console.error('Error during instructor login:', error);
    }
  };

  const handleAdminLogin = async (username, password) => {
    try {
      const adminId = await adminLogin(username, password);
      setIsAuthenticated(true);

      console.log('Admin logged in with ID:', adminId);
      return adminId;

    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);

  };

  return (
    <Router>
        <Routes>
          {/* <Route path="/" element={isAuthenticated ? <Navigate to="/student-dashboard" /> : <LandingPage />} /> */}
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/student-login" element={<StudentLogin login={handleStudentLogin} />} />
          <Route path="/instructor-login" element={<InstructorLogin login={handleInstructorLogin} />} />
          <Route path="/admin-login" element={<AdminLogin login={handleAdminLogin} />} />

          <Route path="/student-dashboard" element={<StudentDashboard logout={logout} isAuthenticated={isAuthenticated}/>} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard logout={logout} isAuthenticated={isAuthenticated}/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard logout={logout} isAuthenticated={isAuthenticated}/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
