import React, { useState, useEffect } from 'react';
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
import InstructorWarnings from './pages/warnings/InstructorWarnings';
import InstructorReports from './pages/reports/InstructorReports';
import StudentReport from './pages/reports/StudentReport';
import DataEntry from './pages/admin/DataEntry';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();


  const handleStudentLogin = async (email, na_id) => {
    try {
      const studentId = await studentLogin(email, na_id);
      return studentId;
    } catch (error) {
      console.error('Error during student login:', error);
    }
  };

  const handleInstructorLogin = async (email, na_id) => {
    try {
      const instructorId = await instructorLogin(email, na_id);
      return instructorId;
    } catch (error) {
      console.error('Error during instructor login:', error);
    }
  };

  const handleAdminLogin = async (username, password) => {
    try {
      const adminId = await adminLogin(username, password);
      return adminId;

    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };
  const logout = () => {
    navigate('/');
  };

  return (
      <Routes>
        {/* <Route path="/" element={isAuthenticated ? <Navigate to="/student-dashboard" /> : <LandingPage />} /> */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/student-login" element={<StudentLogin login={handleStudentLogin} />} />
        <Route path="/instructor-login" element={<InstructorLogin login={handleInstructorLogin} />} />
        <Route path="/admin-login" element={<AdminLogin login={handleAdminLogin} />} />

        <Route path="/student-dashboard/:studentId" element={<StudentDashboard logout={logout} />} />
        <Route path="/instructor-dashboard/:instructorId" element={<InstructorDashboard logout={logout}  />} />
        <Route path="/admin-dashboard/:adminId" element={<AdminDashboard logout={logout}  />} />

        <Route path="/instructor-Warnings/:instructorId" element={<InstructorWarnings logout={logout}  />} />
        <Route path="instructor-reports/:instructorId" element={<InstructorReports logout={logout}  />} />
        <Route path="/student-report/:studentId" element={<StudentReport logout={logout}  />} />

        <Route path="/admin-data-entry/:adminId" element={<DataEntry />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

  );
}

export default App;
